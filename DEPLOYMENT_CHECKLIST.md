# Deployment Checklist

## Before deployment

- [ ] `npm install` completes successfully
- [ ] Node.js version matches the deployment runtime
- [ ] `.env` is not committed
- [ ] Production environment variables are configured in the hosting provider
- [ ] Google Apps Script deployment URL is correct
- [ ] Gmail credentials are configured only if email notifications are enabled
- [ ] No API keys or credentials are hard-coded in frontend files

## Application checks

- [ ] Frontend loads successfully
- [ ] Responsive navigation works on mobile and desktop
- [ ] Portfolio images and videos load correctly
- [ ] Contact form validates required fields
- [ ] `GET /api/health` returns the expected status
- [ ] Valid form submission returns success or a documented warning
- [ ] Missing required fields return a client error
- [ ] Invalid email input is rejected
- [ ] Google Sheets receives a valid submission
- [ ] Email notifications are delivered when enabled

## Production checks

- [ ] HTTPS is enabled
- [ ] Custom domain is configured if required
- [ ] Server logs are accessible
- [ ] External integration failures are visible in logs
- [ ] Rate limiting or spam protection is enabled before high-volume traffic
- [ ] CORS configuration is appropriate for the production frontend
- [ ] Error responses do not expose secrets or internal implementation details

## Post-deployment smoke test

1. Open the production website.
2. Test the primary navigation.
3. Submit a valid contact form with a controlled test address.
4. Confirm the API response.
5. Confirm the Google Sheets entry.
6. Confirm email delivery if enabled.
7. Test one invalid submission.
8. Check deployment logs for unexpected errors.

## Rollback

If a deployment causes a critical regression:

1. Stop accepting new production changes.
2. Inspect deployment logs.
3. Roll back to the last known-good deployment.
4. Record the failure and reproduction steps.
5. Fix and re-test before redeploying.
