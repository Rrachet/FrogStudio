# Email Configuration Guide

The website can send contact form submissions to `frogstudiozz@gmail.com` and send a confirmation email to the person who submitted the form.

## Setup

### 1. Get Gmail App Password

Since Gmail is used, generate an **App Password** rather than using the regular Gmail password.

1. Enable 2-Step Verification in Google Account security settings.
2. Open App Passwords.
3. Create an app password for the environment/device.
4. Copy the generated password.

### 2. Set environment variable

PowerShell:

```powershell
$env:EMAIL_PASSWORD="your_16_character_app_password"
```

Or create `.env` locally from `.env.example` and set the value there.

### 3. Install dependencies

```powershell
npm install
```

### 4. Start the server

```powershell
$env:EMAIL_PASSWORD="your_16_character_app_password"
node server.js
```

## How it works

When someone submits the contact form:

1. Form data is validated.
2. The configured lead destination receives the submission.
3. An admin email is sent when Gmail is configured.
4. A confirmation email is sent to the submitter.
5. The website displays a success state.

## Troubleshooting

- `ECONNREFUSED`: make sure the Node server is running.
- Gmail `535` authentication errors: verify the App Password and 2-Step Verification.
- Google Sheets failures: verify `GOOGLE_SHEET_URL` and the Apps Script deployment.

## Security

Never commit a real Gmail App Password or `.env` file to version control.