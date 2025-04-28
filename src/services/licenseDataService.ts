/**
 * License Data Service
 *
 * This service provides functions to fetch and refresh license data.
 */

import { Business } from '@/data/businesses';

interface LicenseDataCacheStatus {
  exists: boolean;
  timestamp?: string;
  cacheAge?: {
    ms: number;
    hours: number;
    days: number;
  };
  businessCount?: number;
  zipCode?: string;
  limit?: number;
}

interface LicenseDataRefreshResponse {
  success: boolean;
  message: string;
  stats?: {
    total: number;
    success: number;
    error: number;
  };
  timestamp: string;
}

/**
 * Get the status of the license data cache
 * @returns Promise resolving to the cache status
 */
export async function getLicenseDataCacheStatus(): Promise<LicenseDataCacheStatus> {
  try {
    const response = await fetch('/api/license-data/refresh', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 404) {
      return { exists: false };
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: LicenseDataCacheStatus = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting license data cache status:', error);
    return { exists: false };
  }
}

/**
 * Refresh the license data for all businesses
 * @param apiKey API key for authentication
 * @param zipCode ZIP code to filter businesses (default: 98855)
 * @param limit Maximum number of businesses to process (default: 100)
 * @returns Promise resolving to the refresh response
 */
export async function refreshLicenseData(
  apiKey: string,
  zipCode: string = '98855',
  limit: number = 20,
  activeOnly: boolean = false
): Promise<LicenseDataRefreshResponse> {
  try {
    const params = new URLSearchParams({
      apiKey,
      zipCode,
      limit: limit.toString(),
      activeOnly: activeOnly.toString()
    });

    const response = await fetch(`/api/license-data/refresh?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
    }

    const data: LicenseDataRefreshResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error refreshing license data:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Find a business by ID in the license data cache
 * @param id Business ID
 * @returns Promise resolving to the business or null if not found
 */
export async function findBusinessInLicenseCache(id: string): Promise<Business | null> {
  try {
    // Get all businesses from the cache
    const response = await fetch('/api/license-data/businesses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const businesses: Business[] = data.businesses;

    // Find the business with the matching ID
    const business = businesses.find(b => b.id === id);

    return business || null;
  } catch (error) {
    console.error(`Error finding business with ID ${id} in license cache:`, error);
    return null;
  }
}

export default {
  getLicenseDataCacheStatus,
  refreshLicenseData,
  findBusinessInLicenseCache
};
