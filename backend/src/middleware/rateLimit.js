const ipBuckets = new Map()

function getClientIp(req) {
  // Use Express-derived IP only. trust proxy is controlled in app.js.
  return req.ip || req.socket?.remoteAddress || 'unknown'
}

export function createRateLimiter({
  windowMs = 15 * 60 * 1000,
  maxRequests = 120,
  message = 'Too many requests. Please try again shortly.',
} = {}) {
  // Prevent unbounded memory growth from expired buckets.
  const cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, value] of ipBuckets.entries()) {
      if (now >= value.resetAt) {
        ipBuckets.delete(key)
      }
    }
  }, 60 * 1000)

  cleanupTimer.unref()

  return function rateLimitMiddleware(req, res, next) {
    const now = Date.now()
    const ip = getClientIp(req)
    const bucket = ipBuckets.get(ip)

    if (!bucket || now >= bucket.resetAt) {
      ipBuckets.set(ip, {
        count: 1,
        resetAt: now + windowMs,
      })

      res.setHeader('X-RateLimit-Limit', String(maxRequests))
      res.setHeader('X-RateLimit-Remaining', String(maxRequests - 1))
      res.setHeader('X-RateLimit-Reset', String(Math.ceil((now + windowMs) / 1000)))
      return next()
    }

    bucket.count += 1
    const remaining = Math.max(0, maxRequests - bucket.count)

    res.setHeader('X-RateLimit-Limit', String(maxRequests))
    res.setHeader('X-RateLimit-Remaining', String(remaining))
    res.setHeader('X-RateLimit-Reset', String(Math.ceil(bucket.resetAt / 1000)))

    if (bucket.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message,
      })
    }

    return next()
  }
}
