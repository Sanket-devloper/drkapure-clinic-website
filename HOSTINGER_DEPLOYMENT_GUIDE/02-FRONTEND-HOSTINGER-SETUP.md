# Frontend Setup on Hostinger (React + Vite)

This guide deploys the React frontend from project root.

## 1. Prerequisites

- Backend already live and verified (see [01-BACKEND-HOSTINGER-SETUP.md](01-BACKEND-HOSTINGER-SETUP.md))
- Backend URL available (example: `https://api.yourdomain.com`)

## 2. Set API Base URL for Production Build

Create/update root `.env.production`:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

Important:

- Variable name must start with `VITE_`
- Rebuild frontend after changing env values

## 3. Build Frontend

From project root:

1. `npm install`
2. `npm run build`

This generates `dist/` folder.

## 4. Upload to Hostinger

In hPanel (for your main domain):

1. Open File Manager for `public_html`
2. Upload contents of `dist/` into `public_html`
3. Ensure `index.html` is directly in `public_html`

## 5. SPA Route Fallback (Important)

Because app uses React Router, refreshing routes like `/about` or `/contact` may 404 without fallback.

Add rewrite rule so all unknown routes serve `index.html`.

For Apache (`.htaccess` in `public_html`):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 6. Verify Frontend

Open:

- `https://yourdomain.com`
- `https://yourdomain.com/about`
- `https://yourdomain.com/contact`

Check:

- Route refresh works (no 404)
- Navbar/Footer/Floating buttons render
- Social links open external profiles directly on first click

## 7. Verify Contact Form End-to-End

On `https://yourdomain.com/contact`:

- Fill valid data
- Submit form
- Confirm success message
- Confirm new row in Google Sheet

Validation expected in UI/backend:

- phone: exactly 10 digits
- email: must be `@gmail.com`
- consent checkbox required

## 8. Mobile Verification

Test on real phone browser:

- Home page loads fast
- Floating buttons clickable
- Contact form submits successfully
- About testimonials marquee scrolls properly

## 9. Troubleshooting

### Contact form says network error

- `VITE_API_BASE_URL` wrong
- backend domain not reachable
- backend CORS origin mismatch

### Works locally, fails in production

- forgot to rebuild after env change
- old files cached in browser/CDN

### Refresh sends to 404

- SPA rewrite missing

## 10. Post-Deploy Checklist

- SSL enabled on frontend and backend
- API calls use HTTPS
- Contact submissions visible in Google Sheet
- Social buttons open expected links:
  - Instagram: `https://www.instagram.com/dr_smita_kapure_/`
  - Facebook: `https://www.facebook.com/amrita.heda/reels/`
  - YouTube: `https://www.youtube.com/@smitakapure`
  - WhatsApp: `https://wa.me/918329467612`
