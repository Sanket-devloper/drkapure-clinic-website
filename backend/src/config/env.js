import { createPrivateKey } from 'node:crypto'
import dotenv from 'dotenv'

dotenv.config()

function normalizePrivateKey(rawValue) {
  if (!rawValue) return ''

  // Some hosting env panels wrap multiline secrets in quotes or keep CRLF.
  const trimmed = String(rawValue).trim().replace(/^['\"]|['\"]$/g, '')
  const normalized = trimmed
    .replace(/\\r/g, '')
    .replace(/\r/g, '')
    .replace(/\\n/g, '\n')

  // Rebuild PEM structure if host panel injected extra spaces/newlines.
  const pemMatch = normalized.match(
    /-----BEGIN ([A-Z ]+?)-----([\s\S]*?)-----END \1-----/,
  )

  if (!pemMatch) {
    return normalized
  }

  const keyLabel = pemMatch[1].trim()
  const keyBody = pemMatch[2].replace(/\s+/g, '')
  const wrappedBody = keyBody.match(/.{1,64}/g)?.join('\n') || ''

  return `-----BEGIN ${keyLabel}-----\n${wrappedBody}\n-----END ${keyLabel}-----\n`
}

function decodeBase64PrivateKey(rawValue) {
  if (!rawValue) return ''

  try {
    const decoded = Buffer.from(String(rawValue).trim(), 'base64').toString('utf8')
    return normalizePrivateKey(decoded)
  }
  catch {
    return ''
  }
}

function coercePrivateKey(rawValue) {
  const normalized = normalizePrivateKey(rawValue)
  const decodedBase64 = decodeBase64PrivateKey(rawValue)
  const candidates = [normalized, decodedBase64].filter(Boolean)

  for (const candidate of candidates) {
    try {
      const keyObject = createPrivateKey({ key: candidate, format: 'pem' })
      return keyObject.export({ format: 'pem', type: 'pkcs8' }).toString()
    }
    catch {
      // Try next candidate.
    }
  }

  return ''
}

function parsePositiveInt(rawValue, fallback, { min = 1, max = Number.MAX_SAFE_INTEGER } = {}) {
  const parsed = Number.parseInt(rawValue, 10)
  if (!Number.isFinite(parsed)) return fallback

  return Math.min(max, Math.max(min, parsed))
}

export const env = {
  port: Number(process.env.PORT || 8080),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  debugPublicErrors: String(process.env.DEBUG_PUBLIC_ERRORS || '').toLowerCase() === 'true',

  sheetsBatchSize: parsePositiveInt(process.env.BATCH_SIZE, 100, { min: 1, max: 100 }),
  sheetsBatchFlushMs: parsePositiveInt(process.env.BATCH_FLUSH_MS, 1500, { min: 100, max: 10_000 }),

  googleSpreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || '',
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
  googlePrivateKey:
    coercePrivateKey(process.env.GOOGLE_PRIVATE_KEY)
    || coercePrivateKey(process.env.GOOGLE_PRIVATE_KEY_BASE64),
}

if (!(process.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY_BASE64) && !env.googlePrivateKey) {
  console.warn('[Config] Google Sheets private key is missing. Lead submissions will be accepted, but sheet writes are disabled until credentials are added.')
}

if ((process.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY_BASE64) && !env.googlePrivateKey) {
  console.warn('[Config] Google Sheets private key is present but invalid. Lead submissions will be accepted, but sheet writes are disabled until the key format is fixed.')
}
