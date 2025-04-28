# Docker Setup for Tonasket Wiki

This document provides instructions for setting up Docker for the Tonasket Wiki project.

## Option 1: Docker Desktop (Requires sufficient space on C: drive)

If you have sufficient space on your C: drive, you can install Docker Desktop:

1. Download Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Run the installer and follow the prompts
3. After installation, start Docker Desktop
4. Open a terminal in the project directory and run:
   ```
   docker-compose up -d
   ```

## Option 2: Docker Engine with WSL 2 (Uses D: drive)

If you don't have sufficient space on your C: drive, you can use Docker Engine with WSL 2:

1. Open PowerShell as Administrator
2. Navigate to the project directory
3. Run the WSL and Docker setup script:
   ```
   .\setup-wsl-docker.ps1
   ```
4. After installation, you can run Docker commands through WSL using the provided scripts:
   ```
   # To run Docker commands
   .\docker-wsl.ps1 ps
   
   # To run Docker Compose commands
   .\docker-compose-wsl.ps1 up -d
   ```

## Verifying the Installation

To verify that Docker is installed correctly, run:

```
# If using Docker Desktop
docker --version
docker-compose --version

# If using Docker Engine with WSL
.\docker-wsl.ps1 --version
.\docker-compose-wsl.ps1 --version
```

## Running the Tonasket Wiki with Docker

1. Start the Docker containers:
   ```
   # If using Docker Desktop
   docker-compose up -d
   
   # If using Docker Engine with WSL
   .\docker-compose-wsl.ps1 up -d
   ```

2. The application will be available at [http://localhost:3000](http://localhost:3000)

3. The PostgreSQL database will be available at:
   - Host: localhost
   - Port: 5432
   - Username: postgres
   - Password: postgres
   - Database: tonasket_wiki

4. PgAdmin will be available at [http://localhost:5050](http://localhost:5050)
   - Email: admin@tonasket.local
   - Password: admin

## Stopping the Containers

To stop the Docker containers:

```
# If using Docker Desktop
docker-compose down

# If using Docker Engine with WSL
.\docker-compose-wsl.ps1 down
```

## Troubleshooting

If you encounter any issues with Docker, try the following:

1. Ensure WSL 2 is installed and configured correctly:
   ```
   wsl --status
   ```

2. Restart the Docker service:
   ```
   # If using Docker Desktop
   Restart Docker Desktop application
   
   # If using Docker Engine with WSL
   wsl -d Ubuntu-20.04 -e sudo service docker restart
   ```

3. Check if the containers are running:
   ```
   # If using Docker Desktop
   docker ps
   
   # If using Docker Engine with WSL
   .\docker-wsl.ps1 ps
   ```
