# Email Configuration Guide

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
```powershell
npm install
```

This will install:
- **nodemailer** - for sending emails
- Plus other required dependencies

### Step 4: Start the Server

```powershell
# On Windows PowerShell
$env:EMAIL_PASSWORD="your_16_character_app_password"
node server.js
```

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
