/**
 * Socrata Business Lookup API Client
 *
 * This module fetches business data from the Washington State Department of Revenue
 * Business Lookup dataset via the Socrata Open Data API.
 */

import axios from 'axios';

// API configuration
// The original endpoint is no longer available, using a fallback approach
// const API_ENDPOINT = 'https://data.wa.gov/resource/7xux-kdpf.json';

// Based on the Socrata Discovery API, we're using the Department of Licensing's Business Licenses dataset
// Dataset ID: ucdg-xgbj
const API_ENDPOINT = 'https://data.wa.gov/resource/ucdg-xgbj.json'; // Business License dataset
const APP_TOKEN = process.env.SOCRATA_APP_TOKEN || '';

console.log(`[SOCRATA] Using app token: ${APP_TOKEN ? 'Yes (token available)' : 'No (token not available)'}`);

// We're using the APP_TOKEN constant directly now

/**
 * Search for businesses by ZIP code
 * @param zipCode - ZIP code to search for
 * @param limit - Maximum number of results to return
 * @returns Promise resolving to business data
 */
export async function searchBusinessesByZipCode(zipCode: string, limit: number = 100): Promise<any[]> {
  try {

    // Build the query using SoQL
    // Filter by ZIP code directly in the query
    // Use the correct column name 'business_postal_code' based on the dataset schema
    // Include the app token in the URL as per the documentation
    const query = `?$$app_token=${APP_TOKEN}&$where=business_postal_code='${zipCode}'&$limit=${limit}`;

    console.log(`[SOCRATA] Making request to: ${API_ENDPOINT}${query}`);

    // Make the request with the app token
    console.log(`[SOCRATA] Using app token: ${APP_TOKEN}`);
    const response = await axios.get(`${API_ENDPOINT}${query}`, {
      headers: {
        'X-App-Token': APP_TOKEN
      }
    });

    // Use the data directly since we're filtering in the query
    const filteredData = response.data;

    console.log(`[SOCRATA] Found ${filteredData.length} businesses in ZIP code ${zipCode} out of ${response.data.length} total records`);

    return filteredData;
  } catch (error) {
    console.error('Error searching businesses by ZIP code:', error);
    throw error;
  }
}

/**
 * Search for businesses by name
 * @param name - Business name to search for
 * @param limit - Maximum number of results to return
 * @returns Promise resolving to business data
 */
