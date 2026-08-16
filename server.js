const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL || '';
const EMAIL_USER = process.env.EMAIL_USER || 'frogstudiozz@gmail.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.dirname(__filename)));

function isEmailConfigured() {
  return Boolean(EMAIL_USER && EMAIL_PASSWORD && EMAIL_PASSWORD !== 'your_app_password_here');
}

function createTransporter() {
  if (!isEmailConfigured()) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });
}

const transporter = createTransporter();

if (transporter) {
  transporter.verify((error) => {
    if (error) {
      console.log('Email configuration error:', error.message);
    } else {
      console.log('Email service ready');
    }
  });
} else {
  console.log('Email notifications disabled. Set EMAIL_PASSWORD to enable them.');
}

function requestJson(url, payload, method = 'POST', redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('GOOGLE_SHEET_URL is not configured'));
      return;
    }

    // Many Google Apps Script webhooks accept JSON, but some return plain text.
    const body = method === 'POST' ? JSON.stringify(payload) : '';
    const request = https.request(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (response) => {
      let responseBody = '';

      response.on('data', (chunk) => {
        responseBody += chunk;
      });

      response.on('end', () => {
        const isRedirect = response.statusCode >= 300 && response.statusCode < 400 && response.headers.location;

        if (isRedirect && redirectsLeft > 0) {
          const nextUrl = new URL(response.headers.location, url).toString();
          const nextMethod = response.statusCode === 307 || response.statusCode === 308 ? method : 'GET';
          requestJson(nextUrl, payload, nextMethod, redirectsLeft - 1).then(resolve).catch(reject);
          return;
        }

        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`Google Sheet returned HTTP ${response.statusCode}: ${responseBody}`));
          return;
        }

        // Try parsing JSON, but fall back to a success object if the response is plain text.
        if (!responseBody) return resolve({ success: true });

        try {
          resolve(JSON.parse(responseBody));
        } catch {
          resolve({ success: true, raw: responseBody });
        }
      });
    });

    request.on('error', reject);
    request.write(body);
    request.end();
  });
}


function postJson(url, payload) {
  return requestJson(url, payload);
}

async function appendToGoogleSheet(submission) {
  const result = await postJson(GOOGLE_SHEET_URL, submission);

  if (result && result.success === false) {
    throw new Error(result.error || 'Google Sheet rejected the submission');
  }

  return result;
}

async function sendLeadEmails(submission) {
  if (!transporter) return { skipped: true };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7cf257; border-bottom: 2px solid #7cf257; padding-bottom: 10px;">New Contact Form Submission</h2>
      <div style="margin: 20px 0; line-height: 1.8;">
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Phone:</strong> ${submission.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${submission.company || 'Not provided'}</p>
        <p><strong>Service Needed:</strong> ${submission.service}</p>
        <p><strong>Budget Range:</strong> ${submission.budget || 'Not specified'}</p>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #7cf257; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Message:</h3>
        <p style="margin: 0; white-space: pre-wrap; word-wrap: break-word;">${submission.message || 'No message provided'}</p>
      </div>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
        <p>Submitted on: ${submission.timestamp}</p>
        <p>From: Frog Studios Website</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: EMAIL_USER,
    to: EMAIL_TO,
    subject: `New Contact Form Submission from ${submission.name}`,
    html: htmlContent,
    replyTo: submission.email
  });

  const confirmationEmail = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7cf257;">Thank you, ${submission.name}</h2>
      <p>We have received your message and will get back to you shortly.</p>
      <p>Our team typically responds within 24 hours.</p>
      <br>
      <p>Best regards,<br><strong>Frog Studios Team</strong></p>
    </div>
  `;

  await transporter.sendMail({
    from: EMAIL_USER,
    to: submission.email,
    subject: 'We received your message - Frog Studios',
    html: confirmationEmail
  });

  return { skipped: false };
}

app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, company, email, phone, service, budget, message } = req.body;

    if (!name || !email || !service) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields'
      });
    }

    const submission = {
      timestamp: new Date().toISOString(),
      name: String(name).trim(),
      company: String(company || '').trim(),
      email: String(email).trim(),
      phone: String(phone || '').trim(),
      service: String(service).trim(),
      budget: String(budget || '').trim(),
      message: String(message || '').trim()
    };

    if (!GOOGLE_SHEET_URL && !transporter) {
      return res.status(500).json({
        success: false,
        error: 'No form destination is configured. Set GOOGLE_SHEET_URL to save submissions.'
      });
    }

    let sheetSaved = false;
    let emailSent = false;
    const warnings = [];

    if (GOOGLE_SHEET_URL) {
      await appendToGoogleSheet(submission);
      sheetSaved = true;
    }

    try {
      const emailResult = await sendLeadEmails(submission);
      emailSent = !emailResult.skipped;
    } catch (error) {
      warnings.push(`Email notification failed: ${error.message}`);
      console.error('Email notification failed:', error);
    }

    console.log(`Form submitted by ${submission.name} (${submission.email}). Sheet saved: ${sheetSaved}. Email sent: ${emailSent}.`);

    res.json({
      success: true,
      message: 'Your form has been submitted successfully.',
      sheetSaved,
      emailSent,
      warnings
    });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while saving your submission. Please check the server configuration.'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    googleSheetConfigured: Boolean(GOOGLE_SHEET_URL),
    emailConfigured: Boolean(transporter)
  });
});

app.listen(PORT, () => {
  console.log(`Frog Studios server running on http://localhost:${PORT}`);
  console.log(`Google Sheet capture: ${GOOGLE_SHEET_URL ? 'enabled' : 'disabled'}`);
  console.log(`Email notifications: ${transporter ? 'enabled' : 'disabled'}`);
});
