import app from './app.js'
import { env } from './config/env.js'
import { flushPendingLeadQueue } from './services/googleSheetsService.js'

const server = app.listen(env.port, () => {
  console.log(`Backend running on http://localhost:${env.port}`)
})

// Defensive defaults so slow upstream calls do not keep sockets open forever.
server.requestTimeout = 15_000
server.headersTimeout = 16_000
server.keepAliveTimeout = 5_000

let isShuttingDown = false

async function gracefulShutdown(reason, { exitCode = 1 } = {}) {
  if (isShuttingDown) return
  isShuttingDown = true

  console.error(`[Shutdown] ${reason}`)

  try {
    await Promise.race([
      flushPendingLeadQueue(),
      new Promise((resolve) => setTimeout(resolve, 8_000)),
    ])
    console.log('[Shutdown] Pending lead queue flush completed (or timed out).')
  }
  catch (error) {
    console.error('[Shutdown] Failed flushing pending lead queue:', error)
  }

  server.close(() => {
    console.error('[Shutdown] HTTP server closed.')
    process.exit(exitCode)
  })

  setTimeout(() => {
    console.error('[Shutdown] Force exit after timeout.')
    process.exit(exitCode)
  }, 10_000).unref()
}

process.on('unhandledRejection', (reason) => {
  console.error('[Fatal] Unhandled promise rejection:', reason)
  void gracefulShutdown('Unhandled promise rejection')
})

process.on('uncaughtException', (error) => {
  console.error('[Fatal] Uncaught exception:', error)
  void gracefulShutdown('Uncaught exception')
})

process.on('SIGTERM', () => {
  console.log('[Signal] SIGTERM received. Exiting...')
  void gracefulShutdown('SIGTERM signal', { exitCode: 0 })
})

process.on('SIGINT', () => {
  console.log('[Signal] SIGINT received. Exiting...')
  void gracefulShutdown('SIGINT signal', { exitCode: 0 })
})
