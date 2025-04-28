/**
 * Test script to verify the PostgreSQL database connection
 * This script tests the connection to the database and basic CRUD operations
 */

const { PrismaClient } = require('@prisma/client');
const chalk = require('chalk'); // You may need to install this: npm install chalk

// Colors for output
const SUCCESS = chalk.green;
const ERROR = chalk.red;
const INFO = chalk.blue;
const WARNING = chalk.yellow;

console.log(INFO('Testing Database Connection'));
console.log(INFO('=========================='));

// Test function
async function testDatabaseConnection() {
  const prisma = new PrismaClient();
  let passedTests = 0;
  let failedTests = 0;
  
  try {
    // Test 1: Connect to the database
    console.log(INFO('\nTest 1: Connecting to the database...'));
    await prisma.$connect();
    console.log(SUCCESS('✓ Successfully connected to the database'));
    passedTests++;
    
    // Test 2: Create a test record
    console.log(INFO('\nTest 2: Creating a test record...'));
    const testUser = {
      email: `test-${Date.now()}@example.com`,
      name: 'Test User'
    };
    
    const createdUser = await prisma.user.create({
      data: testUser
    });
    
    if (createdUser && createdUser.id) {
      console.log(SUCCESS(`✓ Successfully created a test user with ID: ${createdUser.id}`));
      passedTests++;
      
      // Test 3: Read the test record
      console.log(INFO('\nTest 3: Reading the test record...'));
      const foundUser = await prisma.user.findUnique({
        where: { id: createdUser.id }
      });
      
      if (foundUser && foundUser.email === testUser.email) {
        console.log(SUCCESS('✓ Successfully read the test user'));
        passedTests++;
      } else {
        console.log(ERROR('✗ Failed to read the test user'));
        failedTests++;
      }
      
      // Test 4: Update the test record
      console.log(INFO('\nTest 4: Updating the test record...'));
      const updatedName = 'Updated Test User';
      const updatedUser = await prisma.user.update({
        where: { id: createdUser.id },
        data: { name: updatedName }
      });
      
      if (updatedUser && updatedUser.name === updatedName) {
        console.log(SUCCESS('✓ Successfully updated the test user'));
        passedTests++;
      } else {
        console.log(ERROR('✗ Failed to update the test user'));
        failedTests++;
      }
      
      // Test 5: Delete the test record
      console.log(INFO('\nTest 5: Deleting the test record...'));
      await prisma.user.delete({
        where: { id: createdUser.id }
      });
      
      const deletedUser = await prisma.user.findUnique({
        where: { id: createdUser.id }
      });
      
      if (!deletedUser) {
        console.log(SUCCESS('✓ Successfully deleted the test user'));
        passedTests++;
      } else {
        console.log(ERROR('✗ Failed to delete the test user'));
        failedTests++;
      }
    } else {
      console.log(ERROR('✗ Failed to create a test user'));
      failedTests++;
    }
    
  } catch (error) {
    console.log(ERROR(`✗ Database test error: ${error.message}`));
    failedTests++;
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
  
  // Summary
  console.log(INFO('\nTest Summary:'));
  console.log(SUCCESS(`Passed: ${passedTests} tests`));
  
  if (failedTests > 0) {
    console.log(ERROR(`Failed: ${failedTests} tests`));
    console.log(WARNING('\nAction required: Fix the database connection issues before proceeding to the next step.'));
    process.exit(1);
  } else {
    console.log(SUCCESS('\nAll tests passed! The database connection is working correctly.'));
    process.exit(0);
  }
}

// Run tests
testDatabaseConnection().catch(error => {
  console.error(ERROR(`Test execution error: ${error.message}`));
  process.exit(1);
});
