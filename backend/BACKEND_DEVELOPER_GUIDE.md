# Backend Developer Guide

This document explains the backend implementation for the clinic website so any developer can quickly understand, maintain, and extend it.

## 1) Tech Stack

- Runtime: Node.js (ES Modules)
- Framework: Express
- Validation: Zod
- Logging: Morgan
- Security headers: Helmet
- CORS: cors
- Config: dotenv
- Data store: Google Sheets API (`googleapis`)

## 2) High-Level Architecture

Request flow:

1. Frontend sends `POST /api/leads`
2. Backend validates payload with Zod
3. Backend checks idempotency key (duplicate submit guard)
4. Backend appends lead row into monthly Google Sheet tab
5. Backend returns success with generated lead ID

Key files:

- `src/index.js`: server startup
- `src/app.js`: middleware, routes, global error handler
- `src/routes/healthRoutes.js`: health endpoint
- `src/routes/leadRoutes.js`: lead endpoint route
- `src/controllers/leadController.js`: lead orchestration
- `src/schemas/leadSchema.js`: request validation rules
- `src/services/googleSheetsService.js`: Google Sheets integration
- `src/services/duplicateDetectionService.js`: in-memory idempotency guard
- `src/config/env.js`: environment variable mapping

## 3) Project Scripts

From `backend/package.json`:

- `npm run dev`: run backend with file watch (`node --watch src/index.js`)
- `npm start`: run backend normally

Default local URL:

- `http://localhost:8080`

## 4) Environment Variables

Defined in `src/config/env.js`:

- `PORT` (default `8080`)
- `NODE_ENV` (default `development`)
- `FRONTEND_ORIGIN` (default `http://localhost:5173`)
- `GOOGLE_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

Important:

- `GOOGLE_PRIVATE_KEY` supports escaped newlines (`\\n`) and is normalized in code.
- Never expose backend env vars in frontend code.

## 5) API Endpoints

### GET `/api/health`

Purpose:

- Service health check

Success response example:

```json
{
  "success": true,
  "service": "clinic-backend",
  "timestamp": "2026-03-21T09:00:00.000Z"
}
```

### POST `/api/leads`

Purpose:

- Accept contact form lead and store in Google Sheets

Expected payload:

```json
{
  "fullName": "Patient Name",
  "phoneNumber": "9876543210",
  "emailAddress": "patient@gmail.com",
  "serviceType": "Skin Consultation",
  "additionalInfo": "Optional note",
  "sourcePage": "contact",
  "consent": true,
  "idempotencyKey": "optional-client-generated-key"
}
```

Success response example:

```json
{
  "success": true,
  "message": "Lead received successfully.",
  "data": {
    "leadId": "LEAD-202603-001",
    "sheet": {
      "storedInSheet": true,
      "leadId": "LEAD-202603-001"
    }
  }
}
```

Validation error response example:

```json
{
  "success": false,
  "message": "Invalid request payload.",
  "errors": [
    {
      "path": ["phoneNumber"],
      "message": "Phone number must be exactly 10 digits."
    }
  ]
}
```

Duplicate idempotency response example:

```json
{
  "success": false,
  "message": "This submission was already received. Please wait before submitting again."
}
```

## 6) Validation Rules (Current)

Defined in `src/schemas/leadSchema.js`:

- `fullName`: string, trimmed, min 2, max 100
- `phoneNumber`: exactly 10 digits (`^\\d{10}$`)
- `emailAddress`: valid email and must end with `@gmail.com`
- `serviceType`: string, min 2, max 100
- `additionalInfo`: optional, max 1000, default `""`
- `sourcePage`: optional, max 120, default `"contact"`
- `consent`: must be `true`
- `idempotencyKey`: optional string

## 7) Duplicate Submission Handling

Defined in `src/services/duplicateDetectionService.js`:

- In-memory map stores seen idempotency keys
- In-memory map stores recent phone submissions
- Idempotency duplicate window: 30 minutes
- Phone duplicate window: 2 hours
- Cleanup job runs every 60 seconds

Behavior:

- If same `idempotencyKey` is submitted again within window, backend returns HTTP `409`.
- If same `phoneNumber` is submitted again within 2 hours, backend returns HTTP `409`.

Notes:

- This protection is process-memory based.
- On server restart, cache resets.
- For multi-instance production, use Redis or database for shared duplicate state.

## 8) Google Sheets Storage Design

Defined in `src/services/googleSheetsService.js`.

### Current write mode (batched)

The backend currently uses an in-memory queue and writes leads to Google Sheets in batches.

Batch controls (from env):

- `BATCH_SIZE` (default `100`, capped at `100`)
- `BATCH_FLUSH_MS` (default `1500` ms)

Current clinic profile recommendation:

- `BATCH_SIZE=20`
- `BATCH_FLUSH_MS=800`

How it behaves:

1. New lead is queued in memory.
2. If queue size reaches `BATCH_SIZE`, flush happens immediately.
3. If queue does not reach `BATCH_SIZE`, flush happens after `BATCH_FLUSH_MS`.
4. One flush writes many rows in one Google API append call.

### Monthly tabs

Tab naming pattern:

- `YYYY-MM` (example: `2026-03`)

Process:

1. Compute current month tab name
2. If tab does not exist, create it
3. Write header row (`A1:K1`) for new tab

### Lead ID format

- `LEAD-YYYYMM-###`
- Serial is based on existing entries in current month tab

