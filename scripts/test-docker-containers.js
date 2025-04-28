/**
 * Test script to verify Docker container communication
 * This script checks if Docker containers are running and communicating properly
 */

const { exec } = require('child_process');
const chalk = require('chalk'); // You may need to install this: npm install chalk

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;

console.log(INFO('Testing Docker Containers'));
console.log(INFO('======================='));

// Helper function to execute shell commands
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

// Test function
async function testDockerContainers() {
  let passedTests = 0;
  let failedTests = 0;
  
  try {
    // Test 1: Check if Docker is running
    console.log(INFO('\nTest 1: Checking if Docker is running...'));
    try {
      await executeCommand('docker info');
      console.log(SUCCESS('✓ Docker is running'));
      passedTests++;
    } catch (error) {
      console.log(ERROR('✗ Docker is not running'));
      console.log(ERROR(`  Error: ${error.message}`));
      failedTests++;
      // Exit early if Docker is not running
      throw new Error('Docker is not running. Please start Docker and try again.');
    }
    
    // Test 2: Check if Docker Compose is installed
    console.log(INFO('\nTest 2: Checking if Docker Compose is installed...'));
    try {
      await executeCommand('docker-compose --version');
      console.log(SUCCESS('✓ Docker Compose is installed'));
      passedTests++;
    } catch (error) {
      console.log(ERROR('✗ Docker Compose is not installed'));
      console.log(ERROR(`  Error: ${error.message}`));
      failedTests++;
      // Exit early if Docker Compose is not installed
      throw new Error('Docker Compose is not installed. Please install Docker Compose and try again.');
    }
    
    // Test 3: Check if containers are running
    console.log(INFO('\nTest 3: Checking if containers are running...'));
    const containers = await executeCommand('docker-compose ps -q');
    
    if (containers) {
      console.log(SUCCESS('✓ Containers are running'));
      passedTests++;
      
      // Test 4: Check PostgreSQL container
      console.log(INFO('\nTest 4: Checking PostgreSQL container...'));
      const postgresContainer = await executeCommand('docker-compose ps | grep postgres');
      
      if (postgresContainer && postgresContainer.includes('Up')) {
        console.log(SUCCESS('✓ PostgreSQL container is running'));
        passedTests++;
        
        // Test 5: Check PostgreSQL connection
        console.log(INFO('\nTest 5: Testing PostgreSQL connection...'));
        try {
          // Execute a simple query inside the PostgreSQL container
          await executeCommand('docker-compose exec -T postgres psql -U postgres -c "SELECT 1"');
          console.log(SUCCESS('✓ Successfully connected to PostgreSQL'));
          passedTests++;
        } catch (error) {
          console.log(ERROR('✗ Failed to connect to PostgreSQL'));
          console.log(ERROR(`  Error: ${error.message}`));
          failedTests++;
        }
      } else {
        console.log(ERROR('✗ PostgreSQL container is not running'));
        failedTests++;
      }
      
      // Test 6: Check pgAdmin container (if used)
      console.log(INFO('\nTest 6: Checking pgAdmin container...'));
      const pgAdminContainer = await executeCommand('docker-compose ps | grep pgadmin');
      
      if (pgAdminContainer && pgAdminContainer.includes('Up')) {
        console.log(SUCCESS('✓ pgAdmin container is running'));
        passedTests++;
      } else {
        console.log(WARNING('! pgAdmin container is not running (optional)'));
        // Not counting as failure since pgAdmin is optional
      }
      
      // Test 7: Check network connectivity between containers
      console.log(INFO('\nTest 7: Checking network connectivity between containers...'));
      try {
        // Try to ping from PostgreSQL container to pgAdmin container (if available)
        if (pgAdminContainer && pgAdminContainer.includes('Up')) {
          await executeCommand('docker-compose exec -T postgres ping -c 1 pgadmin');
          console.log(SUCCESS('✓ Network connectivity between containers is working'));
          passedTests++;
        } else {
          // If pgAdmin is not available, just check if the network exists
          const networks = await executeCommand('docker network ls | grep tonasket');
          if (networks) {
            console.log(SUCCESS('✓ Docker network exists'));
            passedTests++;
          } else {
            console.log(ERROR('✗ Docker network does not exist'));
            failedTests++;
          }
        }
      } catch (error) {
        console.log(ERROR('✗ Network connectivity test failed'));
        console.log(ERROR(`  Error: ${error.message}`));
        failedTests++;
      }
    } else {
      console.log(ERROR('✗ No containers are running'));
      console.log(WARNING('  Try running: docker-compose up -d'));
      failedTests++;
    }
    
  } catch (error) {
    if (!error.message.includes('Docker is not running') && 
        !error.message.includes('Docker Compose is not installed')) {
      console.log(ERROR(`✗ Test error: ${error.message}`));
      failedTests++;
    }
  }
  
  // Summary
  console.log(INFO('\nTest Summary:'));
  console.log(SUCCESS(`Passed: ${passedTests} tests`));
  
  if (failedTests > 0) {
    console.log(ERROR(`Failed: ${failedTests} tests`));
    console.log(WARNING('\nAction required: Fix the Docker container issues before proceeding to the next step.'));
    process.exit(1);
  } else {
    console.log(SUCCESS('\nAll tests passed! Docker containers are running and communicating properly.'));
    process.exit(0);
  }
}

// Run tests
testDockerContainers().catch(error => {
  console.error(ERROR(`Test execution error: ${error.message}`));
  process.exit(1);
});
