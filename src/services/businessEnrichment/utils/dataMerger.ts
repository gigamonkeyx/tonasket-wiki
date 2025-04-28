/**
 * Data Merger Utility
 *
 * This module provides functions for merging business data from multiple sources
 * into a single comprehensive business record.
 */

import { Business } from '@/data/businesses';
import { GooglePlacesData, formatOpeningHours, getGooglePlacesPhotoUrl } from '../sources/googlePlaces';
import { YelpBusinessData, formatYelpHours, extractYelpCategories } from '../sources/yelpFusion';
import { ScrapedWebsiteData } from '../sources/webScraper';
import { normalizeAddress, normalizePhone } from './dataNormalizer';

/**
 * Merge business data from multiple sources into a single comprehensive record
 * @param stateRecord - Business data from WA State Business Lookup
 * @param googleData - Business data from Google Places API
 * @param yelpData - Business data from Yelp Fusion API
 * @param webData - Business data scraped from the business website
 * @returns Merged business record
 */
export function mergeBusinessRecords(
  stateRecord: Business,
  googleData: GooglePlacesData | null,
  yelpData: YelpBusinessData | null,
  webData: ScrapedWebsiteData | null
): Business {
  // Start with the state record as the base
  const mergedBusiness: Business = { ...stateRecord };

  // Merge name (prioritize state record, but use others if more complete)
  mergedBusiness.name = selectBestValue([
    stateRecord.name,
    googleData?.name,
    yelpData?.name
  ], 'longest');

  // Merge description (prioritize web data, then Yelp, then state)
  mergedBusiness.description = selectBestValue([
    webData?.description,
    yelpData?.categories?.map(c => c.title).join(', '),
    stateRecord.description
  ], 'longest');

  // Merge address (prioritize Google for formatting, but use state record as base)
  mergedBusiness.address = selectBestValue([
    googleData?.formatted_address,
    yelpData?.location?.display_address?.join(', '),
    webData?.address,
    stateRecord.address
  ]);

  // Merge phone (prioritize Google and Yelp for formatting)
  mergedBusiness.phone = normalizePhone(selectBestValue([
    googleData?.formatted_phone_number,
    yelpData?.display_phone,
    webData?.phone,
    stateRecord.phone
  ]));

  // Merge email (web data is likely the most accurate source)
  mergedBusiness.email = selectBestValue([
    webData?.email,
    stateRecord.email
  ]);

  // Merge website (prioritize Google and Yelp)
  mergedBusiness.website = selectBestValue([
    googleData?.website,
    yelpData?.url,
    stateRecord.website
  ]);

  // Merge hours (prioritize Google, then Yelp, then web data)
  const googleHours = googleData?.opening_hours ? formatOpeningHours(googleData.opening_hours) : undefined;
  const yelpHours = yelpData?.hours ? formatYelpHours(yelpData.hours) : undefined;

  mergedBusiness.hours = selectBestValue([
    googleHours ? formatHoursToString(googleHours) : undefined,
    yelpHours ? formatHoursToString(yelpHours) : undefined,
    webData?.hours ? formatHoursToString(webData.hours) : undefined
  ]);

  // Merge coordinates (prioritize Google for accuracy)
  if (googleData?.geometry?.location) {
    mergedBusiness.coordinates = {
      lat: googleData.geometry.location.lat,
      lng: googleData.geometry.location.lng
    };
  } else if (yelpData?.coordinates) {
    mergedBusiness.coordinates = {
      lat: yelpData.coordinates.latitude,
      lng: yelpData.coordinates.longitude
    };
  }

  // Merge category and subcategory
  if (yelpData?.categories && yelpData.categories.length > 0) {
    // Use Yelp categories to enhance or override state categories
    const yelpCategories = extractYelpCategories(yelpData.categories);

    // Map Yelp categories to our application categories
    const mappedCategory = mapYelpCategoryToAppCategory(yelpCategories[0]);
    if (mappedCategory) {
      mergedBusiness.category = mappedCategory;
    }

    // Use the second Yelp category as subcategory if available
    if (yelpCategories.length > 1) {
      mergedBusiness.subcategory = yelpCategories[1];
    }
  } else if (googleData?.types && googleData.types.length > 0) {
    // Use Google types to enhance or override state categories
    const mappedCategory = mapGoogleTypeToAppCategory(googleData.types[0]);
    if (mappedCategory) {
      mergedBusiness.category = mappedCategory;
    }
  }

  // Merge images (prioritize Google, then Yelp, then web data)
  if (googleData?.photos && googleData.photos.length > 0) {
    // Get the first photo from Google Places
    const photoReference = googleData.photos[0].photo_reference;
    mergedBusiness.image = getGooglePlacesPhotoUrl(photoReference);
  } else if (yelpData?.photos && yelpData.photos.length > 0) {
    // Get the first photo from Yelp
    mergedBusiness.image = yelpData.photos[0];
  } else if (webData?.images && webData.images.length > 0) {
    // Get the first image from the website
    mergedBusiness.image = webData.images[0];
  }

  // Merge services (combine from all sources)
  const services = new Set<string>();
  if (webData?.services) {
    webData.services.forEach(service => services.add(service));
  }
  if (googleData?.types) {
    googleData.types.forEach(type => {
      const formattedType = type.replace(/_/g, ' ').replace(/^(point_of_interest|establishment|food)$/i, '');
      if (formattedType && !['point_of_interest', 'establishment', 'food'].includes(formattedType)) {
        services.add(formattedType);
      }
    });
  }
  if (services.size > 0) {
    mergedBusiness.services = Array.from(services);
  }

  // Merge products (primarily from web data)
  if (webData?.products && webData.products.length > 0) {
    mergedBusiness.products = webData.products;
  }

  // Merge social media links
  if (webData?.socialMedia) {
    mergedBusiness.socialMedia = { ...webData.socialMedia };
  }

  // Preserve license data fields if they exist in the state record
  if (stateRecord.licenseStatus) mergedBusiness.licenseStatus = stateRecord.licenseStatus;
  if (stateRecord.licenseType) mergedBusiness.licenseType = stateRecord.licenseType;
  if (stateRecord.licenseNumber) mergedBusiness.licenseNumber = stateRecord.licenseNumber;
  if (stateRecord.firstIssueDate) mergedBusiness.firstIssueDate = stateRecord.firstIssueDate;
  if (stateRecord.locationName) mergedBusiness.locationName = stateRecord.locationName;
  if (stateRecord.businessName) mergedBusiness.businessName = stateRecord.businessName;
  if (stateRecord.locationAddress) mergedBusiness.locationAddress = stateRecord.locationAddress;
  if (stateRecord.businessAddress) mergedBusiness.businessAddress = stateRecord.businessAddress;

  // Merge tags (combine from all sources)
  const tags = new Set<string>(stateRecord.tags || []);

  // Add tags from Yelp categories
  if (yelpData?.categories) {
    yelpData.categories.forEach(category => {
      tags.add(category.alias);
      tags.add(category.title.toLowerCase());
    });
  }

  // Add tags from Google types
  if (googleData?.types) {
    googleData.types.forEach(type => {
      const formattedType = type.replace(/_/g, ' ');
      tags.add(formattedType);
    });
  }

  // Add license-related tags if available
  if (stateRecord.licenseType) {
    tags.add(stateRecord.licenseType.toLowerCase());
  }

  if (stateRecord.licenseStatus) {
    tags.add(stateRecord.licenseStatus.toLowerCase());
  }

  if (tags.size > 0) {
    mergedBusiness.tags = Array.from(tags);
  }

  // Set featured status based on ratings
  if (googleData?.rating && googleData.rating >= 4.5) {
    mergedBusiness.featured = true;
  } else if (yelpData?.rating && yelpData.rating >= 4.5) {
    mergedBusiness.featured = true;
  }

  return mergedBusiness;
}

