# Frog Studios Architecture

## System overview

Frog Studios uses a lightweight frontend with an optional Express API for lead capture and notifications.

```text
                    Browser
                       |
                       v
             HTML / CSS / JavaScript
                       |
                       | POST /api/submit-form
                       v
                 Express API
                  /       \
                 /         \
                v           v
      Google Apps Script   Nodemailer
                |           |
                v           v
         Google Sheets    Gmail SMTP
```

## Frontend

The frontend is a static HTML/CSS/JavaScript application. Responsibilities include:

- Rendering the studio experience
- Responsive navigation
- Animations and interactive portfolio behaviour
- Client-side form collection
- Sending form data to the backend endpoint

The frontend must not contain provider credentials or other server-side secrets.

## Backend

`server.js` provides an Express application with two primary responsibilities:

- `GET /api/health` exposes basic server/integration configuration status.
- `POST /api/submit-form` validates and normalizes contact-form input before forwarding it to configured integrations.

The service reads configuration from environment variables.

## Lead capture flow

```text
User submits form
      |
      v
Client request
      |
      v
POST /api/submit-form
      |
      +---- validate required fields
      |
      +---- normalize submission
      |
      +---- Google Apps Script -> Google Sheets
      |
      +---- optional Nodemailer -> Gmail
      |
      v
JSON response to client
```

## Configuration boundary

Sensitive configuration belongs on the server:

- Google Sheets deployment URL
- Gmail account configuration
- Gmail app password or equivalent credential
- Runtime port

`.env` is ignored by Git and `.env.example` documents the expected configuration shape.

## Deployment model

The frontend can be served statically. The Express API must run on a Node-capable runtime. If the project is deployed entirely as a static site, the contact endpoint must be moved to a serverless function or another backend service.

## Reliability considerations

Before treating the contact workflow as production-ready, add:

- Automated API tests
- Rate limiting
- Bot/spam protection
- Stronger input validation
- Structured server logging
- Monitoring for failed integration calls
- Clear retry/failure handling for external services

## Design principles

1. Keep presentation, transport, and external integrations conceptually separate.
2. Keep secrets outside source control.
3. Make API behaviour explicit and testable.
4. Prefer simple architecture until scale requires additional infrastructure.
5. Document deployment assumptions so the next engineer can reproduce the system.
