/**
 * Test script to verify the API endpoints
 * This script tests the API endpoints without requiring a database connection
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;

console.log(INFO('Testing API Endpoints'));
console.log(INFO('===================='));

// Test function
async function testApiEndpoints() {
  const apiDir = path.resolve(__dirname, '../src/app/api');
  let passedTests = 0;
  let failedTests = 0;
  
  try {
    // Test 1: Check if API directory exists
    console.log(INFO('\nTest 1: Checking API directory...'));
    
    if (fs.existsSync(apiDir) && fs.statSync(apiDir).isDirectory()) {
      console.log(SUCCESS('✓ API directory exists'));
      passedTests++;
      
      // Test 2: Check for root API route
      console.log(INFO('\nTest 2: Checking root API route...'));
      
      const rootApiRoute = path.join(apiDir, 'route.ts');
      if (fs.existsSync(rootApiRoute) && fs.statSync(rootApiRoute).isFile()) {
        console.log(SUCCESS('✓ Root API route exists'));
        passedTests++;
        
        // Check if the root API route has a GET handler
        const rootApiContent = fs.readFileSync(rootApiRoute, 'utf8');
        if (rootApiContent.includes('export async function GET(')) {
          console.log(SUCCESS('✓ Root API route has GET handler'));
          passedTests++;
        } else {
          console.log(ERROR('✗ Root API route is missing GET handler'));
          failedTests++;
        }
      } else {
        console.log(ERROR('✗ Root API route is missing'));
        failedTests++;
      }
      
      // Test 3: Check for required API endpoints
      console.log(INFO('\nTest 3: Checking required API endpoints...'));
      
      const requiredEndpoints = [
        'economic-data',
        'businesses',
        'news',
        'weather',
        'trade-impact'
      ];
      
      for (const endpoint of requiredEndpoints) {
        const endpointDir = path.join(apiDir, endpoint);
        const endpointRoute = path.join(endpointDir, 'route.ts');
        
        if (fs.existsSync(endpointDir) && fs.statSync(endpointDir).isDirectory()) {
          console.log(SUCCESS(`✓ API endpoint directory exists: ${endpoint}`));
          passedTests++;
          
          if (fs.existsSync(endpointRoute) && fs.statSync(endpointRoute).isFile()) {
            console.log(SUCCESS(`✓ API endpoint route exists: ${endpoint}`));
            passedTests++;
            
            // Check if the endpoint has a GET handler
            const endpointContent = fs.readFileSync(endpointRoute, 'utf8');
            if (endpointContent.includes('export async function GET(')) {
              console.log(SUCCESS(`✓ API endpoint has GET handler: ${endpoint}`));
              passedTests++;
            } else {
              console.log(ERROR(`✗ API endpoint is missing GET handler: ${endpoint}`));
              failedTests++;
            }
            
            // Check if the endpoint uses Prisma
            if (endpointContent.includes('PrismaClient')) {
              console.log(SUCCESS(`✓ API endpoint uses Prisma: ${endpoint}`));
              passedTests++;
            } else {
              console.log(ERROR(`✗ API endpoint is not using Prisma: ${endpoint}`));
              failedTests++;
            }
          } else {
            console.log(ERROR(`✗ API endpoint route is missing: ${endpoint}`));
            failedTests++;
          }
        } else {
          console.log(ERROR(`✗ API endpoint directory is missing: ${endpoint}`));
          failedTests++;
        }
      }
      
      // Test 4: Check for API tests
      console.log(INFO('\nTest 4: Checking API tests...'));
      
      const apiTestsDir = path.join(apiDir, '__tests__');
      if (fs.existsSync(apiTestsDir) && fs.statSync(apiTestsDir).isDirectory()) {
        console.log(SUCCESS('✓ API tests directory exists'));
        passedTests++;
        
        const apiTestFile = path.join(apiTestsDir, 'api.test.ts');
        if (fs.existsSync(apiTestFile) && fs.statSync(apiTestFile).isFile()) {
          console.log(SUCCESS('✓ API test file exists'));
          passedTests++;
        } else {
          console.log(ERROR('✗ API test file is missing'));
          failedTests++;
        }
      } else {
        console.log(ERROR('✗ API tests directory is missing'));
        failedTests++;
      }
      
    } else {
      console.log(ERROR('✗ API directory is missing'));
      failedTests++;
    }
    
  } catch (error) {
    console.log(ERROR(`✗ Test error: ${error.message}`));
    failedTests++;
  }
  
  // Summary
  console.log(INFO('\nTest Summary:'));
  console.log(SUCCESS(`Passed: ${passedTests} tests`));
  
  if (failedTests > 0) {
    console.log(ERROR(`Failed: ${failedTests} tests`));
    console.log(WARNING('\nAction required: Fix the API endpoint issues before proceeding to the next step.'));
    process.exit(1);
  } else {
    console.log(SUCCESS('\nAll tests passed! API endpoints are configured correctly.'));
    process.exit(0);
  }
}

// Run tests
testApiEndpoints().catch(error => {
  console.error(ERROR(`Test execution error: ${error.message}`));
  process.exit(1);
});
