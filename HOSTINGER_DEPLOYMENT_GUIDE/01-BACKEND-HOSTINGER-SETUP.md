# Backend Setup on Hostinger (Node.js)

This guide deploys the existing Express backend located in `backend/`.

## 1. Prerequisites

- Hostinger Business plan with Managed Node.js apps
- Backend code pushed to Git (recommended) or available for upload
- Google Spreadsheet already created
- Service account email already shared as **Editor** on that sheet

## 2. Backend Runtime Requirements

Current backend stack:

- Node + Express
- Port from env (`PORT`, default 8080)
- Entry file: `src/index.js`
- Health route: `/api/health`

## 3. Create Backend App in Hostinger

In Hostinger hPanel:

1. Go to **Websites** -> your site -> **Advanced** -> **Node.js**
2. Create new Node app
3. App root: point to backend project directory (where `backend/package.json` exists)
4. Start command:
   - `npm start`
5. Node version: use latest LTS available
6. Assign domain/subdomain:
   - `api.yourdomain.com`

## 4. Environment Variables (Required)

Set these in Hostinger Node app env panel:

- `PORT=8080` (or as required by Hostinger)
- `NODE_ENV=production`
- `FRONTEND_ORIGIN=https://yourdomain.com`
- `GOOGLE_SPREADSHEET_ID=...`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL=...`
- `GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`

Notes:

- Keep escaped `\n` in key value if entering as single-line env.
- Do not expose these values in frontend files.

## 5. Install and Start

If shell access is available in app root:

1. `npm install`
2. `npm start`

If using Hostinger auto-deploy UI, ensure dependencies install is enabled.

## 6. Verify Backend

Run these checks in browser/Postman:

1. `https://api.yourdomain.com/`
2. `https://api.yourdomain.com/api/health`

Expected health response:

```json
{
  "success": true,
  "service": "clinic-backend",
  "timestamp": "..."
}
```

## 7. Verify Lead API

POST to:

- `https://api.yourdomain.com/api/leads`

Payload sample:

```json
{
  "fullName": "Prod Test",
  "phoneNumber": "9876543210",
  "emailAddress": "prodtest@gmail.com",
  "serviceType": "General Inquiry",
  "additionalInfo": "Hostinger backend test",
  "sourcePage": "contact",
  "consent": true,
  "idempotencyKey": "prod-test-123"
}
```

Check:

- Response returns `success: true`
- New row is appended into monthly sheet tab (`YYYY-MM`)

## 8. CORS and Domain Notes

The backend allows CORS only for `FRONTEND_ORIGIN`.

If frontend calls fail with CORS error:

- ensure exact value matches production frontend domain
- include protocol (`https://`)
- avoid trailing slash mismatches

## 9. Troubleshooting

### 500 Internal Server Error on lead submit

- wrong Google env value
- service account not shared as sheet editor
- malformed private key

### 403 from Google API

- service account permission missing on spreadsheet

### Backend not starting

- wrong app root
- wrong start command
- missing dependency install

## 10. Recommended Production Hardening

- Restrict backend logs to necessary info (avoid sensitive data)
- Add uptime monitor on `/api/health`
- Keep a backup of env values in secure password manager

## 11. Google Credential Rotation and Incident Recovery

Use this runbook if lead submission suddenly fails due to Google auth/permission issues.

### Typical failure symptoms

- Contact form returns backend error on submit
- Backend logs show Google auth/permission errors
- `/api/health` works but `/api/leads` fails

### Common root causes

- Service account key was deleted/rotated in Google Cloud
- Service account disabled in IAM
- Google Sheets API disabled for the project
- Spreadsheet sharing removed for service account email
- `GOOGLE_PRIVATE_KEY` copied with wrong format

### Recovery steps (in order)

1. Open Google Cloud Console and select the correct project.
2. Go to **IAM & Admin -> Service Accounts**.
3. Open the service account used by backend (`GOOGLE_SERVICE_ACCOUNT_EMAIL`).
4. Go to **Keys**:
  - if key is invalid/missing, create a new JSON key.
5. Ensure **Google Sheets API** is enabled in **APIs & Services**.
6. Open target Google Sheet and share it with service account email as **Editor**.
7. Update Hostinger backend env values:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`
  - `GOOGLE_SPREADSHEET_ID` (if changed)
8. Restart Node app in Hostinger.
9. Test with one lead submit to `/api/leads`.

### Private key formatting rule

- If env is single-line, keep escaped newlines (`\\n`) inside key string.
- If multiline env is supported, ensure exact PEM block formatting remains intact.

### Validation test payload

```json
{
  "fullName": "Recovery Test",
  "phoneNumber": "9876543210",
  "emailAddress": "recoverytest@gmail.com",
  "serviceType": "General Inquiry",
  "additionalInfo": "Credential recovery verification",
  "sourcePage": "contact",
  "consent": true,
  "idempotencyKey": "recovery-test-001"
}
```

Expected:

- Response success from `/api/leads`
- New row appears in current month sheet tab

### Preventive policy (recommended)

- Rotate service account key every 60-90 days
- Keep one documented backup key process (do not store keys in repo)
- Monitor `/api/leads` failures via logs/alerts
- Revalidate sheet sharing after any project/IAM changes
