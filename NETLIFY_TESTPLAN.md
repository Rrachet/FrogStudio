# Froggy Website – Thorough Test Plan (Netlify + Contact Form)

## A) What will be tested
### 1) Netlify static routing
- Visiting `https://<your-site>/` shows `frog extra.html`
- Directly visiting `https://<your-site>/frog%20extra.html` works
- Assets load (images/, favicon.png, etc.)

### 2) Footer links
- Instagram icon link opens the correct URL
- WhatsApp icon link opens `wa.me/<number>`
- Email chip mailto link opens mail client with correct address
- Phone chip tel link dials correct number

### 3) Contact form (thorough)
Because Netlify hosting is static (no Express backend), we’ll validate both:
- **Static form behavior** on the page (JS does not crash)
- **Backend submission behavior locally** (Express endpoint still works)

## B) Required files created by this task
- `contact-form-testcases.json` (test payloads)
- `contact-form-submit-test.ps1` (submits payloads to local server)
- `contact-form-static-check.html` (static browser-side test harness)

## C) Manual verification checklist after Netlify deploy
- Open home `/` and visually confirm the full page loads
- Scroll to footer and click each of:
  - Instagram / WhatsApp / Email / Phone
- Confirm no JS errors in DevTools console
- Submit the contact form:
  - If it requires backend, confirm it fails gracefully or provides UI message
  - If you connect a Netlify Function later, we can re-test
