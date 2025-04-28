/**
 * Business Category Utilities
 * 
 * This module provides utilities for determining business categories based on license types
 * and other business information.
 */

/**
 * Map of license types to business categories
 */
const LICENSE_TYPE_TO_CATEGORY: Record<string, string> = {
  // Vehicle-related
  'Motor Vehicle Dealer': 'Automotive',
  'Motor Vehicle Wrecker': 'Automotive',
  'Motor Vehicle Wholesaler': 'Automotive',
  'Motor Vehicle Salvage Processor': 'Automotive',
  'Motor Vehicle Hulk Hauler': 'Automotive',
  'Off-Road Vehicle Dealer': 'Automotive',
  'Snowmobile Dealer': 'Automotive',
  'Vehicle Manufacturer': 'Manufacturing',
  'Vehicle Transporter': 'Transportation',
  'Registered Tow Truck Operator': 'Automotive',
  'Misc Vehicle Dealer': 'Automotive',
  
  // Home/Construction related
  'Mfd Home/Travel-Trailer Dealer': 'Home & Construction',
  'Mfd Home/Travel-Trailer Dealer Subagency': 'Home & Construction',
  
  // Retail
  'For Hire': 'Transportation',
  'Retail': 'Retail',
  'Wholesale': 'Wholesale',
  
  // Default categories for common words in license types
  'Contractor': 'Home & Construction',
  'Restaurant': 'Food & Dining',
  'Cafe': 'Food & Dining',
  'Salon': 'Beauty & Wellness',
  'Spa': 'Beauty & Wellness',
  'Medical': 'Healthcare',
  'Dental': 'Healthcare',
  'Pharmacy': 'Healthcare',
  'Insurance': 'Financial Services',
  'Bank': 'Financial Services',
  'Law': 'Professional Services',
  'Attorney': 'Professional Services',
  'Accounting': 'Professional Services',
  'Hotel': 'Hospitality',
  'Motel': 'Hospitality',
  'Inn': 'Hospitality',
  'Lodging': 'Hospitality',
};

/**
 * Determine the business category based on license type
 * @param licenseType The license type string
 * @returns The determined category or undefined if no match
 */
export function determineBusinessCategory(licenseType: string): string | undefined {
  // Direct match
  if (LICENSE_TYPE_TO_CATEGORY[licenseType]) {
    return LICENSE_TYPE_TO_CATEGORY[licenseType];
  }
  
  // Check for partial matches
  const licenseTypeLower = licenseType.toLowerCase();
  
  for (const [key, category] of Object.entries(LICENSE_TYPE_TO_CATEGORY)) {
    if (licenseTypeLower.includes(key.toLowerCase())) {
      return category;
    }
  }
  
  // Check for common words
  if (licenseTypeLower.includes('auto') || licenseTypeLower.includes('car') || licenseTypeLower.includes('vehicle')) {
    return 'Automotive';
  }
  
  if (licenseTypeLower.includes('food') || licenseTypeLower.includes('restaurant') || licenseTypeLower.includes('cafe')) {
    return 'Food & Dining';
  }
  
  if (licenseTypeLower.includes('construction') || licenseTypeLower.includes('contractor') || licenseTypeLower.includes('builder')) {
    return 'Home & Construction';
  }
  
  if (licenseTypeLower.includes('salon') || licenseTypeLower.includes('spa') || licenseTypeLower.includes('beauty')) {
    return 'Beauty & Wellness';
  }
  
  if (licenseTypeLower.includes('medical') || licenseTypeLower.includes('health') || licenseTypeLower.includes('doctor')) {
    return 'Healthcare';
  }
  
  // Default to Services if no match
  return 'Services';
}

/**
 * Get all available business categories
 * @returns Array of all business categories
 */
export function getAllBusinessCategories(): string[] {
  const categories = new Set<string>(Object.values(LICENSE_TYPE_TO_CATEGORY));
  categories.add('Services'); // Add default category
  return Array.from(categories).sort();
}

export default {
  determineBusinessCategory,
  getAllBusinessCategories
};
