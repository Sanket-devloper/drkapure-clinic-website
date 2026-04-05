# Clinic Backend (Phase 1)

This backend is prepared for low-maintenance lead handling:
- Contact form submission endpoint
- Google Sheets lead storage

## Current status
- API scaffold is complete.
- Validation is enabled with Zod.
- If Google Sheets is not configured yet, API still responds safely with fallback status.

## Run locally
1. Copy `.env.example` to `.env`
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`
4. Backend URL:
   - `http://localhost:8080`

## Endpoints
- `GET /api/health`
- `POST /api/leads`

## Lead payload (POST /api/leads)
```json
{
  "fullName": "Patient Name",
  "phoneNumber": "8329467612",
  "emailAddress": "patient@example.com",
  "serviceType": "Skin Consultation",
  "additionalInfo": "Acne concern from last 6 months",
  "sourcePage": "contact",
  "consent": true
}
```

## Environment variables
- `GOOGLE_SPREADSHEET_ID=...`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL=...`
- `GOOGLE_PRIVATE_KEY=...`
- Optional alternative: `GOOGLE_PRIVATE_KEY_BASE64=...`

The backend accepts either an escaped PEM private key or a base64-encoded PEM. If the key cannot be parsed, lead submissions still return success and the Sheets write is skipped.

## Next step
Connect frontend contact form submit to:
- `http://localhost:8080/api/leads`

After that, we will configure real Google Sheet credentials and WhatsApp provider credentials.
After that, we can continue with frontend UI testing and deployment setup.
