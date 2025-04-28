/**
 * Washington State License Lookup Service
 *
 * This module provides functionality to search for business licenses in Washington State
 * using the Socrata API to access the Department of Revenue's business license data.
 */

import axios from 'axios';
import { Business } from '@/types/business';
import { determineBusinessCategory } from '../utils/businessCategories';

// Constants
const SOCRATA_DATASET_ID = 'ucdg-xgbj'; // Washington State business license dataset
const SOCRATA_API_BASE_URL = 'https://data.wa.gov/resource';
const BUSINESS_LOOKUP_URL = 'https://secure.dor.wa.gov/gteunauth/_/';

// Get the Socrata API token from environment variables
const SOCRATA_APP_TOKEN = process.env.SOCRATA_APP_TOKEN || '';

/**
 * Search for businesses by name in the Washington State business license dataset
 * @param name Business name to search for
 * @param limit Maximum number of results to return
 * @returns Array of businesses matching the search criteria
 */
export async function searchBusinessesByName(name: string, limit: number = 20): Promise<Business[]> {
  try {
    console.log(`[WA_LICENSE_LOOKUP] Searching for businesses with name: ${name}`);

    // Use a simple query to avoid 400 errors
    const simpleQuery = encodeURIComponent(`business_name LIKE '%${name}%'`);
    const url = `${SOCRATA_API_BASE_URL}/${SOCRATA_DATASET_ID}.json?$where=${simpleQuery}&$limit=${limit}&$order=license_status,business_name`;

    console.log(`[WA_LICENSE_LOOKUP] Using simple name query: ${url}`);

    // Make the API request
    const response = await axios.get(url, {
      headers: SOCRATA_APP_TOKEN ? { 'X-App-Token': SOCRATA_APP_TOKEN } : {}
    });

    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.log(`[WA_LICENSE_LOOKUP] No businesses found with name: ${name}`);
      return [];
    }

    // Map the API response to Business objects
    return response.data.map(item => mapSocrataDataToBusiness(item, name));
  } catch (error) {
    console.error('[WA_LICENSE_LOOKUP] Error searching for businesses by name:', error);

    // Return a fallback message if the API request fails
    return [{
      id: 'wa-license-lookup-error',
      name: 'Washington State License Lookup',
      description: 'There was an error searching for businesses. Please try again later.',
      category: 'Information',
      subcategory: 'Government Services',
      address: 'Washington State Department of Revenue',
      phone: '',
      email: '',
      website: 'https://secure.dor.wa.gov/gteunauth/_/',
      hours: '',
      founded: '',
      employees: '',
      featured: false,
      image: '',
      services: [],
      products: [],
      tags: ['License Lookup', 'Government', 'Business Registration'],
      socialMedia: {},
      coordinates: null,
      sourceData: {
        type: 'wa-license-lookup',
        id: 'error',
        error: error.message
      }
    }];
  }
}

/**
 * Search for businesses by UBI (Unified Business Identifier) in the Washington State business license dataset
 * @param ubi UBI number to search for
 * @returns Business matching the UBI, or null if not found
 */
export async function searchBusinessByUBI(ubi: string): Promise<Business | null> {
  try {
    console.log(`[WA_LICENSE_LOOKUP] Searching for business with UBI: ${ubi}`);

    // Clean up the UBI number (remove spaces, dashes, etc.)
    const cleanUbi = ubi.trim().replace(/[^a-zA-Z0-9]/g, '');

    // Use a simple query to avoid 400 errors
    const simpleQuery = encodeURIComponent(`license_number='${cleanUbi}'`);
    const url = `${SOCRATA_API_BASE_URL}/${SOCRATA_DATASET_ID}.json?$where=${simpleQuery}&$limit=5`;

    console.log(`[WA_LICENSE_LOOKUP] Using simple UBI query: ${url}`);

    // Make the API request
    const response = await axios.get(url, {
      headers: SOCRATA_APP_TOKEN ? { 'X-App-Token': SOCRATA_APP_TOKEN } : {}
    });

    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.log(`[WA_LICENSE_LOOKUP] No business found with UBI: ${ubi}`);
      return null;
    }

    // Map the API response to a Business object
    return mapSocrataDataToBusiness(response.data[0], ubi);
  } catch (error) {
    console.error('[WA_LICENSE_LOOKUP] Error searching for business by UBI:', error);

    // Return a fallback message if the API request fails
    return {
      id: 'wa-license-lookup-error',
      name: 'Washington State License Lookup',
      description: 'There was an error searching for the business. Please try again later.',
      category: 'Information',
      subcategory: 'Government Services',
      address: 'Washington State Department of Revenue',
      phone: '',
      email: '',
      website: 'https://secure.dor.wa.gov/gteunauth/_/',
      hours: '',
      founded: '',
      employees: '',
      featured: false,
      image: '',
      services: [],
      products: [],
      tags: ['License Lookup', 'Government', 'Business Registration'],
      socialMedia: {},
      coordinates: null,
      sourceData: {
        type: 'wa-license-lookup',
        id: 'error',
        ubi: ubi,
        error: error.message
      }
    };
  }
}

