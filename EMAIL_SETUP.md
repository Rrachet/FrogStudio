# Email Configuration Guide

<<<<<<< HEAD
Your website is now configured to send contact form submissions directly to **frogstudiozz@gmail.com**.

## Setup Instructions

### Step 1: Get Gmail App Password

Since you're using Gmail, you need to generate an **App Password** (not your regular Gmail password):

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go back to Security settings and you should see **App passwords** option
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password - copy this

### Step 2: Set Environment Variable

You have two options:

#### Option A: Set Environment Variable (Recommended for Production)
```powershell
# Set environment variable (Windows)
$env:EMAIL_PASSWORD="your_16_character_app_password"
```

Add this to the top of your PowerShell script or set it permanently in Windows Environment Variables.

#### Option B: Create .env File (Development)
1. Copy `.env.example` to `.env`
2. Replace `your_gmail_app_password_here` with your actual 16-character app password
3. Install dotenv package and load it in server.js (optional but recommended)

### Step 3: Install Dependencies

Run this command in your project directory:
=======
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

>>>>>>> 3236dc20a2e50f82cd11b4f120b0b284a37d1035
```powershell
npm install
```

<<<<<<< HEAD
This will install:
- **nodemailer** - for sending emails
- Plus other required dependencies

### Step 4: Start the Server

```powershell
# On Windows PowerShell
=======
### 4. Start the server

```powershell
>>>>>>> 3236dc20a2e50f82cd11b4f120b0b284a37d1035
$env:EMAIL_PASSWORD="your_16_character_app_password"
node server.js
```

<<<<<<< HEAD
Or if you created a `.env` file, you can skip the environment variable line.

## How It Works

When someone fills out the "Get In Touch" form:

1. ✅ The form data is validated
2. 📧 An email is sent to **frogstudiozz@gmail.com** with all the form details
3. 🐸 A confirmation email is sent to the user's email address
4. ✨ A success message is shown to the user

## Troubleshooting

### "Error: connect ECONNREFUSED"
- Make sure the server is running
- Command: `node server.js`

### "Invalid login: 535-5.7.8 Username and password not accepted"
- Your EMAIL_PASSWORD environment variable is not set or incorrect
- Use the 16-character App Password from Google, not your regular Gmail password

### "Error: getaddrinfo: nodename nor servername provided"
- Check your internet connection
- Gmail SMTP server might be temporarily unavailable

### Still having issues?
1. Check that 2-Step Verification is enabled on your Gmail account
2. Verify you're using the correct 16-character App Password
3. Check that the EMAIL_PASSWORD environment variable is set correctly
4. Look at the server console output for specific error messages

## Important Notes

- Keep your App Password **secret** - don't commit it to version control
- Each submitted form creates both an admin email and a user confirmation email
- Emails are sent in HTML format with nice styling
- The reply-to address in the admin email is set to the user's email for easy responses

## Need Help?

If emails aren't sending:
1. Run: `npm install` to ensure nodemailer is installed
2. Verify Gmail App Password is correct
3. Check firewall/antivirus isn't blocking port 587
4. Look at server console for error messages
=======
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
>>>>>>> 3236dc20a2e50f82cd11b4f120b0b284a37d1035
