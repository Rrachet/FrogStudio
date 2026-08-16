<<<<<<< HEAD
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
=======
# Frog Studios – Netlify + Contact Form Test Plan

## Static routing

- Visiting `/` should show `frog extra.html`.
- Directly visiting `/frog%20extra.html` should work.
- Images, favicon and other static assets should load.

## Footer links

Verify:

- Instagram link
- WhatsApp link
- Email `mailto:` link
- Phone `tel:` link

## Contact form

Because Netlify hosting is static while the Express API is separate, validate both:

- Browser-side form behavior and JavaScript errors.
- Backend submission behavior against the running Express server.

## Manual production checklist

- Open the production homepage.
- Confirm the page loads without console errors.
- Test navigation and responsive layout.
- Test footer contact links.
- Submit a valid contact form.
- Test required-field validation.
- Verify the Google Sheet receives the submission when configured.
- Verify optional Gmail notifications when configured.
- Confirm the form fails gracefully when the backend is unavailable.
>>>>>>> 3236dc20a2e50f82cd11b4f120b0b284a37d1035
