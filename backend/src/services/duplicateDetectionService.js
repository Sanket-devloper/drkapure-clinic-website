// In-memory cache for recent submissions (could be Redis in production)
const recentIdempotencySubmissions = new Map()
const recentPhoneSubmissions = new Map()
const IDEMPOTENCY_WINDOW_MS = 30 * 60 * 1000 // 30 minutes
const PHONE_WINDOW_MS = 2 * 60 * 60 * 1000 // 2 hours
const CLEANUP_INTERVAL = 60 * 1000 // Clean up every 60 seconds

// Auto-cleanup old entries
setInterval(() => {
  const now = Date.now()
  for (const [key, timestamp] of recentIdempotencySubmissions.entries()) {
    if (now - timestamp > IDEMPOTENCY_WINDOW_MS) {
      recentIdempotencySubmissions.delete(key)
    }
  }

  for (const [phone, timestamp] of recentPhoneSubmissions.entries()) {
    if (now - timestamp > PHONE_WINDOW_MS) {
      recentPhoneSubmissions.delete(phone)
    }
  }
}, CLEANUP_INTERVAL)

// Avoid keeping the Node event loop alive only for cleanup timers.
.unref()

export function isDuplicateIdempotencyKey(idempotencyKey) {
  if (!idempotencyKey) return false
  
  if (recentIdempotencySubmissions.has(idempotencyKey)) {
    return true
  }
  
  // Record this key as submitted
  recentIdempotencySubmissions.set(idempotencyKey, Date.now())
  return false
}

export function isDuplicatePhoneSubmission(phoneNumber) {
  if (!phoneNumber) return false

  const normalizedPhone = String(phoneNumber).trim()
  const seenAt = recentPhoneSubmissions.get(normalizedPhone)

  if (seenAt && Date.now() - seenAt <= PHONE_WINDOW_MS) {
    return true
  }

  recentPhoneSubmissions.set(normalizedPhone, Date.now())
  return false
}
