/**
 * Washington State Business Lookup API Client
 *
 * This module fetches business data from the Washington Department of Revenue's
 * Business Lookup dataset via the Socrata Open Data API.
 *
 * API Endpoint: https://data.wa.gov/resource/7xux-kdpf.json
 */

import axios from 'axios';
import { Business } from '@/data/businesses';
import { generateUniqueId } from '../utils/idGenerator';
import { searchBusinessesByZipCode, mapSocrataBusinessToInternalModel } from './socrataBusinessLookup';

// API configuration
// The original endpoint is no longer available, using a fallback approach
// const API_ENDPOINT = 'https://data.wa.gov/resource/7xux-kdpf.json';
const API_ENDPOINT = 'https://data.wa.gov/resource/f6w7-q2d2.json'; // Using Corporation and Charities data as fallback
const APP_TOKEN = process.env.SOCRATA_APP_TOKEN || ''; // Optional but recommended for higher rate limits

interface WaStateBusinessRecord {
  ubi: string;
  business_name: string;
  business_type: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  naics_code?: string;
  naics_description?: string;
  open_date?: string;
  close_date?: string;
  location?: {
    latitude: string;
    longitude: string;
    human_address: string;
  };
}

/**
 * Fetch businesses from WA State Business Lookup by ZIP code
 * @param zipCode - ZIP code to filter businesses (e.g., '98855' for Tonasket)
 * @param limit - Maximum number of records to return
 * @returns Array of businesses in our application's format
 */
