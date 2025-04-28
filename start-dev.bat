@echo off
echo Starting Tonasket Resource Wiki Development Server
echo ==============================================

rem Change to the project directory
cd /d "%~dp0"
echo Current directory: %CD%

rem Check if the src/app directory exists
if not exist "src\app" (
  echo Error: src/app directory not found
  echo Make sure you are in the correct project directory
  exit /b 1
)

rem Set environment variables
set NODE_ENV=development
set NEXT_TELEMETRY_DISABLED=1
set APP_ROOT_PATH=%CD%
set SRC_DIR=src
set PUBLIC_DIR=public
set PORT=3000
set HOST=localhost

rem Start the development server
echo.
echo Starting Next.js development server...
echo Press Ctrl+C to stop the server
echo.

npx --no-install next dev
