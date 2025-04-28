/**
 * Enriched Business Service
 * 
 * This service provides functions to fetch enriched business data from the API.
 */

import { Business } from '@/data/businesses';

interface EnrichedBusinessResponse {
  businesses: Business[];
  source: 'external_apis' | 'database' | 'cached_file' | 'static_data';
  timestamp: string;
}

/**
 * Fetch enriched businesses from the API
 * @param zipCode - ZIP code to filter businesses (default: 98855)
 * @param limit - Maximum number of businesses to return (default: 50)
 * @param refresh - Whether to refresh the data from external sources (default: false)
 * @returns Promise resolving to enriched businesses
 */
export async function fetchEnrichedBusinesses(
  zipCode: string = '98855',
  limit: number = 50,
  refresh: boolean = false
): Promise<EnrichedBusinessResponse> {
  try {
    const params = new URLSearchParams({
      zipCode,
      limit: limit.toString(),
      refresh: refresh.toString()
    });
    
    const response = await fetch(`/api/businesses/enriched?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: refresh ? 'no-store' : 'default'
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data: EnrichedBusinessResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching enriched businesses:', error);
    // Return empty array with error information
    return {
      businesses: [],
      source: 'static_data',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Fetch a single enriched business by ID
 * @param id - Business ID
 * @returns Promise resolving to the business or null if not found
 */
export async function fetchEnrichedBusinessById(id: string): Promise<Business | null> {
  try {
    // Fetch all businesses (could be optimized with a dedicated API endpoint)
    const { businesses } = await fetchEnrichedBusinesses('98855', 100);
    
    // Find the business with the matching ID
    const business = businesses.find(b => b.id === id);
    
    return business || null;
  } catch (error) {
    console.error(`Error fetching enriched business with ID ${id}:`, error);
    return null;
  }
}

/**
 * Refresh the enriched business data from external sources
 * @param zipCode - ZIP code to filter businesses (default: 98855)
 * @param limit - Maximum number of businesses to return (default: 50)
 * @returns Promise resolving to refreshed businesses
 */
export async function refreshEnrichedBusinesses(
  zipCode: string = '98855',
  limit: number = 50
): Promise<EnrichedBusinessResponse> {
  return fetchEnrichedBusinesses(zipCode, limit, true);
}
