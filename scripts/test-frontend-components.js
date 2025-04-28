/**
 * Test script to verify the frontend components
 * This script checks for the existence and structure of frontend components
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;

console.log(INFO('Testing Frontend Components'));
console.log(INFO('========================='));

// Test function
async function testFrontendComponents() {
  const componentsDir = path.resolve(__dirname, '../src/components');
  const pagesDir = path.resolve(__dirname, '../src/app');
  let passedTests = 0;
  let failedTests = 0;
  
  try {
    // Test 1: Check if components directory exists
    console.log(INFO('\nTest 1: Checking components directory...'));
    
    if (fs.existsSync(componentsDir) && fs.statSync(componentsDir).isDirectory()) {
      console.log(SUCCESS('✓ Components directory exists'));
      passedTests++;
      
      // Test 2: Check for essential components
      console.log(INFO('\nTest 2: Checking essential components...'));
      
      const essentialComponents = [
        'Layout.tsx'
      ];
      
      for (const component of essentialComponents) {
        const componentPath = path.join(componentsDir, component);
        
        if (fs.existsSync(componentPath) && fs.statSync(componentPath).isFile()) {
          console.log(SUCCESS(`✓ Component exists: ${component}`));
          passedTests++;
          
          // Check component content
          const componentContent = fs.readFileSync(componentPath, 'utf8');
          
          if (componentContent.includes('export default')) {
            console.log(SUCCESS(`✓ Component has default export: ${component}`));
            passedTests++;
          } else {
            console.log(ERROR(`✗ Component is missing default export: ${component}`));
            failedTests++;
          }
          
          if (componentContent.includes('React.FC') || componentContent.includes('React.FunctionComponent')) {
            console.log(SUCCESS(`✓ Component has proper type definition: ${component}`));
            passedTests++;
          } else {
            console.log(WARNING(`! Component might be missing type definition: ${component}`));
            // Not counting as failure since TypeScript might infer types
          }
        } else {
          console.log(ERROR(`✗ Component is missing: ${component}`));
          failedTests++;
        }
      }
    } else {
      console.log(ERROR('✗ Components directory is missing'));
      failedTests++;
    }
    
    // Test 3: Check if pages directory exists
    console.log(INFO('\nTest 3: Checking pages directory...'));
    
    if (fs.existsSync(pagesDir) && fs.statSync(pagesDir).isDirectory()) {
      console.log(SUCCESS('✓ Pages directory exists'));
      passedTests++;
      
      // Test 4: Check for essential pages
      console.log(INFO('\nTest 4: Checking essential pages...'));
      
      const essentialPages = [
        'page.tsx',
        'layout.tsx',
        'economic-data/page.tsx',
        'businesses/page.tsx',
        'trade-impact/page.tsx',
        'news/page.tsx',
        'weather/page.tsx',
        'about/page.tsx'
      ];
      
      for (const page of essentialPages) {
        const pagePath = path.join(pagesDir, page);
        
        if (fs.existsSync(pagePath) && fs.statSync(pagePath).isFile()) {
          console.log(SUCCESS(`✓ Page exists: ${page}`));
          passedTests++;
          
          // Check page content
          const pageContent = fs.readFileSync(pagePath, 'utf8');
          
          if (pageContent.includes('export default')) {
            console.log(SUCCESS(`✓ Page has default export: ${page}`));
            passedTests++;
          } else {
            console.log(ERROR(`✗ Page is missing default export: ${page}`));
            failedTests++;
          }
        } else {
          console.log(ERROR(`✗ Page is missing: ${page}`));
          failedTests++;
        }
      }
    } else {
      console.log(ERROR('✗ Pages directory is missing'));
      failedTests++;
    }
    
    // Test 5: Check for responsive design in components
    console.log(INFO('\nTest 5: Checking for responsive design...'));
    
    let responsiveDesignFound = false;
    
    // Check Layout component for responsive design
    const layoutPath = path.join(componentsDir, 'Layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const layoutContent = fs.readFileSync(layoutPath, 'utf8');
      
      if (layoutContent.includes('md:') || layoutContent.includes('sm:') || layoutContent.includes('lg:')) {
        console.log(SUCCESS('✓ Layout component uses responsive design classes'));
        responsiveDesignFound = true;
        passedTests++;
      }
    }
    
    // Check home page for responsive design
    const homePath = path.join(pagesDir, 'page.tsx');
    if (fs.existsSync(homePath)) {
      const homeContent = fs.readFileSync(homePath, 'utf8');
      
      if (homeContent.includes('md:') || homeContent.includes('sm:') || homeContent.includes('lg:')) {
        console.log(SUCCESS('✓ Home page uses responsive design classes'));
        responsiveDesignFound = true;
        passedTests++;
      }
    }
    
    if (!responsiveDesignFound) {
      console.log(ERROR('✗ No responsive design classes found in components'));
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
    console.log(WARNING('\nAction required: Fix the frontend component issues before proceeding to the next step.'));
    process.exit(1);
  } else {
    console.log(SUCCESS('\nAll tests passed! Frontend components are configured correctly.'));
    process.exit(0);
  }
}

// Run tests
testFrontendComponents().catch(error => {
  console.error(ERROR(`Test execution error: ${error.message}`));
  process.exit(1);
});
