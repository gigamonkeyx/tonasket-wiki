/**
 * Google Places API Client
 * 
 * This module fetches business data from the Google Places API to enrich
 * our business listings with additional details like hours, photos, and reviews.
 */

import axios from 'axios';

// API configuration
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const PLACES_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place';

// Define the structure of Google Places data we're interested in
export interface GooglePlacesData {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  opening_hours?: {
    weekday_text: string[];
    open_now?: boolean;
    periods?: Array<{
      open: { day: number; time: string };
      close: { day: number; time: string };
    }>;
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: string[];
  }>;
  types?: string[];
  price_level?: number;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
  business_status?: string;
}

/**
 * Fetch business data from Google Places API
 * @param businessName - Name of the business to search for
 * @param address - Address of the business for more accurate results
 * @returns Google Places data for the business or null if not found
 */
export async function fetchGooglePlacesData(
  businessName: string,
  address: string
): Promise<GooglePlacesData | null> {
  if (!API_KEY) {
    console.warn('Google Places API key not configured. Skipping Google Places enrichment.');
    return null;
  }

  try {
    // Step 1: Find the place using the Places Search API
    const searchQuery = `${businessName} ${address}`;
    const searchParams = new URLSearchParams({
      input: searchQuery,
      inputtype: 'textquery',
      fields: 'place_id,name,formatted_address',
      key: API_KEY
    });

    const searchResponse = await axios.get(
      `${PLACES_API_ENDPOINT}/findplacefromtext/json?${searchParams.toString()}`
    );

    if (
      !searchResponse.data ||
      !searchResponse.data.candidates ||
      searchResponse.data.candidates.length === 0
    ) {
      console.log(`No Google Places results found for: ${businessName}`);
      return null;
    }

    // Get the place_id from the first (most relevant) result
    const placeId = searchResponse.data.candidates[0].place_id;

    // Step 2: Get detailed place information using the Places Details API
    const detailsParams = new URLSearchParams({
      place_id: placeId,
      fields: 'name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,opening_hours,photos,types,price_level,geometry,reviews,business_status',
      key: API_KEY
    });

    const detailsResponse = await axios.get(
      `${PLACES_API_ENDPOINT}/details/json?${detailsParams.toString()}`
    );

    if (!detailsResponse.data || detailsResponse.data.status !== 'OK') {
      console.log(`Failed to get Google Places details for: ${businessName}`);
      return null;
    }

    return detailsResponse.data.result as GooglePlacesData;
  } catch (error) {
    console.error(`Error fetching Google Places data for ${businessName}:`, error);
    return null;
  }
}

/**
 * Get photo URL from Google Places photo reference
 * @param photoReference - Photo reference from Google Places API
 * @param maxWidth - Maximum width of the photo
 * @returns URL to the photo
 */
export function getGooglePlacesPhotoUrl(photoReference: string, maxWidth: number = 400): string {
  if (!API_KEY) return '';
  
  const photoParams = new URLSearchParams({
    photoreference: photoReference,
    maxwidth: maxWidth.toString(),
    key: API_KEY
  });
  
  return `${PLACES_API_ENDPOINT}/photo?${photoParams.toString()}`;
}

/**
 * Convert Google Places opening hours to a structured format
 * @param openingHours - Opening hours from Google Places API
 * @returns Structured opening hours object
 */
export function formatOpeningHours(openingHours?: GooglePlacesData['opening_hours']): Record<string, string> | undefined {
  if (!openingHours || !openingHours.weekday_text) return undefined;
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const formattedHours: Record<string, string> = {};
  
  openingHours.weekday_text.forEach(dayText => {
    const [day, hours] = dayText.split(': ');
    formattedHours[day] = hours;
  });
  
  return formattedHours;
}
