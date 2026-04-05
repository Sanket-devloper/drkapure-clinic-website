import { google } from 'googleapis'
import { env } from '../config/env.js'

const GOOGLE_API_TIMEOUT_MS = 8_000
const MAX_RETRY_ATTEMPTS = 3
const MAX_BATCH_ROWS = env.sheetsBatchSize
const BATCH_FLUSH_MS = env.sheetsBatchFlushMs

const pendingLeadQueue = []
let flushTimer = null
let isFlushing = false

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function withTimeout(promise, timeoutMs, operationName) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const timeoutError = new Error(`${operationName} timed out after ${timeoutMs}ms`)
      timeoutError.code = 'ETIMEDOUT'
      reject(timeoutError)
    }, timeoutMs)

    promise
      .then((value) => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch((error) => {
        clearTimeout(timer)
        reject(error)
      })
  })
}

function isRetryableError(error) {
  const status = error?.response?.status
  const code = String(error?.code || '').toUpperCase()
  const message = String(error?.message || '').toLowerCase()

  if ([408, 429, 500, 502, 503, 504].includes(status)) return true
  if (['ETIMEDOUT', 'ECONNRESET', 'EAI_AGAIN', 'ENOTFOUND'].includes(code)) return true
  if (message.includes('timed out') || message.includes('timeout')) return true

  return false
}

function isAuthOrKeyError(error) {
  const code = String(error?.code || '').toUpperCase()
  const message = String(error?.message || '').toLowerCase()

  return (
    code === 'ERR_OSSL_EVP_UNSUPPORTED'
    || message.includes('decoder routines::unsupported')
    || message.includes('invalid pem')
    || message.includes('private key')
    || message.includes('invalid_grant')
  )
}

function createFallbackLeadResult(reason) {
  return {
    storedInSheet: false,
    reason,
    leadId: `TEMP-${Date.now()}`,
  }
}

function monthSheetName(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function isConfigured() {
  return Boolean(
    env.googleSpreadsheetId &&
    env.googleServiceAccountEmail &&
    env.googlePrivateKey,
  )
}

async function getSheetsClient() {
  const auth = new google.auth.JWT(
    env.googleServiceAccountEmail,
    null,
    env.googlePrivateKey,
    ['https://www.googleapis.com/auth/spreadsheets'],
  )
  await withTimeout(auth.authorize(), GOOGLE_API_TIMEOUT_MS, 'Google auth')
  return google.sheets({ version: 'v4', auth })
}

async function ensureMonthlySheet(sheets, spreadsheetId, title) {
  const spreadsheet = await withTimeout(
    sheets.spreadsheets.get({ spreadsheetId }),
    GOOGLE_API_TIMEOUT_MS,
    'Fetch spreadsheet metadata',
  )
  const existing = spreadsheet.data.sheets?.find((s) => s.properties?.title === title)
  if (existing) return

  await withTimeout(
    sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title } } }],
      },
    }),
    GOOGLE_API_TIMEOUT_MS,
    'Create monthly sheet',
  )

  await withTimeout(
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${title}!A1:K1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'Lead ID',
          'Created At',
          'Full Name',
          'Phone Number',
          'Email Address',
          'Service Type',
          'Additional Info',
          'Source Page',
          'Consent',
          'Status',
          'Follow-up Notes',
        ]],
      },
    }),
    GOOGLE_API_TIMEOUT_MS,
    'Initialize monthly sheet header',
  )
}

async function nextLeadId(sheets, spreadsheetId, title) {
  const range = `${title}!A2:A`
  const response = await withTimeout(
    sheets.spreadsheets.values.get({ spreadsheetId, range }),
    GOOGLE_API_TIMEOUT_MS,
    'Read existing lead IDs',
  )
  const count = response.data.values?.length || 0
  const serial = String(count + 1).padStart(3, '0')
  return `LEAD-${title.replace('-', '')}-${serial}`
}

async function existingLeadCount(sheets, spreadsheetId, title) {
  const range = `${title}!A2:A`
  const response = await withTimeout(
    sheets.spreadsheets.values.get({ spreadsheetId, range }),
    GOOGLE_API_TIMEOUT_MS,
    'Read existing lead count',
  )

  return response.data.values?.length || 0
}

async function appendLeadRow(sheets, spreadsheetId, sheetTitle, rowValues) {
  return withTimeout(
    sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}!A:K`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowValues],
      },
    }),
    GOOGLE_API_TIMEOUT_MS,
    'Append lead row',
  )
}

async function appendLeadRows(sheets, spreadsheetId, sheetTitle, rows) {
  return withTimeout(
    sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}!A:K`,
      valueInputOption: 'RAW',
      requestBody: {
        values: rows,
      },
    }),
    GOOGLE_API_TIMEOUT_MS,
    'Append lead rows (batch)',
  )
}

