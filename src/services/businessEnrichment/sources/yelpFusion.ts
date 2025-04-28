/**
 * Yelp Fusion API Client
 * 
 * This module fetches business data from the Yelp Fusion API to enrich
 * our business listings with additional details like reviews, categories, and attributes.
 */

import axios from 'axios';

// API configuration
const API_KEY = process.env.YELP_API_KEY || '';
const YELP_API_ENDPOINT = 'https://api.yelp.com/v3';

// Define the structure of Yelp business data we're interested in
export interface YelpBusinessData {
  id: string;
  name: string;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  rating: number;
  price?: string;
  location: {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    state: string;
    zip_code: string;
    display_address: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  photos: string[];
  hours?: Array<{
    open: Array<{
      day: number;
      start: string;
      end: string;
      is_overnight: boolean;
    }>;
    hours_type: string;
    is_open_now: boolean;
  }>;
  categories: Array<{
    alias: string;
    title: string;
  }>;
  attributes?: Record<string, any>;
  transactions: string[];
}

/**
 * Fetch business data from Yelp Fusion API
 * @param businessName - Name of the business to search for
 * @param address - Address of the business for more accurate results
 * @returns Yelp business data or null if not found
 */
export async function fetchYelpBusinessData(
  businessName: string,
  address: string
): Promise<YelpBusinessData | null> {
  if (!API_KEY) {
    console.warn('Yelp API key not configured. Skipping Yelp data enrichment.');
    return null;
  }

  try {
    // Extract city from address for better search results
    const addressParts = address.split(',');
    const city = addressParts.length > 1 ? addressParts[1].trim() : 'Tonasket';
    
    // Step 1: Search for the business
    const searchParams = new URLSearchParams({
      term: businessName,
      location: `${city}, WA`,
      limit: '1'
    });

    const searchResponse = await axios.get(
      `${YELP_API_ENDPOINT}/businesses/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    if (
      !searchResponse.data ||
      !searchResponse.data.businesses ||
      searchResponse.data.businesses.length === 0
    ) {
      console.log(`No Yelp results found for: ${businessName}`);
      return null;
    }

    // Get the business ID from the first (most relevant) result
    const businessId = searchResponse.data.businesses[0].id;

    // Step 2: Get detailed business information
    const detailsResponse = await axios.get(
      `${YELP_API_ENDPOINT}/businesses/${businessId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    if (!detailsResponse.data) {
      console.log(`Failed to get Yelp details for: ${businessName}`);
      return null;
    }

    // Step 3: Get reviews
    const reviewsResponse = await axios.get(
      `${YELP_API_ENDPOINT}/businesses/${businessId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    // Combine business details with reviews
    const businessData = detailsResponse.data;
    if (reviewsResponse.data && reviewsResponse.data.reviews) {
      businessData.reviews = reviewsResponse.data.reviews;
    }

    return businessData as YelpBusinessData;
  } catch (error) {
    console.error(`Error fetching Yelp data for ${businessName}:`, error);
    return null;
  }
}

/**
 * Format Yelp hours into a structured format
 * @param yelpHours - Hours from Yelp API
 * @returns Formatted hours object
 */
export function formatYelpHours(yelpHours?: YelpBusinessData['hours']): Record<string, string> | undefined {
  if (!yelpHours || !yelpHours[0] || !yelpHours[0].open) return undefined;
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const formattedHours: Record<string, string> = {};
  
  // Initialize all days as "Closed"
  daysOfWeek.forEach(day => {
    formattedHours[day] = 'Closed';
  });
  
  // Update with actual hours
  yelpHours[0].open.forEach(timeSlot => {
    const day = daysOfWeek[timeSlot.day];
    const start = formatYelpTime(timeSlot.start);
    const end = formatYelpTime(timeSlot.end);
    
    formattedHours[day] = `${start} - ${end}`;
  });
  
  return formattedHours;
}

/**
 * Format Yelp time (e.g., "1130" to "11:30 AM")
 */
function formatYelpTime(time: string): string {
  const hours = parseInt(time.substring(0, 2));
  const minutes = time.substring(2);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
  return `${formattedHours}:${minutes} ${period}`;
}

/**
 * Extract categories from Yelp data
 * @param yelpCategories - Categories from Yelp API
 * @returns Array of category strings
 */
export function extractYelpCategories(yelpCategories?: YelpBusinessData['categories']): string[] {
  if (!yelpCategories) return [];
  
  return yelpCategories.map(category => category.title);
}
