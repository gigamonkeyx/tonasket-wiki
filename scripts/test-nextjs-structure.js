/**
 * Test script to verify the Next.js project structure
 * This script checks for the existence of essential files and directories
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // You may need to install this: npm install chalk

// Define the expected structure
const expectedStructure = {
  directories: [
    'src',
    'src/app',
    'src/components',
    'src/utils',
    'public',
    'prisma',
    'scripts'
  ],
  files: [
    'package.json',
    'tsconfig.json',
    'next.config.js',
    'docker-compose.yml',
    '.env',
    'prisma/schema.prisma',
    'src/app/page.tsx',
    'src/app/layout.tsx'
  ]
};

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;

// Root directory
const rootDir = path.resolve(__dirname, '..');

console.log(INFO('Testing Next.js Project Structure'));
console.log(INFO('=============================='));

// Test function
async function testProjectStructure() {
  let passedTests = 0;
  let failedTests = 0;
  
  // Check directories
  console.log(INFO('\nChecking directories:'));
  for (const dir of expectedStructure.directories) {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      console.log(SUCCESS(`✓ Directory exists: ${dir}`));
      passedTests++;
    } else {
      console.log(ERROR(`✗ Directory missing: ${dir}`));
      failedTests++;
    }
  }
  
  // Check files
  console.log(INFO('\nChecking files:'));
  for (const file of expectedStructure.files) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      console.log(SUCCESS(`✓ File exists: ${file}`));
      passedTests++;
    } else {
      console.log(ERROR(`✗ File missing: ${file}`));
      failedTests++;
    }
  }
  
  // Check package.json content
  console.log(INFO('\nChecking package.json content:'));
  try {
    const packageJson = require(path.join(rootDir, 'package.json'));
    
    // Check dependencies
    const requiredDependencies = [
      'next', 'react', 'react-dom', '@prisma/client', 
      'express', 'axios', 'chart.js'
    ];
    
    for (const dep of requiredDependencies) {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        console.log(SUCCESS(`✓ Dependency exists: ${dep}`));
        passedTests++;
      } else {
        console.log(ERROR(`✗ Dependency missing: ${dep}`));
        failedTests++;
      }
    }
    
    // Check scripts
    const requiredScripts = ['dev', 'build', 'start'];
    
    for (const script of requiredScripts) {
      if (packageJson.scripts && packageJson.scripts[script]) {
        console.log(SUCCESS(`✓ Script exists: ${script}`));
        passedTests++;
      } else {
        console.log(ERROR(`✗ Script missing: ${script}`));
        failedTests++;
      }
    }
    
  } catch (error) {
    console.log(ERROR(`✗ Error reading package.json: ${error.message}`));
    failedTests++;
  }
  
  // Summary
  console.log(INFO('\nTest Summary:'));
  console.log(SUCCESS(`Passed: ${passedTests} tests`));
  
  if (failedTests > 0) {
    console.log(ERROR(`Failed: ${failedTests} tests`));
    console.log(WARNING('\nAction required: Fix the issues above before proceeding to the next step.'));
    process.exit(1);
  } else {
    console.log(SUCCESS('\nAll tests passed! The Next.js project structure is correct.'));
    process.exit(0);
  }
}

// Run tests
testProjectStructure().catch(error => {
  console.error(ERROR(`Test execution error: ${error.message}`));
  process.exit(1);
});
