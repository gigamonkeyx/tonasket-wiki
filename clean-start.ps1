# Clean-start.ps1
# This script cleans up the .next directory and starts the development server

Write-Host "Cleaning up .next directory..." -ForegroundColor Cyan

# Check if .next directory exists and remove it
if (Test-Path -Path ".next") {
    Write-Host "Removing .next directory..." -ForegroundColor Yellow
    Remove-Item -Path ".next" -Recurse -Force
}

# Create an empty .next directory
Write-Host "Creating empty .next directory..." -ForegroundColor Green
New-Item -Path ".next" -ItemType Directory -Force | Out-Null

# Start the development server
Write-Host "Starting development server..." -ForegroundColor Cyan
npm run dev