### Columns written (`A:K`)

1. Lead ID
2. Created At (ISO timestamp)
3. Full Name
4. Phone Number
5. Email Address
6. Service Type
7. Additional Info
8. Source Page
9. Consent (`yes`/`no`)
10. Status (`New`)
11. Follow-up Notes (empty by default)

Fallback behavior:

- If Google credentials are missing, service returns `storedInSheet: false` with temporary lead ID.

Known limitation (important):

- Because queue is in memory, if backend process crashes before flush, queued leads can be lost.

## 9) Middleware and Security

From `src/app.js`:

- `helmet()` for secure headers
- `cors({ origin: env.frontendOrigin })`
- `express.json({ limit: '1mb' })`
- `morgan()` request logging

Global error handler:

- Zod errors -> HTTP 400 with issue list
- Other errors -> HTTP 500 with message

## 10) Performance Notes

Current optimized path:

- Lead submission performs validation + queued batch append flow
- Expensive duplicate phone scan against entire sheet is not in request path
- Batching reduces Google Sheets API write calls under load

If further optimization is needed:

- Add durable queue/outbox model (Redis or DB-backed)
- Add worker process for background flush and retries
- Add recovery job on startup for pending unsent leads

### Future Implementation Plan: Durable Queue (for scale)

When traffic or reliability requirements grow, replace in-memory queue with durable queue.

Suggested migration:

1. Add `lead_outbox` table (or Redis stream/list) to store accepted leads before Google write.
2. API path stores lead to outbox first, then returns accepted response.
3. Worker reads outbox in batches and writes to Google Sheets.
4. Mark outbox records as sent after successful batch write.
5. On crash/restart, worker resumes from unsent records.

Benefits:

- No data loss on backend restart/crash.
- Safer retry behavior for transient Google errors.
- Better visibility (pending/sent/failed states).

## 11) Local Development Checklist

1. Create `backend/.env` with required Google values
2. Run: `npm install`
3. Run: `npm run dev`
4. Check health: `GET http://localhost:8080/api/health`
5. Submit lead from frontend form and verify row in Google Sheet

## 12) Production Deployment Notes

- Set exact `FRONTEND_ORIGIN` to live frontend domain
- Keep backend under HTTPS
- Keep all secrets in server env only
- Monitor health endpoint
- For robust duplicate protection in scaled deployment, move idempotency map to shared store
- For zero-loss lead ingestion at scale, replace in-memory batch queue with durable queue/outbox worker

## 13) Common Change Scenarios

### A) Allow non-Gmail emails

Edit `src/schemas/leadSchema.js` and remove/refactor Gmail refine rule.

### B) Change phone format

Edit phone regex in `src/schemas/leadSchema.js` and align frontend form rules.

### C) Add new lead fields

1. Update schema in `src/schemas/leadSchema.js`
2. Update payload usage in `src/controllers/leadController.js`
3. Update Google row mapping in `src/services/googleSheetsService.js`
4. Update frontend form payload

### D) Add another API endpoint

1. Create controller
2. Create route file
3. Register route in `src/app.js`

## 14) Troubleshooting

### Issue: Leads not written to sheet

Check:

- `GOOGLE_SPREADSHEET_ID` correct
- Service account email shared with spreadsheet (Editor)
- `GOOGLE_PRIVATE_KEY` format correct
- Backend logs for Google API errors

### Issue: CORS blocked in browser

Check:

- `FRONTEND_ORIGIN` exactly matches deployed frontend URL
- Protocol and domain are correct (`https://...`)

### Issue: Duplicate check not persistent

Expected with in-memory idempotency.
Use Redis/database for persistent shared duplicate protection.

### Issue: Lead accepted but not found in sheet (rare)

Possible cause:

- Backend restarted/crashed before in-memory queue flush.

Resolution:

- Short term: ask patient to resubmit and check backend logs.
- Long term: implement durable queue/outbox model (see section 10).

## 15) File Ownership Suggestion

For team maintenance, treat these modules as boundaries:

- API contracts: `schemas` + `controllers`
- Integrations: `services`
- App wiring: `routes` + `app.js`
- Runtime config: `config/env.js`

Keeping these boundaries clear makes future changes safer and faster.