/**
 * Search for businesses by location in the Washington State business license dataset
 * @param city City to search in
 * @param limit Maximum number of results to return
 * @param activeOnly Whether to include only active businesses
 * @param countyWide Whether to search the entire Okanogan County
 * @param includeCities Object specifying which cities to include in the search
 * @returns Array of businesses matching the location criteria
 */
export async function searchBusinessesByLocation(
  city: string,
  limit: number = 20,
  activeOnly: boolean = true,
  countyWide: boolean = false,
  includeCities: Record<string, boolean> = { tonasket: true }
): Promise<Business[]> {
  try {
    console.log(`[WA_LICENSE_LOOKUP] Searching for businesses in location: ${city} (limit: ${limit}, activeOnly: ${activeOnly})`);

    // Construct the Socrata API query for location search
    // Clean up the city name and handle special cases
    const cleanCity = city.trim().replace(/\s+/g, ' ');

    // Build the query with multiple conditions for better matching
    let conditions = [
      `UPPER(location_city) LIKE UPPER('%${cleanCity}%')`,
      `UPPER(business_city) LIKE UPPER('%${cleanCity}%')`,
      // Also search in address fields for more comprehensive results
      `UPPER(location_street) LIKE UPPER('%${cleanCity}%')`,
      `UPPER(business_street) LIKE UPPER('%${cleanCity}%')`
    ];

    // If the city looks like a ZIP code, also search in postal code fields
    if (/^\d{5}(-\d{4})?$/.test(cleanCity)) {
      conditions.push(`business_postal_code='${cleanCity}'`);
      conditions.push(`location_postal_code='${cleanCity}'`);
    }

    // Special case for Tonasket - also include nearby areas
    if (cleanCity.toLowerCase() === 'tonasket' || cleanCity === '98855') {
      // Add nearby cities and areas that might be considered part of the Tonasket area
      const nearbyAreas = ['Oroville', 'Omak', 'Okanogan', 'Riverside', 'Ellisforde', 'Loomis'];
      nearbyAreas.forEach(area => {
        conditions.push(`UPPER(location_city) LIKE UPPER('%${area}%')`);
        conditions.push(`UPPER(business_city) LIKE UPPER('%${area}%')`);
      });

      // Also search for businesses in Okanogan County
      conditions.push(`UPPER(location_county) LIKE UPPER('%Okanogan%')`);
      conditions.push(`UPPER(business_county) LIKE UPPER('%Okanogan%')`);
    }

    // Use the proper Socrata filter syntax
    let url;

    // Log the search parameters
    console.log(`[WA_LICENSE_LOOKUP] Search parameters: countyWide=${countyWide}, includeCities=${JSON.stringify(includeCities)}`);

    // Define all Okanogan County ZIP codes and cities
    const okanogaCountyZips = [
      '98812', '98814', '98819', '98827', '98829', '98833', '98834',
      '98840', '98841', '98844', '98846', '98849', '98855', '98856',
      '98859', '98862', '99116', '99124', '99155', '99166'
    ];

    const okanogaCountyCities = [
      'BREWSTER', 'CARLTON', 'CONCONULLY', 'LOOMIS', 'MALOTT', 'MAZAMA',
      'METHOW', 'OKANOGAN', 'OMAK', 'OROVILLE', 'PATEROS', 'RIVERSIDE',
      'TONASKET', 'TWISP', 'WAUCONDA', 'WINTHROP', 'COULEE DAM',
      'ELMER CITY', 'NESPELEM', 'REPUBLIC'
    ];

    // Determine which cities to include in the search
    const cityFilters = [];
    const zipFilters = [];

    // If county-wide search is enabled, include all cities and ZIP codes
    if (countyWide) {
      console.log(`[WA_LICENSE_LOOKUP] Performing county-wide search for Okanogan County`);

      // Add all Okanogan County cities
      okanogaCountyCities.forEach(city => {
        cityFilters.push(`location_city='${city}'`);
        cityFilters.push(`business_city='${city}'`);
      });

      // Add all Okanogan County ZIP codes
      okanogaCountyZips.forEach(zip => {
        zipFilters.push(`location_postal_code='${zip}'`);
        zipFilters.push(`business_postal_code='${zip}'`);
      });
    } else {
      // Otherwise, use the selected cities

      // Add the main city
      if (cleanCity.toLowerCase() === 'tonasket' && includeCities.tonasket) {
        cityFilters.push(`location_city='TONASKET'`);
        cityFilters.push(`business_city='TONASKET'`);
        zipFilters.push(`location_postal_code='98855'`);
        zipFilters.push(`business_postal_code='98855'`);
      } else if (cleanCity.toLowerCase() !== 'tonasket') {
        cityFilters.push(`location_city='${cleanCity.toUpperCase()}'`);
        cityFilters.push(`business_city='${cleanCity.toUpperCase()}'`);
      }

      // Add other cities based on includeCities parameter
      if (includeCities.okanogan) {
        cityFilters.push(`location_city='OKANOGAN'`);
        cityFilters.push(`business_city='OKANOGAN'`);
        zipFilters.push(`location_postal_code='98840'`);
        zipFilters.push(`business_postal_code='98840'`);
      }

      if (includeCities.omak) {
        cityFilters.push(`location_city='OMAK'`);
        cityFilters.push(`business_city='OMAK'`);
        zipFilters.push(`location_postal_code='98841'`);
        zipFilters.push(`business_postal_code='98841'`);
      }

      if (includeCities.brewster) {
        cityFilters.push(`location_city='BREWSTER'`);
        cityFilters.push(`business_city='BREWSTER'`);
        zipFilters.push(`location_postal_code='98812'`);
        zipFilters.push(`business_postal_code='98812'`);
      }

      if (includeCities.twisp) {
        cityFilters.push(`location_city='TWISP'`);
        cityFilters.push(`business_city='TWISP'`);
        zipFilters.push(`location_postal_code='98856'`);
        zipFilters.push(`business_postal_code='98856'`);
      }

      if (includeCities.winthrop) {
        cityFilters.push(`location_city='WINTHROP'`);
        cityFilters.push(`business_city='WINTHROP'`);
        zipFilters.push(`location_postal_code='98862'`);
        zipFilters.push(`business_postal_code='98862'`);
      }
    }

    // Construct the where clause
    let locationClause = '';

    if (cityFilters.length > 0 || zipFilters.length > 0) {
      locationClause = [...cityFilters, ...zipFilters].join(' OR ');
    } else {
      // Default to the main city if no cities are selected
      locationClause = `location_city='${cleanCity.toUpperCase()}' OR business_city='${cleanCity.toUpperCase()}'`;
    }

    // Add active filter directly to the WHERE clause if needed
    let whereClause = locationClause;
    if (activeOnly) {
      whereClause = `(${locationClause}) AND license_status='Active'`;
    }

    // Encode the where clause
    const encodedWhereClause = encodeURIComponent(whereClause);

    // Construct the URL
    url = `${SOCRATA_API_BASE_URL}/${SOCRATA_DATASET_ID}.json?$where=${encodedWhereClause}&$limit=${limit}`;

    console.log(`[WA_LICENSE_LOOKUP] Using Socrata filter query: ${url}`);

    // Make the API request with simplified error handling
    try {
      // Make the API request
      const response = await axios.get(url, {
        headers: SOCRATA_APP_TOKEN ? { 'X-App-Token': SOCRATA_APP_TOKEN } : {}
      });

      // Check if we got valid results
      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        console.log(`[WA_LICENSE_LOOKUP] No businesses found in location: ${city}`);

        // If the city is a ZIP code, try searching by postal code
        if (/^\d{5}(-\d{4})?$/.test(cleanCity)) {
          console.log(`[WA_LICENSE_LOOKUP] Trying postal code search for: ${cleanCity}`);

          // Use the same filter syntax as the main query
          let postalUrl = `${SOCRATA_API_BASE_URL}/${SOCRATA_DATASET_ID}.json?location_postal_code=${cleanCity}&$limit=${limit}`;

          // Add active filter if needed
          if (activeOnly) {
            postalUrl += `&license_status=Active`;
          }

          try {
            const postalResponse = await axios.get(postalUrl, {
              headers: SOCRATA_APP_TOKEN ? { 'X-App-Token': SOCRATA_APP_TOKEN } : {}
            });

            if (postalResponse.data && Array.isArray(postalResponse.data) && postalResponse.data.length > 0) {
              console.log(`[WA_LICENSE_LOOKUP] Found ${postalResponse.data.length} businesses by postal code`);
              return postalResponse.data.map(item => mapSocrataDataToBusiness(item, city));
            }
          } catch (postalError) {
            console.error('[WA_LICENSE_LOOKUP] Postal code search failed:', postalError);
          }
        }

        // Return empty array if no results found
        return [];
      }

      // Map the API response to Business objects
      console.log(`[WA_LICENSE_LOOKUP] Found ${response.data.length} businesses in ${city}`);
      return response.data.map(item => mapSocrataDataToBusiness(item, city));
    } catch (error) {
      console.error('[WA_LICENSE_LOOKUP] API request failed:', error);

      // Try one more approach - get any businesses and filter manually
      try {
        console.log('[WA_LICENSE_LOOKUP] Trying basic query as last resort');

        // Try a different approach - search for businesses in Okanogan County
        // Use a simpler query with just a few major cities to avoid errors
        const fallbackCities = ['TONASKET', 'OKANOGAN', 'OMAK'];
        const fallbackZips = ['98855', '98840', '98841'];

        const fallbackCityFilters = fallbackCities.map(city => `location_city='${city}' OR business_city='${city}'`);
        const fallbackZipFilters = fallbackZips.map(zip => `location_postal_code='${zip}' OR business_postal_code='${zip}'`);

        // Combine all filters
        const locationClause = [...fallbackCityFilters, ...fallbackZipFilters].join(' OR ');

        // Add active filter directly to the WHERE clause if needed
        let fallbackWhereClause = locationClause;
        if (activeOnly) {
          fallbackWhereClause = `(${locationClause}) AND license_status='Active'`;
        }

        const encodedFallbackWhereClause = encodeURIComponent(fallbackWhereClause);
        let basicUrl = `${SOCRATA_API_BASE_URL}/${SOCRATA_DATASET_ID}.json?$where=${encodedFallbackWhereClause}&$limit=${limit}`;

        console.log(`[WA_LICENSE_LOOKUP] Using fallback query with major cities: ${basicUrl}`);

        const basicResponse = await axios.get(basicUrl, {
          headers: SOCRATA_APP_TOKEN ? { 'X-App-Token': SOCRATA_APP_TOKEN } : {}
        });

        if (basicResponse.data && Array.isArray(basicResponse.data) && basicResponse.data.length > 0) {
          // Return the results without filtering to ensure we get something
          console.log(`[WA_LICENSE_LOOKUP] Found ${basicResponse.data.length} businesses with basic query`);
          return basicResponse.data.map(item => mapSocrataDataToBusiness(item, city));
        }
      } catch (basicError) {
        console.error('[WA_LICENSE_LOOKUP] Basic query also failed:', basicError);
      }

      // If all else fails, return the error fallback
      throw error;
    }
  } catch (error) {
    console.error('[WA_LICENSE_LOOKUP] Error searching for businesses by location:', error);

    // Return a fallback message if the API request fails
    return [{
      id: 'wa-license-lookup-error',
      name: 'Washington State License Lookup',
      description: 'There was an error searching for businesses. Please try again later.',
      category: 'Information',
      subcategory: 'Government Services',
      address: 'Washington State Department of Revenue',
      phone: '',
      email: '',
      website: 'https://secure.dor.wa.gov/gteunauth/_/',
      hours: '',
      founded: '',
      employees: '',
      featured: false,
      image: '',
      services: [],
      products: [],
      tags: ['License Lookup', 'Government', 'Business Registration'],
      socialMedia: {},
      coordinates: null,
      sourceData: {
        type: 'wa-license-lookup',
        id: 'error',
        city: city,
        error: error.message
      }
    }];
  }
}

