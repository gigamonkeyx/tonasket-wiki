# Stop Docker containers
Write-Host "Stopping Docker containers..." -ForegroundColor Green
docker-compose down

Write-Host "Development environment stopped." -ForegroundColor Green
