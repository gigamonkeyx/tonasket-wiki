/**
 * Washington State License Enrichment Service
 *
 * This module enriches business data with license information from the
 * Washington State Department of Revenue's business license dataset.
 */

import { Business } from '@/data/businesses';
import { searchBusinessesByName, searchBusinessByUBI, searchBusinessesByLocation } from './waLicenseLookup';
import { normalizeAddress } from '../utils/dataNormalizer';

/**
 * Enrich a business with license data
 * @param business Business to enrich
 * @returns Enriched business with license data
 */
export async function enrichBusinessWithLicenseData(business: Business): Promise<Business> {
  try {
    console.log(`[LICENSE_ENRICHMENT] Enriching business: ${business.name}`);
    
    // First try to find by UBI if available
    let licenseData = null;
    if (business.id && business.id.startsWith('wa-')) {
      const ubi = business.id.replace('wa-', '');
      console.log(`[LICENSE_ENRICHMENT] Searching by UBI: ${ubi}`);
      licenseData = await searchBusinessByUBI(ubi);
    }
    
    // If not found by UBI, try by name
    if (!licenseData) {
      console.log(`[LICENSE_ENRICHMENT] Searching by name: ${business.name}`);
      const nameResults = await searchBusinessesByName(business.name, 5);
      
      if (nameResults.length > 0) {
        // Try to find the best match by comparing addresses
        const businessAddress = normalizeAddress(business.address);
        
        // Find the best match by comparing addresses
        let bestMatch = null;
        let bestMatchScore = 0;
        
        for (const result of nameResults) {
          const resultAddress = normalizeAddress(result.address);
          const score = calculateAddressSimilarity(businessAddress, resultAddress);
          
          if (score > bestMatchScore) {
            bestMatchScore = score;
            bestMatch = result;
          }
        }
        
        // Use the best match if it's above a threshold
        if (bestMatchScore > 0.5) {
          licenseData = bestMatch;
        } else {
          // If no good match by address, just use the first result
          licenseData = nameResults[0];
        }
      }
    }
    
    // If still not found, try by location
    if (!licenseData && business.address) {
      // Extract city from address
      const addressParts = business.address.split(',');
      if (addressParts.length >= 2) {
        const city = addressParts[1].trim();
        console.log(`[LICENSE_ENRICHMENT] Searching by location: ${city}`);
        
        const locationResults = await searchBusinessesByLocation(city, 20);
        
        if (locationResults.length > 0) {
          // Find the best match by name similarity
          let bestMatch = null;
          let bestMatchScore = 0;
          
          for (const result of locationResults) {
            const score = calculateNameSimilarity(business.name, result.name);
            
            if (score > bestMatchScore) {
              bestMatchScore = score;
              bestMatch = result;
            }
          }
          
          // Use the best match if it's above a threshold
          if (bestMatchScore > 0.7) {
            licenseData = bestMatch;
          }
        }
      }
    }
    
    // If license data was found, enrich the business
    if (licenseData) {
      console.log(`[LICENSE_ENRICHMENT] Found license data for ${business.name}`);
      
      // Create a new business object with the enriched data
      const enrichedBusiness: Business = {
        ...business,
        // Add license-specific fields
        licenseStatus: licenseData.licenseStatus,
        licenseType: licenseData.licenseType,
        licenseNumber: licenseData.licenseNumber,
        firstIssueDate: licenseData.firstIssueDate,
        // Add location-specific fields if they exist
        locationName: licenseData.locationName || business.name,
        businessName: licenseData.businessName || business.name,
        // Add address fields if they exist
        businessAddress: licenseData.businessAddress || business.address,
        locationAddress: licenseData.locationAddress,
        // Update tags with license information
        tags: [...(business.tags || []), ...(licenseData.tags || [])].filter((v, i, a) => a.indexOf(v) === i),
        // Update source data
        sourceData: {
          ...(business.sourceData || {}),
          waLicense: licenseData.sourceData
        }
      };
      
      return enrichedBusiness;
    }
    
    // If no license data was found, return the original business
    console.log(`[LICENSE_ENRICHMENT] No license data found for ${business.name}`);
    return business;
  } catch (error) {
    console.error('[LICENSE_ENRICHMENT] Error enriching business with license data:', error);
    // Return the original business if there was an error
    return business;
  }
}

/**
 * Calculate the similarity between two addresses
 * @param address1 First address
 * @param address2 Second address
 * @returns Similarity score between 0 and 1
 */
function calculateAddressSimilarity(address1: string, address2: string): number {
  if (!address1 || !address2) return 0;
  
  // Normalize addresses
  const norm1 = address1.toLowerCase().replace(/[^\w\s]/g, '');
  const norm2 = address2.toLowerCase().replace(/[^\w\s]/g, '');
  
  // Split into words
  const words1 = norm1.split(/\s+/).filter(w => w.length > 0);
  const words2 = norm2.split(/\s+/).filter(w => w.length > 0);
  
  // Count matching words
  let matches = 0;
  for (const word of words1) {
    if (words2.includes(word)) {
      matches++;
    }
  }
  
  // Calculate similarity score
  const totalWords = Math.max(words1.length, words2.length);
  return totalWords > 0 ? matches / totalWords : 0;
}

/**
 * Calculate the similarity between two business names
 * @param name1 First name
 * @param name2 Second name
 * @returns Similarity score between 0 and 1
 */
function calculateNameSimilarity(name1: string, name2: string): number {
  if (!name1 || !name2) return 0;
  
  // Normalize names
  const norm1 = name1.toLowerCase().replace(/[^\w\s]/g, '');
  const norm2 = name2.toLowerCase().replace(/[^\w\s]/g, '');
  
  // Split into words
  const words1 = norm1.split(/\s+/).filter(w => w.length > 0);
  const words2 = norm2.split(/\s+/).filter(w => w.length > 0);
  
  // Count matching words
  let matches = 0;
  for (const word of words1) {
    if (words2.includes(word)) {
      matches++;
    }
  }
  
  // Calculate similarity score
  const totalWords = Math.max(words1.length, words2.length);
  return totalWords > 0 ? matches / totalWords : 0;
}

export default {
  enrichBusinessWithLicenseData
};
