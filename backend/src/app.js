import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env.js'
import healthRoutes from './routes/healthRoutes.js'
import leadRoutes from './routes/leadRoutes.js'
import { createRateLimiter } from './middleware/rateLimit.js'

const app = express()
app.set('trust proxy', env.nodeEnv === 'production' ? 1 : false)

const leadsRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 90,
  message: 'Too many lead submissions from this network. Please retry in a few minutes.',
})

// Configure CORS to allow development access from localhost and network IPs
const getCorsOptions = () => {
  if (env.nodeEnv === 'production') {
    return { origin: env.frontendOrigin }
  }

  const isAllowedDevOrigin = (origin) => {
    try {
      const parsed = new URL(origin)
      const isHttp = parsed.protocol === 'http:' || parsed.protocol === 'https:'
      const isDevPort = parsed.port === '5173'
      const host = parsed.hostname
      const isLocalHost = host === 'localhost' || host === '127.0.0.1'
      const isPrivateLan =
        /^10\./.test(host)
        || /^192\.168\./.test(host)
        || /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)

      return isHttp && isDevPort && (isLocalHost || isPrivateLan)
    }
    catch {
      return false
    }
  }

  // In development, allow local network access (localhost + any network IP on port 5173)
  return {
    origin: (origin, callback) => {
      // Allow server-to-server/no-origin requests and local LAN frontend origins only.
      if (!origin || isAllowedDevOrigin(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  }
}

app.use(helmet())
app.use(cors(getCorsOptions()))
app.use(express.json({ limit: '1mb' }))
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Clinic backend is running.',
  })
})

app.use('/api/health', healthRoutes)
app.use('/api/leads', leadsRateLimit, leadRoutes)

app.use((error, _req, res, _next) => {
  if (error?.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid request payload.',
      errors: error.issues,
    })
  }

  console.error('[API Error]', error)

  return res.status(500).json({
    success: false,
    message: env.nodeEnv === 'production'
      ? 'Something went wrong. Please try again later.'
      : (error?.message || 'Something went wrong.'),
  })
})

export default app
