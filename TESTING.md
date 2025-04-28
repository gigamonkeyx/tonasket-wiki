# Tonasket Resource Wiki - Testing Framework

This document describes the testing framework and methodology used in the Tonasket Resource Wiki project.

## Testing Philosophy

Our testing approach follows these key principles:

1. **Test Early, Test Often**: Each feature is tested immediately after implementation.
2. **Iterative Testing**: Issues are fixed before moving to the next step.
3. **Regression Testing**: New features are verified not to break existing functionality.
4. **Integration Testing**: Components are tested together to ensure they work as a system.

## Testing Framework Structure

The testing framework consists of several layers:

### 1. Component Tests

Individual tests for specific components:

- `npm run test:structure` - Tests the Next.js project structure
- `npm run test:database` - Tests the database connection and CRUD operations
- `npm run test:docker` - Tests Docker container communication
- `npm run test:scripts` - Tests development scripts functionality

### 2. Integration Tests

Tests that verify multiple components work together:

- `npm run test:all` - Runs all component tests in sequence to verify system integrity

### 3. Unit Tests

Tests for individual functions and components:

- `npm run test` - Runs Jest tests for React components and API endpoints
- `npm run test:watch` - Runs Jest tests in watch mode for development

## How to Use the Testing Framework

### Running Individual Component Tests

To test a specific component:

```bash
# Test Next.js project structure
npm run test:structure

# Test database connection
npm run test:database

# Test Docker containers
npm run test:docker

# Test development scripts
npm run test:scripts
```

### Running All Tests

To run all tests in sequence:

```bash
npm run test:all
```

### Interpreting Test Results

Each test provides detailed output:

- ✓ Green checkmarks indicate passing tests
- ✗ Red X marks indicate failing tests
- Detailed error messages help identify issues
- Summary at the end shows overall pass/fail status

### Fixing Issues

When tests fail:

1. Read the error message to understand the issue
2. Make the necessary changes to fix the problem
3. Run the test again to verify the fix
4. Run regression tests to ensure other components still work

## Adding New Tests

To add a new test:

1. Create a new test script in the `scripts` directory
2. Follow the pattern of existing test scripts
3. Add the test to the `package.json` scripts section
4. Add the test to the `run-all-tests.js` script if it should be part of the integration tests

## Testing Best Practices

1. **Isolation**: Tests should be independent of each other
2. **Determinism**: Tests should produce the same results each time they run
3. **Readability**: Test code should be clear and well-documented
4. **Coverage**: Tests should cover both normal and edge cases
5. **Speed**: Tests should run quickly to encourage frequent testing

## Continuous Integration

In the future, these tests will be integrated into a CI/CD pipeline to:

1. Run tests automatically on each commit
2. Prevent merging code that fails tests
3. Generate test reports for review
4. Deploy only when all tests pass

## Troubleshooting Common Test Issues

### Database Connection Issues

- Ensure Docker is running
- Check database credentials in `.env` file
- Verify PostgreSQL container is running

### Docker Container Issues

- Restart Docker if containers aren't responding
- Check Docker Compose configuration
- Ensure ports are not in use by other applications

### Next.js Structure Issues

- Verify all required files exist
- Check for proper imports and exports
- Ensure dependencies are installed

### Development Script Issues

- Check script permissions
- Verify script paths
- Ensure dependencies are installed
