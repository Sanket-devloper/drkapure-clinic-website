@echo off
echo ============================================
echo  Dr. Kapure Clinic - Project Setup Script
echo ============================================
echo.

cd /d "D:\clinic website"

echo [1/3] Creating folder structure...
mkdir src\components 2>nul
mkdir src\pages\services 2>nul
mkdir src\treatments\skin 2>nul
mkdir src\treatments\hair 2>nul
mkdir src\treatments\laser 2>nul
mkdir src\data 2>nul
mkdir public\images\hero 2>nul
mkdir public\images\treatments 2>nul
mkdir public\images\gallery 2>nul
mkdir public\images\doctor 2>nul
echo    Folders created successfully!

echo.
echo [2/3] Installing all npm packages...
echo    This may take 2-3 minutes, please wait...
npm install
echo    Packages installed successfully!

echo.
echo [3/3] Setup Complete!
echo ============================================
echo  Now run:  npm run dev
echo  Then open: http://localhost:5173
echo ============================================
pause
