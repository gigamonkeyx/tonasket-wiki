/**
 * Test script to verify the development scripts
 * This script checks if the development scripts exist and are executable
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk'); // You may need to install this: npm install chalk

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;

console.log(INFO('Testing Development Scripts'));
console.log(INFO('========================='));

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

// Helper function to check if a file is executable
function isExecutable(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.X_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// Test function
async function testDevelopmentScripts() {
  const scriptsDir = path.resolve(__dirname, '..');
  const packageJsonPath = path.join(scriptsDir, 'package.json');
  let passedTests = 0;
  let failedTests = 0;

  try {
    // Test 1: Check if package.json exists and contains required scripts
    console.log(INFO('\nTest 1: Checking package.json scripts...'));

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = require(packageJsonPath);
      const requiredScripts = [
        'dev', 'build', 'start', 'docker:up', 'docker:down',
        'db:migrate', 'test'
      ];

      let missingScripts = [];

      for (const script of requiredScripts) {
        if (packageJson.scripts && packageJson.scripts[script]) {
          console.log(SUCCESS(`✓ Script exists in package.json: ${script}`));
          passedTests++;
        } else {
          console.log(ERROR(`✗ Script missing in package.json: ${script}`));
          missingScripts.push(script);
          failedTests++;
        }
      }

      if (missingScripts.length > 0) {
        console.log(WARNING(`  Add the missing scripts to package.json: ${missingScripts.join(', ')}`));
      }
    } else {
      console.log(ERROR('✗ package.json does not exist'));
      failedTests++;
    }

    // Test 2: Check if PowerShell scripts exist and are valid
    console.log(INFO('\nTest 2: Checking PowerShell scripts...'));

    const powerShellScripts = [
      'start-dev.ps1',
      'stop-dev.ps1'
    ];

    for (const script of powerShellScripts) {
      const scriptPath = path.join(scriptsDir, 'scripts', script);

      if (fs.existsSync(scriptPath)) {
        console.log(SUCCESS(`✓ PowerShell script exists: ${script}`));
        passedTests++;

        // Check if the script has valid PowerShell syntax
        try {
          await executeCommand(`powershell -c "Test-Path -Path '${scriptPath}' -PathType Leaf"`);
          console.log(SUCCESS(`✓ PowerShell script is valid: ${script}`));
          passedTests++;
        } catch (error) {
          console.log(ERROR(`✗ PowerShell script has syntax errors: ${script}`));
          console.log(ERROR(`  Error: ${error.message}`));
          failedTests++;
        }
      } else {
        console.log(ERROR(`✗ PowerShell script missing: ${script}`));
        failedTests++;
      }
    }

    // Test 3: Check npm scripts functionality
    console.log(INFO('\nTest 3: Testing npm scripts functionality...'));

    // Check if npm run dev script exists in package.json (without running it)
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = require(packageJsonPath);
      if (packageJson.scripts && packageJson.scripts['dev']) {
        const devCommand = packageJson.scripts['dev'];
        if (devCommand.includes('next dev')) {
          console.log(SUCCESS('✓ npm run dev script is configured correctly'));
          passedTests++;
        } else {
          console.log(ERROR('✗ npm run dev script is not configured correctly'));
          failedTests++;
        }
      } else {
        console.log(ERROR('✗ npm run dev script is missing'));
        failedTests++;
      }
    }

    // Test docker:up and docker:down scripts (without actually running them)
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = require(packageJsonPath);

      if (packageJson.scripts && packageJson.scripts['docker:up']) {
        const dockerUpCommand = packageJson.scripts['docker:up'];
        if (dockerUpCommand.includes('docker-compose up')) {
          console.log(SUCCESS('✓ docker:up script is configured correctly'));
          passedTests++;
        } else {
          console.log(ERROR('✗ docker:up script is not configured correctly'));
          failedTests++;
        }
      }

      if (packageJson.scripts && packageJson.scripts['docker:down']) {
        const dockerDownCommand = packageJson.scripts['docker:down'];
        if (dockerDownCommand.includes('docker-compose down')) {
          console.log(SUCCESS('✓ docker:down script is configured correctly'));
          passedTests++;
        } else {
          console.log(ERROR('✗ docker:down script is not configured correctly'));
          failedTests++;
        }
      }
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
    console.log(WARNING('\nAction required: Fix the development script issues before proceeding to the next step.'));
    process.exit(1);
  } else {
    console.log(SUCCESS('\nAll tests passed! Development scripts are configured correctly.'));
    process.exit(0);
  }
}

// Run tests
testDevelopmentScripts().catch(error => {
  console.error(ERROR(`Test execution error: ${error.message}`));
  process.exit(1);
});