/**
 * Map Socrata API data to a Business object
 * @param item Data item from the Socrata API
 * @param searchTerm The search term used to find this business
 * @returns Business object with mapped data
 */
function mapSocrataDataToBusiness(item: any, searchTerm: string): Business {
  // Generate a unique ID for the business
  const id = `wa-license-${item.license_number || Math.random().toString(36).substring(2, 15)}`;

  // Use business_name or location_name as the business name
  const name = item.business_name || item.location_name || 'Unknown Business';

  // Determine if business name and location name are different
  const hasLocationName = item.location_name && item.business_name &&
                         item.location_name !== item.business_name;

  // Construct the business address (both business and location addresses if different)
  const businessAddressParts = [];
  if (item.business_street) businessAddressParts.push(item.business_street);
  if (item.business_city) businessAddressParts.push(item.business_city);
  if (item.business_state) businessAddressParts.push(item.business_state);
  if (item.business_postal_code) businessAddressParts.push(item.business_postal_code);
  const businessAddress = businessAddressParts.join(', ');

  const locationAddressParts = [];
  if (item.location_street) locationAddressParts.push(item.location_street);
  if (item.location_city) locationAddressParts.push(item.location_city);
  if (item.location_state) locationAddressParts.push(item.location_state);
  if (item.location_postal_code) locationAddressParts.push(item.location_postal_code);
  const locationAddress = locationAddressParts.join(', ');

  // Use business address as primary, but store both if different
  const address = businessAddress || locationAddress;
  const hasDifferentAddresses = businessAddress && locationAddress &&
                               businessAddress !== locationAddress;

  // Format dates
  let formattedIssueDate = '';
  if (item.first_issue_date) {
    const issueDate = new Date(item.first_issue_date);
    formattedIssueDate = issueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Construct a description with license information
  const licenseInfo = [];
  if (item.license_type) licenseInfo.push(`License Type: ${item.license_type}`);
  if (item.license_number) licenseInfo.push(`License Number: ${item.license_number}`);
  if (item.license_status) licenseInfo.push(`Status: ${item.license_status}`);
  if (formattedIssueDate) {
    licenseInfo.push(`First Issued: ${formattedIssueDate}`);
  }

  const description = licenseInfo.length > 0
    ? licenseInfo.join(' | ')
    : 'Business license information from Washington State Department of Revenue';

  // Determine the business category based on license type
  const category = determineBusinessCategory(item.license_type || '') || 'Services';

  // Create tags based on license type and status
  const tags = ['Business License'];
  if (item.license_type) tags.push(item.license_type);
  if (item.license_status) tags.push(item.license_status);
  if (item.business_city) tags.push(item.business_city);

  // Extract additional data
  const licenseType = item.license_type || '';
  const licenseNumber = item.license_number || '';
  const licenseStatus = item.license_status || '';
  const firstIssueDate = formattedIssueDate;
  const locationName = item.location_name || '';
  const businessName = item.business_name || '';

  return {
    id,
    name,
    description,
    category,
    subcategory: licenseType || 'General Business',
    address,
    phone: item.phone_number || '',
    phoneNumber: item.phone_number || '',
    licenseStatus,
    licenseType,
    licenseNumber,
    firstIssueDate,
    locationName,
    businessName,
    locationAddress: locationAddress !== businessAddress ? locationAddress : '',
    businessAddress,
    email: '',
    website: '',
    hours: '',
    founded: item.first_issue_date ? new Date(item.first_issue_date).getFullYear().toString() : '',
    employees: '',
    featured: false,
    image: '',
    services: [],
    products: [],
    tags,
    socialMedia: {},
    coordinates: null,
    sourceData: {
      type: 'wa-license-lookup',
      id: licenseNumber || id,
      searchTerm,
      rawData: item
    }
  };
}

/**
 * Test if the license lookup service is available
 * @returns True if the service is available, false otherwise
 */
export async function testLicenseLookupService(): Promise<boolean> {
  try {
    // Test the Socrata API
    const url = `${SOCRATA_API_BASE_URL}/${SOCRATA_DATASET_ID}.json?$limit=1`;
    const response = await axios.get(url, {
      headers: SOCRATA_APP_TOKEN ? { 'X-App-Token': SOCRATA_APP_TOKEN } : {}
    });
    return response.status === 200 && Array.isArray(response.data);
  } catch (error) {
    console.error('[WA_LICENSE_LOOKUP] Error testing license lookup service:', error);
    return false;
  }
}

export default {
  searchBusinessesByName,
  searchBusinessByUBI,
  searchBusinessesByLocation,
  testLicenseLookupService
};
