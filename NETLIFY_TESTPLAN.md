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