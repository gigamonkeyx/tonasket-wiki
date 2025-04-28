# Script to install Docker Engine without Docker Desktop
# This is a more lightweight approach that requires less disk space

# Install required Windows features
Write-Host "Installing required Windows features..."
Install-WindowsFeature -Name Containers

# Download Docker Engine
Write-Host "Downloading Docker Engine..."
Invoke-WebRequest -UseBasicParsing "https://download.docker.com/win/static/stable/x86_64/docker-20.10.9.zip" -OutFile "D:\docker.zip"

# Create Docker directory on D: drive
Write-Host "Creating Docker directory on D: drive..."
New-Item -ItemType Directory -Force -Path "D:\Docker"

# Extract Docker Engine
Write-Host "Extracting Docker Engine..."
Expand-Archive -Path "D:\docker.zip" -DestinationPath "D:\Docker" -Force

# Add Docker to PATH
Write-Host "Adding Docker to PATH..."
$env:Path += ";D:\Docker"
[Environment]::SetEnvironmentVariable("Path", $env:Path, [EnvironmentVariableTarget]::Machine)

# Create Docker service
Write-Host "Creating Docker service..."
& D:\Docker\docker\dockerd.exe --register-service

# Start Docker service
Write-Host "Starting Docker service..."
Start-Service docker

Write-Host "Docker Engine installation complete!"
