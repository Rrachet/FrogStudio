# Frog Studios — Brand Studio Website

> A high-end, responsive marketing website for Frog Studios, with a Node.js contact-form backend, Google Sheets lead capture, optional Gmail notifications, and Netlify-compatible static hosting.

[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/API-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

Frog Studios is a creative studio website built around a bold visual identity: dark surfaces, orange accents, custom cursor interactions, animated sections, portfolio media, responsive navigation, and a conversion-focused contact experience.

The frontend is static HTML/CSS/JavaScript, while the optional Express server handles contact-form submission and integrations.

## Features

- Responsive one-page studio website
- Animated hero and scroll-reveal interactions
- Custom cursor and interactive portfolio cards
- Portfolio support for images and video
- Mobile navigation
- Contact form with client-side submission flow
- Express API endpoint: `POST /api/submit-form`
- Google Sheets lead capture through Apps Script webhook
- Optional Gmail admin + confirmation emails via Nodemailer
- Health endpoint: `GET /api/health`
- Netlify root redirect to the main studio page
- Environment-based configuration for secrets

## Architecture

```text
Static HTML / CSS / JavaScript
              │
              │ POST /api/submit-form
              ▼
       Node.js + Express
          │          │
          │          └──────────► Gmail / Nodemailer (optional)
          │
          └─────────────────────► Google Apps Script
                                      │
                                      ▼
                                Google Sheets
```

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Styling | Responsive CSS, CSS variables, animations |
| Backend | Node.js, Express |
| Request parsing | body-parser |
| Cross-origin requests | CORS |
| Lead capture | Google Apps Script + Google Sheets |
| Email | Nodemailer + Gmail SMTP |
| Hosting | Netlify-compatible static deployment |

## Project structure

```text
.
├── frog extra.html          # Main studio experience
├── index.html               # Alternate/static landing page
├── server.js                # Express API + integrations
├── netlify.toml             # Netlify routing
├── package.json
├── package-lock.json
├── .env.example
├── GOOGLE_SHEETS_SETUP.md
├── EMAIL_SETUP.md
├── NETLIFY_TESTPLAN.md
├── contact-form-testcases.json
└── contact-form-submit-test.ps1
```

## Run locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and provide the required Google Sheets deployment URL. Gmail is optional.

> Never commit `.env` or real credentials.

### 3. Start the server

```bash
npm start
```

Development mode:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/frog%20extra.html
```

The Netlify configuration redirects `/` to the same page.

## Contact form

The API requires `name`, `email`, and `service`. Optional fields include company, phone, budget, and message. The server builds a normalized submission with a timestamp before sending it to the configured destination.

The Google Sheets integration expects these columns:

```text
Timestamp | Name | Company | Email | Phone | Service | Budget | Message
```

See `GOOGLE_SHEETS_SETUP.md` for the Apps Script deployment flow and `EMAIL_SETUP.md` for Gmail App Password configuration.

## API

### `GET /api/health`

Returns server and integration status.

Example response:

```json
{
  "status": "Server is running",
  "googleSheetConfigured": true,
  "emailConfigured": false
}
```

### `POST /api/submit-form`

Example request:

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

## Verification status

The uploaded project was reviewed before publication.

### Verified locally

- `server.js` passes Node syntax validation.
- The frontend contains the expected contact-form submission flow to `/api/submit-form`.
- Netlify routing is configured for the main page.
- The supplied test suite covers valid, missing-field, and malformed-email cases.
- Existing recorded test results show that required-field validation returns `400` for missing name/service.

### Important limitation

A full live runtime integration test could not be completed in the execution environment because the project dependencies were not available locally and package installation could not complete. The server therefore was **not represented as fully runtime-verified**.

The supplied historical test results also show `500` responses for several submission cases, so the Google Sheets/email integration should be re-tested after configuring the real deployment URL and credentials.

## Deployment

For Netlify, the static site can be deployed directly, but the Express contact API must run on a separate Node-capable service or be migrated to a Netlify Function. The current `netlify.toml` only handles the static root redirect.

## Security notes

- Keep Gmail App Passwords out of Git.
- Keep `.env` out of Git.
- Do not commit Google deployment secrets.
- Validate and sanitize production inputs further before treating the endpoint as public-facing.
- Consider rate limiting and spam protection before production launch.

## Roadmap

- [ ] Move contact API to a serverless Netlify Function or dedicated backend deployment
- [ ] Add stronger email validation
- [ ] Add rate limiting / bot protection
- [ ] Add automated API tests in CI
- [ ] Add Lighthouse accessibility/performance checks
- [ ] Add production screenshots and deployment URL
- [ ] Add CI for lint/test/build verification

## Author

**Amarnath Mishra** — Computer Science Engineer building full-stack, AI/ML, web, and product-focused software.

[GitHub](https://github.com/Rrachet)