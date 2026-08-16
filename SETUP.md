# Frog Studios - Setup Guide

## Backend Setup for Form Submissions

This guide will help you set up the backend server to save form submissions to an Excel file.

### Prerequisites
- Node.js (v14 or higher) - Download from https://nodejs.org/
- npm (comes with Node.js)

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd c:\Users\DELL\Desktop\Froggy
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   ✅ Frog Studios server running on http://localhost:3000
   📊 Form submissions will be saved to: c:\Users\DELL\Desktop\Froggy\submissions.xlsx
   ```

3. **Test the Setup**
   - Open your browser to `http://localhost:3000`
   - Fill out the contact form
   - Submit and you should see a success popup
   - Check the `submissions.xlsx` file in the Froggy folder

### What Gets Saved

Each form submission saves:
- **Timestamp** - When the form was submitted
- **Name** - Client name
- **Company** - Company name
- **Email** - Contact email
- **Phone** - Contact phone
- **Service** - Service requested (Branding, Web, Video, etc.)
- **Budget** - Budget range
- **Message** - Additional message from client

### Features

✅ Form data automatically saved to Excel spreadsheet
✅ Beautiful success popup message with frog emoji 🐸
✅ Automatic Excel file creation on first submission
✅ Professional formatting with headers and colors
✅ Error handling and validation
✅ CORS enabled for frontend communication

### Troubleshooting

**Error: "Connection error. Please make sure the server is running"**
- Make sure the server is running: `npm start`
- Check that port 3000 is not blocked by firewall

**Excel file not created**
- Make sure the Froggy folder has write permissions
- Delete any corrupted `submissions.xlsx` and try again

**Form not sending**
- Check browser console (F12) for errors
- Verify all required fields are filled (Name, Email, Service)

### Development

For development with auto-restart on file changes:
```bash
npm run dev
```

### Production Deployment

When deploying to production, update the API endpoint in the HTML form from:
```javascript
fetch('http://localhost:3000/api/submit-form', {
```

To your production server URL:
```javascript
fetch('https://your-domain.com/api/submit-form', {
```

---

**Need help?** Contact: hello@frogstudios.in
