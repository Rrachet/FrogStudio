# Frog Studios Server Launcher (PowerShell)

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Frog Studios - Server Launcher" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

if (-not $env:GOOGLE_SHEET_URL) {
    Write-Host ""
    Write-Host "GOOGLE_SHEET_URL is not set." -ForegroundColor Yellow
    Write-Host "Paste your Google Apps Script Web App URL to save form leads in your sheet." -ForegroundColor Yellow
    Write-Host "Leave blank only if you want to run the website without sheet capture." -ForegroundColor DarkYellow
    $sheetUrl = Read-Host "Google Sheet Web App URL"

    if ($sheetUrl) {
        $env:GOOGLE_SHEET_URL = $sheetUrl
        Write-Host "Google Sheet capture is now enabled for this session." -ForegroundColor Green
    } else {
        Write-Host "Google Sheet capture will be disabled for this session." -ForegroundColor Yellow
    }
    Write-Host ""
} else {
    Write-Host "Google Sheet capture is already configured." -ForegroundColor Green
    Write-Host ""
}

if (-not $env:EMAIL_PASSWORD) {
    Write-Host "EMAIL_PASSWORD is not set. Email notifications will be skipped." -ForegroundColor Yellow
    Write-Host "The contact form can still save submissions to Google Sheets." -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "Email notifications are configured." -ForegroundColor Green
    Write-Host ""
}

Write-Host "Starting Frog Studios server..." -ForegroundColor Cyan
Write-Host "Server will be available at http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

node server.js
