/**
 * Script to start the development server from the correct directory
 * This ensures that path resolution works correctly
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;
const DEBUG = chalk.cyan;

// Get the project root directory
const projectRoot = path.resolve(__dirname, '..');

console.log(INFO('Starting Tonasket Resource Wiki Development Server'));
console.log(INFO('=============================================='));

// Verify we're in the correct directory
console.log(INFO(`Current directory: ${process.cwd()}`));
console.log(INFO(`Project root: ${projectRoot}`));

// Check if we need to change directory
if (process.cwd() !== projectRoot) {
  console.log(WARNING(`Changing directory to project root: ${projectRoot}`));
  process.chdir(projectRoot);
  console.log(SUCCESS(`Current directory is now: ${process.cwd()}`));
}

// Check if the src/app directory exists
const appDir = path.join(projectRoot, 'src', 'app');
if (!fs.existsSync(appDir)) {
  console.log(ERROR(`Error: src/app directory not found at ${appDir}`));
  console.log(ERROR('Make sure you are in the correct project directory'));
  process.exit(1);
}

// Check if package.json exists
const packageJsonPath = path.join(projectRoot, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.log(ERROR(`Error: package.json not found at ${packageJsonPath}`));
  process.exit(1);
} else {
  console.log(SUCCESS(`Found package.json at ${packageJsonPath}`));
  try {
    const packageJson = require(packageJsonPath);
    console.log(DEBUG(`Project name: ${packageJson.name}`));
    console.log(DEBUG(`Next.js version: ${packageJson.dependencies.next}`));
    console.log(DEBUG(`React version: ${packageJson.dependencies.react}`));
  } catch (err) {
    console.log(ERROR(`Error reading package.json: ${err.message}`));
  }
}

// Check if .env file exists
const envPath = path.join(projectRoot, '.env');
if (!fs.existsSync(envPath)) {
  console.log(WARNING(`Warning: .env file not found at ${envPath}`));
} else {
  console.log(SUCCESS(`Found .env file at ${envPath}`));
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n').filter(line => line.trim() !== '');
    console.log(DEBUG(`Found ${envLines.length} environment variables`));
  } catch (err) {
    console.log(ERROR(`Error reading .env file: ${err.message}`));
  }
}

// Check if node_modules directory exists
const nodeModulesPath = path.join(projectRoot, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log(ERROR(`Error: node_modules directory not found at ${nodeModulesPath}`));
  console.log(ERROR('Run npm install to install dependencies'));
  process.exit(1);
} else {
  console.log(SUCCESS(`Found node_modules directory at ${nodeModulesPath}`));
}

// Check if next.config.js exists
const nextConfigPath = path.join(projectRoot, 'next.config.js');
if (!fs.existsSync(nextConfigPath)) {
  console.log(WARNING(`Warning: next.config.js not found at ${nextConfigPath}`));
} else {
  console.log(SUCCESS(`Found next.config.js at ${nextConfigPath}`));
}

// Generate Prisma client
console.log(INFO('\nGenerating Prisma client...'));
try {
  const prismaGenerate = spawn('npx', ['prisma', 'generate'], {
    stdio: 'inherit',
    shell: true
  });

  prismaGenerate.on('close', (code) => {
    if (code !== 0) {
      console.log(WARNING(`Prisma client generation exited with code ${code}`));
      console.log(WARNING('Continuing despite Prisma generation error...'));
    } else {
      console.log(SUCCESS('Prisma client generated successfully'));
    }

    // Start the development server
    console.log(INFO('\nStarting Next.js development server...'));
    console.log(INFO('Press Ctrl+C to stop the server\n'));

    // Use a more verbose command to start the server
    console.log(DEBUG('Running command: npx --no-install next dev'));

    startNextServer();
  });
} catch (err) {
  console.log(ERROR(`Error generating Prisma client: ${err.message}`));
  console.log(WARNING('Continuing despite Prisma generation error...'));

  // Start the development server anyway
  console.log(INFO('\nStarting Next.js development server...'));
  console.log(INFO('Press Ctrl+C to stop the server\n'));

  // Use a more verbose command to start the server
  console.log(DEBUG('Running command: npx --no-install next dev'));

  startNextServer();
}

// Function to start the Next.js server
function startNextServer() {
  const nextDev = spawn('npx', ['--no-install', 'next', 'dev'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_OPTIONS: '--trace-warnings' }
  });

  nextDev.on('error', (err) => {
    console.error(ERROR(`Failed to start development server: ${err.message}`));
    process.exit(1);
  });

  nextDev.on('close', (code) => {
    if (code !== 0) {
      console.log(ERROR(`Development server exited with code ${code}`));
      process.exit(code);
    }
  });
}
