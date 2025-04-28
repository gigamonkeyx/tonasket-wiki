# Script to install WSL 2 and Docker Engine on D: drive

# Step 1: Install WSL 2
Write-Host "Installing WSL 2..."
wsl --install

# Step 2: Create a directory for WSL distro on D: drive
Write-Host "Creating directory for WSL on D: drive..."
New-Item -ItemType Directory -Force -Path "D:\WSL"

# Step 3: Download Ubuntu 20.04 for WSL
Write-Host "Downloading Ubuntu 20.04 for WSL..."
Invoke-WebRequest -Uri https://aka.ms/wslubuntu2004 -OutFile "D:\WSL\Ubuntu2004.appx" -UseBasicParsing

# Step 4: Extract the Ubuntu appx package
Write-Host "Extracting Ubuntu package..."
Expand-Archive -Path "D:\WSL\Ubuntu2004.appx" -DestinationPath "D:\WSL\Ubuntu" -Force

# Step 5: Import the WSL distro to D: drive
Write-Host "Importing WSL distro to D: drive..."
wsl --import Ubuntu-20.04 "D:\WSL\Ubuntu-20.04" "D:\WSL\Ubuntu\install.tar.gz"

# Step 6: Set Ubuntu-20.04 as the default distro
Write-Host "Setting Ubuntu-20.04 as the default WSL distro..."
wsl --set-default Ubuntu-20.04

# Step 7: Install Docker Engine in WSL
Write-Host "Installing Docker Engine in WSL..."
wsl -d Ubuntu-20.04 -e bash -c '
    # Update package list
    sudo apt-get update
    
    # Install prerequisites
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    
    # Add Docker GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    
    # Add Docker repository
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    
    # Update package list again
    sudo apt-get update
    
    # Install Docker Engine
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    
    # Start Docker service
    sudo service docker start
    
    # Add current user to docker group
    sudo usermod -aG docker $USER
    
    # Install Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    # Create symbolic link to Docker Compose
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    
    # Verify Docker installation
    docker --version
    docker-compose --version
'

Write-Host "WSL 2 and Docker Engine installation complete!"
Write-Host "You can now use Docker commands through WSL by prefixing them with 'wsl', for example:"
Write-Host "wsl docker ps"
Write-Host "wsl docker-compose up -d"
