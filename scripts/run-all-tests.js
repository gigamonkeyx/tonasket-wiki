/**
 * Master test script that runs all individual tests in sequence
 * This script ensures that all components work together properly
 */

const { spawn } = require('child_process');
const chalk = require('chalk'); // You may need to install this: npm install chalk

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;
const HEADER = chalk.bold.cyan;

console.log(HEADER('Tonasket Resource Wiki - Comprehensive Test Suite'));
console.log(HEADER('=============================================='));
console.log(INFO('Running all tests in sequence to verify system integrity'));

// List of test scripts to run in order
const testScripts = [
  // Step 1: Environment Tests
  { name: 'Next.js Project Structure', script: 'test-nextjs-structure.js' },
  { name: 'Development Scripts', script: 'test-development-scripts.js' },

  // Step 2: Application Tests
  { name: 'API Endpoints', script: 'test-api-endpoints.js' },
  { name: 'Frontend Components', script: 'test-frontend-components.js' },

  // Tests that require Docker (commented out until Docker is installed)
  // { name: 'Database Connection', script: 'test-database-connection.js' },
  // { name: 'Docker Containers', script: 'test-docker-containers.js' }
];

// Helper function to run a script and return a promise
function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const process = spawn('node', [scriptPath], { stdio: 'inherit' });

    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script exited with code ${code}`));
      }
    });

    process.on('error', (err) => {
      reject(err);
    });
  });
}

// Run all tests in sequence
async function runAllTests() {
  console.log(INFO('\nStarting test sequence...'));

  let passedTests = 0;
  let failedTests = 0;
  const failedScripts = [];

  for (let i = 0; i < testScripts.length; i++) {
    const test = testScripts[i];
    console.log(HEADER(`\n[${i + 1}/${testScripts.length}] Running Test: ${test.name}`));
    console.log(HEADER('------------------------------------------------'));

    try {
      await runScript(`${__dirname}/${test.script}`);
      console.log(SUCCESS(`\n✓ Test passed: ${test.name}`));
      passedTests++;
    } catch (error) {
      console.log(ERROR(`\n✗ Test failed: ${test.name}`));
      console.log(ERROR(`  Error: ${error.message}`));
      failedTests++;
      failedScripts.push(test.name);

      // Ask if we should continue despite the failure
      if (i < testScripts.length - 1) {
        console.log(WARNING('\nA test has failed. Subsequent tests may also fail.'));
        console.log(INFO('Continuing with the next test...'));
      }
    }
  }

  // Final summary
  console.log(HEADER('\n=============================================='));
  console.log(HEADER('Test Suite Summary'));
  console.log(HEADER('=============================================='));
  console.log(INFO(`Total tests: ${testScripts.length}`));
  console.log(SUCCESS(`Passed: ${passedTests} tests`));

  if (failedTests > 0) {
    console.log(ERROR(`Failed: ${failedTests} tests`));
    console.log(ERROR(`Failed tests: ${failedScripts.join(', ')}`));
    console.log(WARNING('\nAction required: Fix the failed tests before proceeding with development.'));
    process.exit(1);
  } else {
    console.log(SUCCESS('\nAll tests passed! The system is working correctly.'));
    console.log(SUCCESS('You can proceed with development.'));
    process.exit(0);
  }
}

// Run all tests
runAllTests().catch(error => {
  console.error(ERROR(`Test execution error: ${error.message}`));
  process.exit(1);
});
