# Script to run Docker Compose commands through WSL
param (
    [Parameter(Position=0, Mandatory=$true)]
    [string]$Command,
    
    [Parameter(Position=1, ValueFromRemainingArguments=$true)]
    [string[]]$Arguments
)

# Combine the arguments into a single string
$ArgumentString = $Arguments -join " "

# Run the Docker Compose command through WSL
$DockerComposeCommand = "docker-compose $Command $ArgumentString"
Write-Host "Running: $DockerComposeCommand"
wsl $DockerComposeCommand
