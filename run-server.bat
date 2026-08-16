@echo off
REM Frog Studios Server Launcher

echo.
echo =========================================
echo   Frog Studios - Server Launcher
echo =========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Ask for Google Sheet URL if it is missing
if not defined GOOGLE_SHEET_URL (
    echo.
    echo GOOGLE_SHEET_URL is not set.
    echo Paste your Google Apps Script Web App URL to save form leads in your sheet.
    echo Leave blank only if you want to run without sheet capture.
    set /p GOOGLE_SHEET_URL="Google Sheet Web App URL: "
    echo.
) else (
    echo Google Sheet capture is already configured.
    echo.
)

REM Email is optional now
if not defined EMAIL_PASSWORD (
    echo EMAIL_PASSWORD is not set. Email notifications will be skipped.
    echo The contact form can still save submissions to Google Sheets.
    echo.
) else (
    echo Email notifications are configured.
    echo.
)

echo Starting Frog Studios server...
echo Server will be available at http://localhost:3000
echo.
node server.js

pause
