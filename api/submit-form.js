const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER || 'frogstudiozz@gmail.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
const EMAIL_TO = process.env.EMAIL_TO || 'amarnathmishra5200@gmail.com';

const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function leadHtml(s) {
  const row = (k, v) => `<p><strong>${k}:</strong> ${esc(v) || 'Not provided'}</p>`;
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
    <h2 style="color:#ff5a1f;border-bottom:2px solid #ff5a1f;padding-bottom:10px">New enquiry from the Frog Studios website</h2>
    <div style="margin:20px 0;line-height:1.8">
      ${row('Name', s.name)}${row('Company', s.company)}${row('Contact number', s.phone)}
      ${row('Email', s.email)}${row('Service needed', s.service)}${row('Budget', s.budget)}
    </div>
    <div style="background:#f5f5f5;padding:15px;border-left:4px solid #ff5a1f;margin:20px 0">
      <h3 style="margin-top:0;color:#333">Message</h3>
      <p style="margin:0;white-space:pre-wrap;word-wrap:break-word">${esc(s.message) || 'No message provided'}</p>
    </div>
    <p style="font-size:12px;color:#666">Submitted ${esc(s.timestamp)}</p>
  </div>`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const submission = {
    name: String(body.name || '').trim(),
    company: String(body.company || '').trim(),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    service: String(body.service || body.project || '').trim(),
    budget: String(body.budget || '').trim(),
    message: String(body.message || '').trim(),
    timestamp: new Date().toISOString()
  };

  if (!submission.name || !submission.email || !submission.service) {
    return res.status(400).json({ success: false, error: 'Please fill in all required fields' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(submission.email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
  }

  if (!EMAIL_PASSWORD) {
    console.error('EMAIL_PASSWORD is not set — cannot send lead email', submission.email);
    return res.status(500).json({ success: false, error: 'Email is not configured on the server' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD }
  });

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      replyTo: submission.email,
      subject: `New enquiry from ${submission.name}${submission.company ? ' (' + submission.company + ')' : ''}`,
      html: leadHtml(submission)
    });
  } catch (err) {
    console.error('Lead email failed:', err.message);
    return res.status(502).json({ success: false, error: 'Could not send your message. Please email us directly.' });
  }

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: submission.email,
      subject: 'We received your message — Frog Studios',
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#ff5a1f">Thank you, ${esc(submission.name)}</h2>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Best,<br><strong>Frog Studios</strong></p></div>`
    });
  } catch (err) {
    console.error('Confirmation email failed:', err.message);
  }

  return res.status(200).json({ success: true, message: 'Your form has been submitted successfully.' });
};