async function appendLeadOnce(lead) {
  const sheetTitle = monthSheetName()
  console.log('[GoogleSheets] Appending lead to sheet:', sheetTitle)

  const sheets = await getSheetsClient()
  const spreadsheetId = env.googleSpreadsheetId

  await ensureMonthlySheet(sheets, spreadsheetId, sheetTitle)

  const leadId = await nextLeadId(sheets, spreadsheetId, sheetTitle)
  const createdAt = new Date().toISOString()

  await appendLeadRow(sheets, spreadsheetId, sheetTitle, [
    leadId,
    createdAt,
    lead.fullName,
    lead.phoneNumber,
    lead.emailAddress,
    lead.serviceType,
    lead.additionalInfo || '',
    lead.sourcePage || 'contact',
    lead.consent ? 'yes' : 'no',
    'New',
    '',
  ])

  console.log('[GoogleSheets] Row appended successfully. leadId:', leadId)
  return {
    storedInSheet: true,
    leadId,
  }
}

async function appendLeadBatchOnce(leads) {
  const sheetTitle = monthSheetName()
  const sheets = await getSheetsClient()
  const spreadsheetId = env.googleSpreadsheetId

  await ensureMonthlySheet(sheets, spreadsheetId, sheetTitle)

  const startCount = await existingLeadCount(sheets, spreadsheetId, sheetTitle)
  const createdAt = new Date().toISOString()
  const monthToken = sheetTitle.replace('-', '')

  const rows = []
  const leadIds = []

  for (let i = 0; i < leads.length; i += 1) {
    const serial = String(startCount + i + 1).padStart(3, '0')
    const leadId = `LEAD-${monthToken}-${serial}`
    const lead = leads[i]

    leadIds.push(leadId)
    rows.push([
      leadId,
      createdAt,
      lead.fullName,
      lead.phoneNumber,
      lead.emailAddress,
      lead.serviceType,
      lead.additionalInfo || '',
      lead.sourcePage || 'contact',
      lead.consent ? 'yes' : 'no',
      'New',
      '',
    ])
  }

  await appendLeadRows(sheets, spreadsheetId, sheetTitle, rows)

  return leadIds.map((leadId) => ({
    storedInSheet: true,
    leadId,
  }))
}

async function appendLeadBatchWithRetry(leads) {
  let lastError

  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt += 1) {
    try {
      return await appendLeadBatchOnce(leads)
    }
    catch (error) {
      lastError = error
      const retryable = isRetryableError(error)
      const authOrKeyError = isAuthOrKeyError(error)
      const willRetry = retryable && attempt < MAX_RETRY_ATTEMPTS

      const log = authOrKeyError ? console.warn : console.error
      log(
        `[GoogleSheets] Batch attempt ${attempt}/${MAX_RETRY_ATTEMPTS} failed: ${error.message}`,
      )

      if (!willRetry || authOrKeyError) break

      const backoffMs = attempt * 700
      console.warn(`[GoogleSheets] Retrying batch in ${backoffMs}ms...`)
      await sleep(backoffMs)
    }
  }

  throw lastError
}

function scheduleFlush() {
  if (flushTimer || pendingLeadQueue.length === 0) return

  flushTimer = setTimeout(() => {
    flushTimer = null
    void flushQueue()
  }, BATCH_FLUSH_MS)

  flushTimer.unref()
}

async function flushQueue() {
  if (isFlushing || pendingLeadQueue.length === 0) return

  isFlushing = true

  try {
    while (pendingLeadQueue.length > 0) {
      const batch = pendingLeadQueue.splice(0, MAX_BATCH_ROWS)
      const leads = batch.map((entry) => entry.lead)

      try {
        const results = await appendLeadBatchWithRetry(leads)

        batch.forEach((entry, index) => {
          entry.resolve(results[index])
        })

        console.log(
          `[GoogleSheets] Batched append success: ${batch.length} rows in 1 API request`,
        )
      }
      catch (error) {
        batch.forEach((entry) => entry.reject(error))
      }
    }
  }
  finally {
    isFlushing = false

    if (pendingLeadQueue.length > 0) {
      scheduleFlush()
    }
  }
}

function queueLeadForBatch(lead) {
  return new Promise((resolve, reject) => {
    pendingLeadQueue.push({ lead, resolve, reject })

    if (pendingLeadQueue.length >= MAX_BATCH_ROWS) {
      if (flushTimer) {
        clearTimeout(flushTimer)
        flushTimer = null
      }
      void flushQueue()
      return
    }

    scheduleFlush()
  })
}

export async function flushPendingLeadQueue() {
  if (flushTimer) {
    clearTimeout(flushTimer)
    flushTimer = null
  }

  await flushQueue()
}

export async function appendLeadToGoogleSheet(lead) {
  if (!isConfigured()) {
    return createFallbackLeadResult('Google Sheets credentials are missing or invalid.')
  }

  try {
    return await queueLeadForBatch(lead)
  }
  catch (error) {
    console.warn(`[GoogleSheets] Lead accepted without sheet write: ${error.message}`)
    return createFallbackLeadResult('Google Sheets is temporarily unavailable. Your request was received.')
  }
}
