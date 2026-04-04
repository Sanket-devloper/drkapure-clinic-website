import dotenv from 'dotenv'

dotenv.config()

function parsePositiveInt(rawValue, fallback, { min = 1, max = Number.MAX_SAFE_INTEGER } = {}) {
  const parsed = Number.parseInt(rawValue, 10)
  if (!Number.isFinite(parsed)) return fallback

  return Math.min(max, Math.max(min, parsed))
}

export const env = {
  port: Number(process.env.PORT || 8080),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',

  sheetsBatchSize: parsePositiveInt(process.env.BATCH_SIZE, 100, { min: 1, max: 100 }),
  sheetsBatchFlushMs: parsePositiveInt(process.env.BATCH_FLUSH_MS, 1500, { min: 100, max: 10_000 }),

  googleSpreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || '',
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
  googlePrivateKey: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
}
