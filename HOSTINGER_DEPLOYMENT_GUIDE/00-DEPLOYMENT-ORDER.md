# Hostinger Deployment Order (Frontend + Backend)

Use this file as the exact sequence to deploy safely.

## 1. Domain and DNS Plan

- Frontend domain: `https://yourdomain.com`
- Backend domain: `https://api.yourdomain.com`

Create/verify DNS records in Hostinger:

- `@` -> frontend target (Hostinger web hosting)
- `www` -> frontend target
- `api` -> Node app target (same hosting account/subdomain mapping)

## 2. Backend First

Deploy backend first, verify API health, then connect frontend.

- Follow [01-BACKEND-HOSTINGER-SETUP.md](01-BACKEND-HOSTINGER-SETUP.md)
- Confirm health endpoint is live:
  - `https://api.yourdomain.com/api/health`

## 3. Frontend Next

Deploy frontend build and point it to backend URL.

- Follow [02-FRONTEND-HOSTINGER-SETUP.md](02-FRONTEND-HOSTINGER-SETUP.md)
- Set frontend API variable to:
  - `VITE_API_BASE_URL=https://api.yourdomain.com`

## 4. End-to-End Verification

- Open `https://yourdomain.com/contact`
- Submit valid lead payload from UI
- Confirm success message on UI
- Confirm new row added in Google Sheet

## 5. If Something Fails

- CORS error in browser:
  - backend `FRONTEND_ORIGIN` not matching exact frontend domain
- Network/Mixed content error:
  - one side is HTTP and the other HTTPS
- 500 from `/api/leads`:
  - verify Google env vars and sheet permission for service account
- 404 on refresh in SPA routes:
  - add frontend fallback rewrite to `index.html`

Google auth/key emergency reference:

- See credential recovery runbook in [01-BACKEND-HOSTINGER-SETUP.md](01-BACKEND-HOSTINGER-SETUP.md) under section **Google Credential Rotation and Incident Recovery**

## 6. Quick Go-Live Checklist

- Backend health endpoint works
- Frontend loads with HTTPS
- Contact form writes to Google Sheet
- Social links open correctly on first click
- Mobile view tested on same production domain