export async function searchBusinessesByName(name: string, limit: number = 100): Promise<any[]> {
  try {

    // Build the query
    // Use LIKE operator to search for businesses with similar names
    // The field name in the Business License dataset is 'business_name'
    // Also include the app token in the URL as per the documentation
    const query = `?$$app_token=${APP_TOKEN}&$where=business_name LIKE '%25${name}%25'&$limit=${limit}`;

    // Make the request with the app token
    const response = await axios.get(`${API_ENDPOINT}${query}`, {
      headers: {
        'X-App-Token': APP_TOKEN
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error searching businesses by name:', error);
    throw error;
  }
}

/**
 * Get business details by UBI (Unified Business Identifier)
 * @param ubi - UBI to search for
 * @returns Promise resolving to business data
 */
export async function getBusinessByUBI(ubi: string): Promise<any> {
  try {

    // Build the query
    // The field name in the Business License dataset is 'license_number'
    // Also include the app token in the URL as per the documentation
    const query = `?$$app_token=${APP_TOKEN}&$where=license_number='${ubi}'`;

    // Make the request with the app token
    const response = await axios.get(`${API_ENDPOINT}${query}`, {
      headers: {
        'X-App-Token': APP_TOKEN
      }
    });

    if (response.data.length === 0) {
      throw new Error(`No business found with UBI ${ubi}`);
    }

    return response.data[0];
  } catch (error) {
    console.error('Error getting business by UBI:', error);
    throw error;
  }
}

/**
 * Test the Socrata API token
 * @param token - API token to test
 * @returns Promise resolving to boolean indicating if token is valid
 */
export async function testApiToken(token: string): Promise<boolean> {
  try {
    // Make a simple request to test the token
    // Include the app token in both the URL and the header
    const response = await axios.get(`${API_ENDPOINT}?$$app_token=${token}&$limit=1`, {
      headers: {
        'X-App-Token': token
      }
    });

    return response.status === 200;
  } catch (error) {
    console.error('Error testing API token:', error);
    return false;
  }
}

/**
 * Map Socrata business data to our internal business model
 * @param socrataData - Business data from Socrata API
 * @returns Mapped business data
 */
export function mapSocrataBusinessToInternalModel(socrataData: any): any {
  // For the Business License dataset, the fields are different
  // Log the first record to see the actual field names
  console.log('[SOCRATA] Sample business data:', socrataData);

  // Extract business type from the license_type field
  const businessType = determineBusinessCategory(socrataData.license_type || 'Business');

  return {
    id: socrataData.license_number || '',
    name: socrataData.business_name || '',
    description: `${socrataData.license_type || ''} business registered in Washington State`,
    category: businessType,
    subcategory: socrataData.license_type || '',
    address: [
      socrataData.business_street || '',
      socrataData.business_city || '',
      socrataData.business_state || 'WA',
      socrataData.business_postal_code || ''
    ].filter(Boolean).join(', '),
    phone: socrataData.phone_number || '', // Now available in this dataset
    email: '', // Not available in this dataset
    website: '', // Not available in this dataset
    hours: '', // Not available in this dataset
    founded: socrataData.first_issue_date || '',
    employees: '', // Not available in this dataset
    featured: false,
    image: '', // Not available in this dataset
    services: [],
    products: [],
    tags: [businessType, socrataData.license_type || ''].filter(Boolean),
    socialMedia: {},
    coordinates: null,
    sourceData: {
      type: 'socrata',
      id: socrataData.license_number || '',
      entityType: socrataData.license_type || '',
      registrationDate: socrataData.first_issue_date || '',
      status: socrataData.license_status || ''
    }
  };
}

/**
 * Determine business category based on entity type
 * @param entityType - Entity type from Socrata API
 * @returns Business category
 */
function determineBusinessCategory(entityType: string): string {
  // Convert to uppercase for case-insensitive comparison
  const type = entityType.toUpperCase();

  // Map entity types to our business categories
  if (type.includes('CORPORATION') || type.includes('CORP')) {
    return 'Services';
  } else if (type.includes('LLC') || type.includes('LIMITED LIABILITY')) {
    return 'Services';
  } else if (type.includes('PARTNERSHIP')) {
    return 'Services';
  } else if (type.includes('SOLE PROPRIETOR')) {
    return 'Retail';
  } else if (type.includes('NONPROFIT') || type.includes('NON-PROFIT')) {
    return 'Services';
  } else if (type.includes('CHURCH') || type.includes('RELIGIOUS')) {
    return 'Services';
  } else if (type.includes('AGRICULTURE') || type.includes('FARM')) {
    return 'Agriculture';
  } else if (type.includes('RESTAURANT') || type.includes('FOOD') || type.includes('CAFE')) {
    return 'Food & Dining';
  } else if (type.includes('HEALTH') || type.includes('MEDICAL') || type.includes('CLINIC')) {
    return 'Healthcare';
  } else if (type.includes('SCHOOL') || type.includes('EDUCATION')) {
    return 'Education';
  } else if (type.includes('RETAIL') || type.includes('STORE')) {
    return 'Retail';
  } else if (type.includes('TECHNOLOGY') || type.includes('SOFTWARE')) {
    return 'Technology';
  } else if (type.includes('FINANCE') || type.includes('BANK')) {
    return 'Finance';
  } else if (type.includes('GOVERNMENT') || type.includes('MUNICIPAL')) {
    return 'Government';
  }

  // Default category
  return 'Services';
}
