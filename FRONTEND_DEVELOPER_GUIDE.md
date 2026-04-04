# Frontend Developer Guide

This document explains the frontend implementation of the clinic website so any developer can maintain, extend, and troubleshoot it quickly.

## 1) Frontend Stack

- Framework: React 18
- Build tool: Vite
- Routing: react-router-dom
- Motion: framer-motion
- Icons: lucide-react
- Styling: Tailwind utility classes + component CSS modules + global CSS
- SEO head support: react-helmet-async

## 2) Project Scripts

From root package.json:

- npm run dev: starts Vite frontend only
- npm run dev:full: starts frontend + backend together (using concurrently)
- npm run build: production build
- npm run preview: preview built frontend

Recommended local command for day-to-day full testing:

- npm run dev:full

## 3) Application Entry and Routing

Core files:

- src/main.jsx: app mount and HelmetProvider
- src/App.jsx: router, global layout wiring (Navbar, FloatingButtons, Footer)

Main route groups in src/App.jsx:

- Core pages: Home, About, Gallery, Contact
- Service pages: Skin, Hair, Laser
- Treatment detail pages under /treatments/skin, /treatments/hair, /treatments/laser

## 4) Directory Structure (Important Areas)

- src/pages: route-level page components
- src/components: reusable site sections and UI blocks
- src/components/about: About page sections
- src/components/contact: contact page sections and contact form logic
- src/treatments: detail pages for treatment routes
- src/data: static data used by pages
- src/hooks: reusable behavior hooks (scroll reveal, counters)
- src/theme.js: design tokens used by about/contact tokenized sections

## 5) Styling System

This project uses a mixed styling model:

1. Utility classes (Tailwind-style class names) in page JSX
2. CSS modules for section-scoped styles
3. Global utility/animation rules in src/index.css
4. Token object in src/theme.js used by some sections as CSS variables

When editing styles:

- Prefer local component styles first
- Avoid changing global utilities unless multiple sections need the update
- Keep mobile responsiveness intact (check breakpoint behavior)

## 6) Contact Form (Current Behavior)

Main file:

- src/components/contact/ContactInfoForm.jsx

API behavior:

- Submits to VITE_API_BASE_URL or fallback http://localhost:8080
- Endpoint called: POST /api/leads

Validation rules enforced in UI:

- Phone number must be exactly 10 digits
- Email must be @gmail.com
- Consent checkbox required

Submission UX behavior:

- Inputs are disabled while submitting
- Consent cannot be unchecked during in-flight submit
- Button shows loading state and progress text
- Success/error message shown below button

## 7) Social and Action Buttons

Primary files:

- src/components/FloatingButtons.jsx
- src/components/Footer.jsx

Current links:

- Instagram: https://www.instagram.com/dr_smita_kapure_/
- Facebook: https://www.facebook.com/amrita.heda/reels/
- YouTube: https://www.youtube.com/@smitakapure
- WhatsApp: https://wa.me/918329467612
- Call: tel:+918329467612

Important behavior:

- External links are opened with explicit click handler + window.open to avoid first-click redirect glitches in SPA context.

## 8) About Page Testimonials Layout

Files:

- src/components/about/Testimonials.jsx
- src/components/about/AboutSections.module.css

Current behavior:

- Uses marquee-style scrolling similar to home success stories
- Cards are content-driven in height (no forced equal-height stretch)

## 9) Home Page Highlight Sections

Large sections (hero, why choose us, success stories, FAQ, CTA) are in:

- src/pages/Home.jsx

When editing:

- Preserve existing animation wrappers and stagger timing
- Keep semantic structure and accessibility labels

## 10) Environment Variables (Frontend)

Used variable:

- VITE_API_BASE_URL

Examples:

- Local: http://localhost:8080
- Production: https://api.yourdomain.com

Important:

- Vite injects env vars only at build/start time. Restart dev server after env changes.

## 11) Build and Quality Checks

Before pushing frontend changes:

1. Run npm run build
2. Manually check key pages:
   - Home
   - About
   - Contact
   - One page from each services/treatments group
3. Test contact submit flow with valid and invalid payloads
4. Test social links from footer and floating buttons
5. Test both desktop and mobile layout

## 12) Common Change Scenarios

A) Update social profile links

- Edit FloatingButtons.jsx and Footer.jsx together so links stay consistent

B) Change contact form fields

- Update ContactInfoForm.jsx
- Ensure backend payload still matches API schema

C) Change validation rules

- Update both frontend validations and backend schema in parallel

D) Add a new route page

- Create page component in src/pages (or relevant folder)
- Register route in src/App.jsx
- Add navigation links if needed

E) Adjust about testimonials behavior

- Testimonials.jsx for structure
- AboutSections.module.css for size/scroll/animation

## 13) Troubleshooting

Issue: Page says localhost refused to connect

- Cause: frontend dev server not running
- Fix: start with npm run dev or npm run dev:full

Issue: Contact form fails with invalid payload

- Verify phone and email format in UI
- Verify backend is running
- Verify API base URL points to active backend

Issue: Social link first click goes to homepage

- Ensure openExternal click handlers are present in FloatingButtons/Footer
- Ensure href values are actual URLs and not placeholders

## 14) Handoff Notes for Future Developers

- Keep frontend-backend contract synchronized (especially contact payload)
- Preserve design consistency with theme tokens and existing visual system
- Prefer incremental edits over broad refactors
- Document major UI/UX changes directly in this file or a dedicated changelog section

## 15) Suggested Ownership

- Routing and layout shell: App.jsx
- Brand visuals and section styling: pages + module CSS
- Contact UX and integration: contact components
- External profile/CTA links: footer and floating buttons

This separation helps teams make safe changes without regressions.