export async function fetchWaStateBusinesses(zipCode: string, limit: number = 100): Promise<Business[]> {
  try {
    // Make API request with timeout and retry logic
    let response;
    let retries = 0;
    const maxRetries = 3;
    let socrataData = [];

    while (retries < maxRetries) {
      try {
        // Use a mock response for development/testing
        // In production, this would be the actual API call
        if (false) { // Try using the Socrata API with the updated dataset and field names
          console.log('Using mock WA State business data in development mode');
          // Import static business data as mock
          const { businesses } = await import('@/data/businesses');

          // Transform to match WA State API format
          const mockData = businesses.filter(b => b.address.includes(zipCode)).map(b => ({
            ubi: b.id.replace('wa-', ''),
            business_name: b.name,
            business_type: b.category,
            address: b.address.split(',')[0],
            city: 'Tonasket',
            state: 'WA',
            zip_code: zipCode,
            naics_description: b.description,
            open_date: b.founded ? `${b.founded}-01-01` : undefined,
            location: b.coordinates ? {
              latitude: b.coordinates.lat.toString(),
              longitude: b.coordinates.lng.toString(),
              human_address: b.address
            } : undefined
          }));

          response = { data: mockData };
          break;
        } else {
          // Use the new Socrata service
          console.log(`[WA_STATE_API] Fetching businesses for ZIP code ${zipCode} using Socrata API`);
          socrataData = await searchBusinessesByZipCode(zipCode, limit);

          if (socrataData && Array.isArray(socrataData)) {
            console.log(`[WA_STATE_API] Successfully fetched ${socrataData.length} businesses from Socrata API`);
            break; // Success, exit the retry loop
          } else {
            throw new Error('Invalid response format from Socrata Business Lookup API');
          }
        }
      } catch (err) {
        retries++;
        console.warn(`Attempt ${retries}/${maxRetries} failed for WA State API: ${err instanceof Error ? err.message : String(err)}`);

        if (retries >= maxRetries) {
          console.error('All retry attempts failed for WA State API');
          // Instead of throwing, return an empty array with a warning
          return []; // Return empty array to prevent breaking the application
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      }
    }

    // Transform data to our Business format
    let businesses: Business[] = [];

    if (false) { // Use mock data for testing
      // Use the mock data
      businesses = response.data.map((record: WaStateBusinessRecord) => transformToBusinessFormat(record));
    } else {
      // Use the Socrata data
      businesses = socrataData.map((record: any) => mapSocrataBusinessToInternalModel(record));
    }

    // Log success information
    console.log(`[WA_STATE_API] Successfully fetched ${businesses.length} businesses for ZIP code ${zipCode}`);

    // Log category distribution
    const categoryCount: Record<string, number> = {};
    businesses.forEach(business => {
      const category = business.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    console.log('[WA_STATE_API] Business categories distribution:', categoryCount);

    return businesses;
  } catch (error) {
    console.error('[WA_STATE_API_ERROR] Error fetching WA State business data:', error);

    // Log detailed error information
    if (error instanceof Error) {
      console.error('[WA_STATE_API_ERROR] Detailed error information:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        cause: error.cause
      });

      // Log axios-specific error details if available
      if ('response' in error && error.response) {
        console.error('[WA_STATE_API_ERROR] API response details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });
      }

      if ('request' in error && error.request) {
        console.error('[WA_STATE_API_ERROR] API request details:', {
          method: error.request.method,
          path: error.request.path,
          host: error.request.host
        });
      }
    }

    // Instead of throwing, return an empty array with a warning log
    console.warn('[WA_STATE_API] Returning empty business array due to API error');
    return [];
  }
}

/**
 * Transform WA State business record to our application's Business format
 */
function transformToBusinessFormat(record: WaStateBusinessRecord): Business {
  // Determine business category based on NAICS code or description
  const category = determineCategory(record.naics_code, record.naics_description);

  // Format full address
  const fullAddress = `${record.address}, ${record.city}, ${record.state} ${record.zip_code}`;

  // Create coordinates if location data is available
  const coordinates = record.location ? {
    lat: parseFloat(record.location.latitude),
    lng: parseFloat(record.location.longitude)
  } : undefined;

  return {
    id: `wa-${record.ubi}`,
    name: record.business_name,
    description: record.naics_description || `${record.business_type} business in ${record.city}, WA`,
    category,
    subcategory: record.naics_description ? record.naics_description.split(' ')[0] : undefined,
    address: fullAddress,
    phone: '', // Not available in WA State data, will be enriched from other sources
    founded: record.open_date ? new Date(record.open_date).getFullYear().toString() : undefined,
    featured: false,
    coordinates,
    tags: record.naics_description ? record.naics_description.toLowerCase().split(' ') : [],
    // These fields will be populated by other data sources
    email: undefined,
    website: undefined,
    hours: undefined,
    employees: undefined,
    image: undefined,
    services: undefined,
    products: undefined,
    socialMedia: undefined
  };
}

/**
 * Map NAICS codes to our application's business categories
 */
function determineCategory(naicsCode?: string, naicsDescription?: string): string {
  if (!naicsCode && !naicsDescription) return 'Services';

  // Extract first two digits of NAICS code for major sector
  const sectorCode = naicsCode ? naicsCode.substring(0, 2) : '';

  // Map NAICS sectors to our categories
  switch (sectorCode) {
    case '11': // Agriculture, Forestry, Fishing and Hunting
      return 'Agriculture';
    case '44':
    case '45': // Retail Trade
      return 'Retail';
    case '62': // Health Care and Social Assistance
      return 'Healthcare';
    case '72': // Accommodation and Food Services
      return 'Food & Dining';
    default:
      // Try to determine from description if code mapping fails
      if (naicsDescription) {
        const desc = naicsDescription.toLowerCase();
        if (desc.includes('restaurant') || desc.includes('cafe') || desc.includes('food')) {
          return 'Food & Dining';
        }
        if (desc.includes('store') || desc.includes('shop') || desc.includes('retail')) {
          return 'Retail';
        }
        if (desc.includes('farm') || desc.includes('agriculture') || desc.includes('orchard')) {
          return 'Agriculture';
        }
        if (desc.includes('clinic') || desc.includes('hospital') || desc.includes('health')) {
          return 'Healthcare';
        }
      }
      return 'Services'; // Default category
  }
}
