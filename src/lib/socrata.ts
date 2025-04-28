/**
 * Socrata API Client
 * 
 * This module provides a client for interacting with Socrata Open Data APIs.
 * Socrata is used by many government agencies to publish open data.
 */

import axios from 'axios';

// Get the Socrata API token from environment variables
const SOCRATA_APP_TOKEN = process.env.SOCRATA_APP_TOKEN || '';

/**
 * Create and return an axios instance configured for Socrata API requests
 * @returns Axios instance configured for Socrata API
 */
export function getSocrataClient() {
  const headers: Record<string, string> = {};
  
  // Add the app token to the headers if available
  if (SOCRATA_APP_TOKEN) {
    console.log('[SOCRATA] Using app token: Yes (token available)');
    headers['X-App-Token'] = SOCRATA_APP_TOKEN;
  } else {
    console.log('[SOCRATA] Using app token: No (token not available)');
  }
  
  // Create and return the axios instance
  return axios.create({
    headers,
    timeout: 10000 // 10 seconds timeout
  });
}

/**
 * Make a request to a Socrata API endpoint
 * @param url The Socrata API endpoint URL
 * @param params Optional query parameters
 * @returns The response data
 */
export async function fetchSocrataData(url: string, params: Record<string, string> = {}) {
  try {
    const client = getSocrataClient();
    console.log(`[SOCRATA] Making request to: ${url}`);
    
    // Add the app token as a query parameter if available
    if (SOCRATA_APP_TOKEN) {
      console.log(`[SOCRATA] Using app token: ${SOCRATA_APP_TOKEN}`);
      params.$$app_token = SOCRATA_APP_TOKEN;
    }
    
    // Construct the query string
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    // Make the request
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await client.get(fullUrl);
    
    // Log the number of records found
    if (Array.isArray(response.data)) {
      console.log(`[SOCRATA] Found ${response.data.length} records out of ${response.headers['x-total-count'] || 'unknown'} total records`);
      
      // Log a sample of the data for debugging
      if (response.data.length > 0) {
        console.log('[SOCRATA] Sample data:', response.data[0]);
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('[SOCRATA] Error fetching data:', error);
    throw error;
  }
}
