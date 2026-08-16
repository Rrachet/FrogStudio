# Google Sheets Setup Guide

Use this to save every Frog Studios contact form submission into a Google Sheet.

## 1. Create the Sheet

1. Open Google Sheets.
2. Create a new spreadsheet named `Frog Studios Form Submissions`.
3. Add these headers in row 1:

```text
Timestamp | Name | Company | Email | Phone | Service | Budget | Message
```

## 2. Add Apps Script

1. In the sheet, go to `Extensions` > `Apps Script`.
2. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.company || '',
      data.email || '',
      data.phone || '',
      data.service || '',
      data.budget || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save the project.

## 3. Deploy the Script

1. Click `Deploy` > `New deployment`.
2. Choose `Web app`.
3. Set `Execute as` to your Google account.
4. Set `Who has access` to `Anyone`.
5. Click `Deploy`.
6. Copy the Web App URL. It should look like:

```text
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## 4. Connect the Website

Run the server with the URL set as `GOOGLE_SHEET_URL`.

PowerShell:

```powershell
$env:GOOGLE_SHEET_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
node server.js
```

Command Prompt:

```bat
set GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
node server.js
```

Or use `run-server.ps1` / `run-server.bat`; the launcher will ask for the URL if it is missing.

## 5. Test

1. Start the server.
2. Open `http://localhost:3000/frog%20extra.html`.
3. Submit the contact form.
4. Check the Google Sheet for the new row.

Email notifications are optional. Set `EMAIL_PASSWORD` only if you also want Gmail notifications.