/**
 * Select the best value from multiple options
 * @param values - Array of possible values
 * @param strategy - Selection strategy ('first', 'longest', or undefined for first non-empty)
 * @returns The best value or undefined if all values are empty
 */
export function selectBestValue(
  values: (string | undefined)[],
  strategy: 'first' | 'longest' = 'first'
): string | undefined {
  // Filter out undefined and empty values
  const filteredValues = values.filter(value => value && value.trim().length > 0);

  if (filteredValues.length === 0) {
    return undefined;
  }

  if (strategy === 'first') {
    return filteredValues[0];
  }

  if (strategy === 'longest') {
    return filteredValues.reduce((longest, current) => {
      return (current && current.length > (longest?.length || 0)) ? current : longest;
    }, undefined);
  }

  return filteredValues[0];
}

/**
 * Format hours object to string
 * @param hours - Hours object with day keys and time string values
 * @returns Formatted hours string
 */
function formatHoursToString(hours: Record<string, string>): string {
  return Object.entries(hours)
    .map(([day, time]) => `${day}: ${time}`)
    .join(', ');
}

/**
 * Map Yelp category to application category
 * @param yelpCategory - Yelp category title
 * @returns Mapped application category
 */
function mapYelpCategoryToAppCategory(yelpCategory: string): string | undefined {
  const categoryMap: Record<string, string> = {
    // Food & Dining
    'Restaurants': 'Food & Dining',
    'Food': 'Food & Dining',
    'Cafes': 'Food & Dining',
    'Bakeries': 'Food & Dining',
    'Breweries': 'Food & Dining',
    'Coffee & Tea': 'Food & Dining',
    'Grocery': 'Food & Dining',

    // Retail
    'Shopping': 'Retail',
    'Bookstores': 'Retail',
    'Clothing': 'Retail',
    'Hardware Stores': 'Retail',
    'Home & Garden': 'Retail',
    'Specialty Food': 'Retail',

    // Services
    'Professional Services': 'Services',
    'Financial Services': 'Services',
    'Auto Services': 'Services',
    'Home Services': 'Services',
    'Hotels & Travel': 'Services',
    'Education': 'Services',
    'Local Services': 'Services',

    // Healthcare
    'Health & Medical': 'Healthcare',
    'Doctors': 'Healthcare',
    'Dentists': 'Healthcare',
    'Hospitals': 'Healthcare',
    'Pharmacies': 'Healthcare',

    // Agriculture
    'Farms': 'Agriculture',
    'Farmers Market': 'Agriculture',
    'Gardening': 'Agriculture',
    'Nurseries & Gardening': 'Agriculture'
  };

  // Check for exact match
  if (categoryMap[yelpCategory]) {
    return categoryMap[yelpCategory];
  }

  // Check for partial match
  for (const [key, value] of Object.entries(categoryMap)) {
    if (yelpCategory.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return undefined;
}

/**
 * Map Google place type to application category
 * @param googleType - Google place type
 * @returns Mapped application category
 */
function mapGoogleTypeToAppCategory(googleType: string): string | undefined {
  const typeMap: Record<string, string> = {
    // Food & Dining
    'restaurant': 'Food & Dining',
    'cafe': 'Food & Dining',
    'bakery': 'Food & Dining',
    'bar': 'Food & Dining',
    'meal_takeaway': 'Food & Dining',
    'grocery_or_supermarket': 'Food & Dining',

    // Retail
    'store': 'Retail',
    'clothing_store': 'Retail',
    'book_store': 'Retail',
    'hardware_store': 'Retail',
    'home_goods_store': 'Retail',
    'shopping_mall': 'Retail',

    // Services
    'bank': 'Services',
    'post_office': 'Services',
    'library': 'Services',
    'school': 'Services',
    'lodging': 'Services',
    'car_repair': 'Services',
    'car_wash': 'Services',
    'gas_station': 'Services',

    // Healthcare
    'doctor': 'Healthcare',
    'dentist': 'Healthcare',
    'hospital': 'Healthcare',
    'pharmacy': 'Healthcare',
    'health': 'Healthcare',

    // Agriculture
    'farm': 'Agriculture'
  };

  return typeMap[googleType.toLowerCase()];
}
