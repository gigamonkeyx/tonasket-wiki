# Check if Docker is installed
$dockerInstalled = $false
try {
    $dockerVersion = docker --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Docker is installed: $dockerVersion" -ForegroundColor Green
        $dockerInstalled = $true
    }
} catch {
    Write-Host "Docker Desktop is not installed or not in PATH." -ForegroundColor Yellow
}

# Check if WSL Docker is available
$wslDockerAvailable = $false
try {
    $wslDockerVersion = wsl docker --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Docker in WSL is available: $wslDockerVersion" -ForegroundColor Green
        $wslDockerAvailable = $true
    }
} catch {
    Write-Host "Docker in WSL is not available." -ForegroundColor Yellow
}

# Determine which Docker to use
$useWslDocker = $false
if (-not $dockerInstalled -and $wslDockerAvailable) {
    $useWslDocker = $true
    Write-Host "Using Docker through WSL." -ForegroundColor Cyan
} elseif (-not $dockerInstalled -and -not $wslDockerAvailable) {
    Write-Host "Docker is not available. Please install Docker using the instructions in DOCKER-SETUP.md." -ForegroundColor Red
    Write-Host "Would you like to continue without Docker? (y/n)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -ne "y") {
        exit 1
    }
    Write-Host "Continuing without Docker. Some features may not work properly." -ForegroundColor Yellow
}

# Start Docker containers
if ($dockerInstalled -or $wslDockerAvailable) {
    if ($useWslDocker) {
        Write-Host "Starting Docker containers through WSL..." -ForegroundColor Green
        wsl docker-compose up -d
    } else {
        Write-Host "Starting Docker containers..." -ForegroundColor Green
        docker-compose up -d
    }

    # Wait for PostgreSQL to be ready
    Write-Host "Waiting for PostgreSQL to be ready..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5

    # Check if containers are running
    if ($useWslDocker) {
        $containersRunning = wsl docker ps | Select-String "postgres"
    } else {
        $containersRunning = docker ps | Select-String "postgres"
    }

    if (-not $containersRunning) {
        Write-Host "Warning: Docker containers may not be running properly." -ForegroundColor Red
        Write-Host "Would you like to continue anyway? (y/n)" -ForegroundColor Yellow
        $response = Read-Host
        if ($response -ne "y") {
            exit 1
        }
    }

    # Run Prisma migrations
    Write-Host "Running Prisma migrations..." -ForegroundColor Green
    npx prisma migrate dev --name init
} else {
    Write-Host "Skipping Docker and database setup." -ForegroundColor Yellow
}

# Start Next.js development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
npm run dev
