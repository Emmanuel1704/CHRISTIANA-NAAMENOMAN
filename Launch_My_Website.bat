@echo off
title Launching Chrisnoman Fashion Platform
echo --------------------------------------------------
echo ✨ STARTING CHRISNOMAN FASHION HOUSE ✨
echo --------------------------------------------------

:: Check if MySQL is running (Optional, but helpful)
echo [1/3] Checking Database...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MySQL is already running.
) else (
    echo [!!] WARNING: Please make sure XAMPP MySQL is started!
)

:: Check if Apache is running (XAMPP)
echo [2/3] Checking Apache Server...
tasklist /FI "IMAGENAME eq httpd.exe" 2>NUL | find /I /N "httpd.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] Apache is already running.
) else (
    echo [!!] WARNING: Please make sure XAMPP Apache is started!
)

:: Start Frontend Bundler in a new hidden window (Optional, for HMR)
echo [3/3] Starting Design Engine...
start /min cmd /c "npm run dev"

:: Wait a few seconds for servers to warm up
timeout /t 3 /nobreak >nul

:: Open the website in the default browser
echo [SUCCESS] Opening your Luxury Website...
start http://localhost/fashion/public

echo --------------------------------------------------
echo Website is now LIVE at http://localhost/fashion/public
echo You can minimize this window. Close it to stop.
echo --------------------------------------------------
pause
