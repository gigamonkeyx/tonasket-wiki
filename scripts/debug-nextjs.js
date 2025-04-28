/**
 * Script to debug Next.js configuration and environment
 */

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;
const DEBUG = chalk.cyan;

console.log(INFO('Next.js Debug Script'));
console.log(INFO('==================='));

// Get the project root directory
const projectRoot = path.resolve(__dirname, '..');
console.log(INFO(`Project root: ${projectRoot}`));

// Check Node.js version
console.log(INFO(`Node.js version: ${process.version}`));
console.log(INFO(`Platform: ${process.platform}`));
console.log(INFO(`Architecture: ${process.arch}`));

// Check if package.json exists and read dependencies
const packageJsonPath = path.join(projectRoot, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.log(ERROR(`Error: package.json not found at ${packageJsonPath}`));
} else {
  console.log(SUCCESS(`Found package.json at ${packageJsonPath}`));
  try {
    const packageJson = require(packageJsonPath);
    console.log(DEBUG(`Project name: ${packageJson.name}`));
    console.log(DEBUG(`Project version: ${packageJson.version}`));
    
    // Check Next.js version
    const nextVersion = packageJson.dependencies.next;
    console.log(INFO(`Next.js version: ${nextVersion}`));
    
    // Check React version
    const reactVersion = packageJson.dependencies.react;
    console.log(INFO(`React version: ${reactVersion}`));
    
    // Check other important dependencies
    console.log(INFO('Important dependencies:'));
    const importantDeps = ['react-dom', 'dotenv', 'axios', 'prisma'];
    importantDeps.forEach(dep => {
      if (packageJson.dependencies[dep]) {
        console.log(SUCCESS(`  - ${dep}: ${packageJson.dependencies[dep]}`));
      } else {
        console.log(WARNING(`  - ${dep}: Not found`));
      }
    });
  } catch (err) {
    console.log(ERROR(`Error reading package.json: ${err.message}`));
  }
}

// Check if next.config.js exists and validate it
const nextConfigPath = path.join(projectRoot, 'next.config.js');
if (!fs.existsSync(nextConfigPath)) {
  console.log(ERROR(`Error: next.config.js not found at ${nextConfigPath}`));
} else {
  console.log(SUCCESS(`Found next.config.js at ${nextConfigPath}`));
  try {
    // Read the file content
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
    console.log(DEBUG(`next.config.js size: ${nextConfigContent.length} bytes`));
    
    // Check for common issues in the config
    if (nextConfigContent.includes('webpack')) {
      console.log(INFO('next.config.js contains webpack configuration'));
    }
    if (nextConfigContent.includes('experimental')) {
      console.log(INFO('next.config.js contains experimental features'));
    }
    
    // Try to require the config
    try {
      const nextConfig = require(nextConfigPath);
      console.log(SUCCESS('Successfully loaded next.config.js'));
      console.log(DEBUG('Config keys: ' + Object.keys(nextConfig).join(', ')));
    } catch (err) {
      console.log(ERROR(`Error loading next.config.js: ${err.message}`));
    }
  } catch (err) {
    console.log(ERROR(`Error reading next.config.js: ${err.message}`));
  }
}

// Check if .env file exists and validate it
const envPath = path.join(projectRoot, '.env');
if (!fs.existsSync(envPath)) {
  console.log(WARNING(`Warning: .env file not found at ${envPath}`));
} else {
  console.log(SUCCESS(`Found .env file at ${envPath}`));
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));
    console.log(DEBUG(`Found ${envLines.length} environment variables`));
    
    // Check for important environment variables
    const importantEnvVars = ['NEXT_PUBLIC_API_URL', 'DATABASE_URL'];
    importantEnvVars.forEach(envVar => {
      if (envContent.includes(envVar + '=')) {
        console.log(SUCCESS(`  - ${envVar}: Found`));
      } else {
        console.log(WARNING(`  - ${envVar}: Not found`));
      }
    });
  } catch (err) {
    console.log(ERROR(`Error reading .env file: ${err.message}`));
  }
}

// Check if src/app directory exists and validate its structure
const appDir = path.join(projectRoot, 'src', 'app');
if (!fs.existsSync(appDir)) {
  console.log(ERROR(`Error: src/app directory not found at ${appDir}`));
} else {
  console.log(SUCCESS(`Found src/app directory at ${appDir}`));
  
  // Check for important files in the app directory
  const importantFiles = ['layout.tsx', 'page.tsx'];
  importantFiles.forEach(file => {
    const filePath = path.join(appDir, file);
    if (fs.existsSync(filePath)) {
      console.log(SUCCESS(`  - ${file}: Found`));
    } else {
      console.log(WARNING(`  - ${file}: Not found`));
    }
  });
  
  // Check for admin directory
  const adminDir = path.join(appDir, 'admin');
  if (fs.existsSync(adminDir)) {
    console.log(SUCCESS(`Found admin directory at ${adminDir}`));
    
    // Check for important files in the admin directory
    const adminFiles = ['page.tsx', 'layout.tsx'];
    adminFiles.forEach(file => {
      const filePath = path.join(adminDir, file);
      if (fs.existsSync(filePath)) {
        console.log(SUCCESS(`  - admin/${file}: Found`));
      } else {
        console.log(WARNING(`  - admin/${file}: Not found`));
      }
    });
  } else {
    console.log(WARNING(`Warning: admin directory not found at ${adminDir}`));
  }
}

// Check if node_modules/.next directory exists (previous build)
const dotNextDir = path.join(projectRoot, '.next');
if (fs.existsSync(dotNextDir)) {
  console.log(INFO(`Found .next directory at ${dotNextDir}`));
  console.log(INFO('You might want to delete this directory if you are having issues'));
}

// Check for port conflicts
try {
  const { execSync } = require('child_process');
  const result = execSync('netstat -ano | findstr :3000').toString();
  if (result.includes('LISTENING')) {
    console.log(WARNING('Port 3000 is already in use. This might cause issues.'));
    console.log(WARNING('You might want to kill the process using this port.'));
  }
} catch (err) {
  console.log(SUCCESS('Port 3000 is available.'));
}

console.log(INFO('\nDebug completed. Check the output above for any issues.'));
