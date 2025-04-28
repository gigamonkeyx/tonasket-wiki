/**
 * Scheduled License Data Refresh Script
 * 
 * This script is designed to be run as a scheduled job (e.g., via cron or Windows Task Scheduler)
 * to automatically refresh the license data cache.
 * 
 * Usage:
 *   node scripts/scheduled-license-refresh.js
 * 
 * Environment variables:
 *   ADMIN_API_KEY - Required for authentication
 *   ZIP_CODE - ZIP code to filter businesses (default: 98855)
 *   LIMIT - Maximum number of businesses to process (default: 100)
 *   BASE_URL - Base URL of the application (default: http://localhost:3000)
 */

// Load environment variables from .env file
require('dotenv').config();

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Configuration
const adminApiKey = process.env.ADMIN_API_KEY;
const zipCode = process.env.ZIP_CODE || '98855';
const limit = process.env.LIMIT || '100';
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

// Validate configuration
if (!adminApiKey) {
  console.error('Error: ADMIN_API_KEY environment variable is required');
  process.exit(1);
}

// Log file setup
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, `license-refresh-${new Date().toISOString().split('T')[0]}.log`);
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Helper function to log messages to both console and log file
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  logStream.write(logMessage + '\n');
}

// Main function
async function refreshLicenseData() {
  log('Starting scheduled license data refresh');
  
  try {
    // Build the API URL
    const params = new URLSearchParams({
      apiKey: adminApiKey,
      zipCode,
      limit
    });
    
    const apiUrl = `${baseUrl}/api/license-data/refresh?${params.toString()}`;
    
    log(`Calling API: ${baseUrl}/api/license-data/refresh (with API key)`);
    
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Parse the response
    const data = await response.json();
    
    if (response.ok) {
      log(`Success: ${data.message}`);
      
      if (data.stats) {
        log(`Processed ${data.stats.total} businesses (Success: ${data.stats.success}, Errors: ${data.stats.error})`);
      }
    } else {
      log(`Error: ${data.error || data.message || 'Unknown error'}`);
    }
  } catch (error) {
    log(`Error: ${error.message}`);
  }
  
  log('Scheduled license data refresh completed');
  logStream.end();
}

// Run the refresh
refreshLicenseData();
