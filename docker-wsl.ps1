# Script to run Docker commands through WSL
param (
    [Parameter(Position=0, Mandatory=$true)]
    [string]$Command,
    
    [Parameter(Position=1, ValueFromRemainingArguments=$true)]
    [string[]]$Arguments
)

# Combine the arguments into a single string
$ArgumentString = $Arguments -join " "

# Run the Docker command through WSL
$DockerCommand = "docker $Command $ArgumentString"
Write-Host "Running: $DockerCommand"
wsl $DockerCommand
