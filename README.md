# Frog Studios

> A high-end studio website for Frog Studios with responsive UI, interactive portfolio experiences, lead capture, Google Sheets integration, optional email notifications, and a Node.js/Express backend.

[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/API-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

Frog Studios is a conversion-focused studio website built around a bold visual identity, responsive layouts, animated sections, portfolio media, custom interactions, and a contact workflow.

The frontend is static HTML/CSS/JavaScript. The optional Express service handles contact-form submission and integrations with Google Sheets and Gmail.

## Features

- Responsive studio website
- Animated hero and scroll-reveal interactions
- Custom cursor and interactive portfolio cards
- Image and video portfolio support
- Mobile navigation
- Contact form with client-side submission flow
- `POST /api/submit-form` contact endpoint
- Google Sheets lead capture through Apps Script
- Optional Gmail notifications through Nodemailer
- `GET /api/health` health endpoint
- Environment-based configuration for secrets

## Architecture

```text
HTML / CSS / JavaScript
          |
          | POST /api/submit-form
          v
   Node.js + Express
       |         |
       |         +--------> Gmail / Nodemailer (optional)
       |
       +------------------> Google Apps Script
                                  |
                                  v
                            Google Sheets
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for the system design and data flow.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Styling | Responsive CSS, CSS variables, animations |
| Backend | Node.js, Express |
| Lead capture | Google Apps Script, Google Sheets |
| Email | Nodemailer, Gmail SMTP |
| Hosting | Vercel / static hosting compatible with the frontend |

## Project Structure

```text
.
├── index.html
├── frog extra.html
├── server.js
├── netlify.toml
├── package.json
├── package-lock.json
├── .env.example
├── GOOGLE_SHEETS_SETUP.md
├── EMAIL_SETUP.md
├── NETLIFY_TESTPLAN.md
└── contact-form-submit-test.ps1
```

## Local Development

```bash
npm install
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

If you are using the static page directly, open `index.html` or the configured main page. The Express API runs on the port defined by `PORT`, defaulting to `3000`.

### Environment variables

Copy `.env.example` to `.env` and configure the integrations you need.

Never commit `.env` or real credentials.

## API

### `GET /api/health`

Returns the current server and integration configuration state.

### `POST /api/submit-form`

Accepts contact-form data such as:

```json
{
  "name": "Jane Doe",
  "company": "Example Co",
  "email": "jane@example.com",
  "phone": "+91 9000000000",
  "service": "Brand Strategy",
  "budget": "₹1L - ₹3L",
  "message": "We need a new brand identity."
}
```

The Google Sheets integration expects:

```text
Timestamp | Name | Company | Email | Phone | Service | Budget | Message
```

## Verification

The repository includes local validation and contact-form test documentation. Historical testing recorded successful validation for missing required fields, while some integration scenarios returned server errors and require re-testing with the production integration credentials.

This distinction is intentional: the repository does not claim a production integration is fully verified unless it has actually been tested against the configured deployment.

## Deployment

The frontend can be deployed as a static site. The Express API requires a Node-capable deployment such as Vercel's server runtime or another backend host.

Before production deployment:

- Configure environment variables
- Verify the Google Apps Script URL
- Verify Gmail credentials if email notifications are enabled
- Test `/api/health`
- Test valid and invalid form submissions
- Confirm Google Sheets writes
- Confirm email delivery if enabled

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

## Security

- Keep `.env` and credentials out of source control.
- Use environment variables for Google and email configuration.
- Validate and sanitize public form input.
- Add rate limiting and spam protection before high-volume production use.
- Do not expose provider credentials in frontend JavaScript.

## Roadmap

- [ ] Add automated API tests to CI
- [ ] Add stronger email validation
- [ ] Add rate limiting and bot protection
- [ ] Add Lighthouse accessibility/performance checks
- [ ] Add production screenshots
- [ ] Add structured logging
- [ ] Add deployment status to CI

## Documentation

- [Architecture](ARCHITECTURE.md)
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md)
- [Contributing](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)

## Author

**Amarnath Mishra** — Software Engineer and product-focused developer.

[GitHub](https://github.com/Rrachet)
