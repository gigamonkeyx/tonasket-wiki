/**
 * Business Data Enrichment Service
 *
 * This service coordinates the fetching, merging, and enrichment of business data
 * from multiple sources to create comprehensive business profiles.
 */

import { Business } from '@/data/businesses';
import { fetchWaStateBusinesses } from './sources/waStateBusiness';
import { fetchGooglePlacesData } from './sources/googlePlaces';
import { fetchYelpBusinessData } from './sources/yelpFusion';
import { scrapeBusinessWebsites } from './sources/webScraper';
import { enrichBusinessWithLicenseData } from './sources/waLicenseEnrichment';
import { mergeBusinessRecords } from './utils/dataMerger';
import { normalizeAddress, normalizePhone } from './utils/dataNormalizer';
import { prisma } from '@/lib/mock-prisma';

/**
 * Main function to enrich business data from multiple sources
 * @param zipCode - ZIP code to filter businesses (e.g., '98855' for Tonasket)
 * @param limit - Maximum number of businesses to process
 */
export async function enrichBusinessData(zipCode: string = '98855', limit: number = 100): Promise<Business[]> {
  try {
    console.log(`[ENRICHMENT] Starting business data enrichment for ZIP code ${zipCode}...`);

    // Step 1: Fetch foundation data from WA State Business Lookup
    console.log('[ENRICHMENT] Fetching WA State business records...');
    let stateBusinesses = [];
    try {
      stateBusinesses = await fetchWaStateBusinesses(zipCode, limit);
      console.log(`[ENRICHMENT] Found ${stateBusinesses.length} businesses from WA State records.`);
    } catch (error) {
      console.error('[ENRICHMENT ERROR] Error fetching WA State business records:', error);
      if (error instanceof Error) {
        console.error('[ENRICHMENT ERROR] Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name,
          cause: error.cause
        });
      }
      console.log('[ENRICHMENT] Continuing with empty state business records...');
      // Continue with empty array rather than failing the entire process
    }

    // If no state businesses were found, use fallback data
    if (stateBusinesses.length === 0) {
      console.log('[ENRICHMENT] No WA State business records found, using fallback data...');
      // Import static business data as fallback
      const { businesses } = await import('@/data/businesses');
      const filteredBusinesses = businesses.filter(b => b.address.includes(zipCode)).slice(0, limit);
      console.log(`[ENRICHMENT] Using ${filteredBusinesses.length} businesses from static data as fallback.`);
      stateBusinesses = filteredBusinesses;
    }

    // Initialize array for enriched business records
    const enrichedBusinesses: Business[] = [];

    // Step 2: Enrich each business with data from multiple sources
    console.log(`[ENRICHMENT] Starting enrichment for ${stateBusinesses.length} businesses...`);

    for (const stateBusiness of stateBusinesses) {
      try {
        console.log(`[ENRICHMENT] Processing business: ${stateBusiness.name}`);

        // Track enrichment steps for better error reporting
        const enrichmentSteps = {
          addressNormalized: false,
          googleDataFetched: false,
          yelpDataFetched: false,
          websiteScraped: false,
          licenseDataFetched: false,
          dataMerged: false,
          savedToDatabase: false
        };

        // Normalize the business address for better matching
        let normalizedAddress;
        try {
          normalizedAddress = normalizeAddress(stateBusiness.address);
          enrichmentSteps.addressNormalized = true;
          console.log(`[ENRICHMENT] Normalized address for ${stateBusiness.name}: ${normalizedAddress}`);
        } catch (addrError) {
          console.error(`[ENRICHMENT ERROR] Address normalization failed for ${stateBusiness.name}:`, addrError);
          normalizedAddress = stateBusiness.address; // Use original address as fallback
        }

        // Fetch data from Google Places API
        let googleData = null;
        try {
          googleData = await fetchGooglePlacesData(stateBusiness.name, normalizedAddress);
          enrichmentSteps.googleDataFetched = true;
          console.log(`[ENRICHMENT] Google Places data ${googleData ? 'found' : 'not found'} for ${stateBusiness.name}`);
        } catch (googleError) {
          console.error(`[ENRICHMENT ERROR] Google Places API error for ${stateBusiness.name}:`, googleError);
        }

        // Fetch data from Yelp Fusion API
        let yelpData = null;
        try {
          yelpData = await fetchYelpBusinessData(stateBusiness.name, normalizedAddress);
          enrichmentSteps.yelpDataFetched = true;
          console.log(`[ENRICHMENT] Yelp data ${yelpData ? 'found' : 'not found'} for ${stateBusiness.name}`);
        } catch (yelpError) {
          console.error(`[ENRICHMENT ERROR] Yelp API error for ${stateBusiness.name}:`, yelpError);
        }

        // Scrape data from business website (if available)
        let webData = null;
        const websiteUrl = googleData?.website || yelpData?.url || stateBusiness.website;
        if (websiteUrl) {
          try {
            webData = await scrapeBusinessWebsites(websiteUrl);
            enrichmentSteps.websiteScraped = true;
            console.log(`[ENRICHMENT] Website data ${webData ? 'scraped' : 'not found'} for ${stateBusiness.name} from ${websiteUrl}`);
          } catch (webError) {
            console.error(`[ENRICHMENT ERROR] Website scraping error for ${stateBusiness.name} (${websiteUrl}):`, webError);
          }
        } else {
          console.log(`[ENRICHMENT] No website URL available for ${stateBusiness.name}`);
        }

        // Fetch license data from WA License Lookup
        let licenseData = null;
        try {
          licenseData = await enrichBusinessWithLicenseData(stateBusiness);
          enrichmentSteps.licenseDataFetched = true;
          console.log(`[ENRICHMENT] License data ${licenseData.licenseNumber ? 'found' : 'not found'} for ${stateBusiness.name}`);
        } catch (licenseError) {
          console.error(`[ENRICHMENT ERROR] License lookup error for ${stateBusiness.name}:`, licenseError);
          // Continue with the original business record if license lookup fails
          licenseData = stateBusiness;
        }

        // Merge data from all sources
        let enrichedBusiness;
        try {
          // Use the license-enriched business as the base for merging
          enrichedBusiness = mergeBusinessRecords(
            licenseData || stateBusiness,
            googleData,
            yelpData,
            webData
          );
          enrichmentSteps.dataMerged = true;
          console.log(`[ENRICHMENT] Successfully merged data for ${stateBusiness.name}`);
        } catch (mergeError) {
          console.error(`[ENRICHMENT ERROR] Data merging error for ${stateBusiness.name}:`, mergeError);
          // Use the license-enriched business record if merging fails
          enrichedBusiness = licenseData || stateBusiness;
        }

        // Add to enriched businesses array
        enrichedBusinesses.push(enrichedBusiness);

        // Save to database
        try {
          await saveToDatabaseIfNew(enrichedBusiness);
          enrichmentSteps.savedToDatabase = true;
          console.log(`[ENRICHMENT] Database record updated/created for ${stateBusiness.name}`);
        } catch (dbError) {
          console.error(`[ENRICHMENT ERROR] Database save error for ${stateBusiness.name}:`, dbError);
        }

        // Log enrichment completion with steps summary
        console.log(`[ENRICHMENT] Completed enrichment for: ${stateBusiness.name}`, enrichmentSteps);
      } catch (error) {
        console.error(`[ENRICHMENT ERROR] Fatal error enriching data for ${stateBusiness.name}:`, error);
        if (error instanceof Error) {
          console.error('[ENRICHMENT ERROR] Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
          });
        }
        // Add the basic state record to ensure the business is still included
        enrichedBusinesses.push(stateBusiness);
        console.log(`[ENRICHMENT] Added basic record for ${stateBusiness.name} due to enrichment failure`);
      }
    }

    console.log(`[ENRICHMENT] Completed enrichment process for ${enrichedBusinesses.length} businesses.`);

    console.log(`[ENRICHMENT] Business data enrichment complete. Enriched ${enrichedBusinesses.length} businesses.`);

    // Log a summary of the enrichment process
    const summary = {
      totalBusinesses: enrichedBusinesses.length,
      zipCode,
      timestamp: new Date().toISOString(),
      categories: {} as Record<string, number>
    };

    // Count businesses by category
    enrichedBusinesses.forEach(business => {
      const category = business.category || 'Uncategorized';
      summary.categories[category] = (summary.categories[category] || 0) + 1;
    });

    console.log('[ENRICHMENT] Enrichment process summary:', summary);

    return enrichedBusinesses;
  } catch (error) {
    console.error('[ENRICHMENT ERROR] Fatal error in business data enrichment process:', error);

    if (error instanceof Error) {
      console.error('[ENRICHMENT ERROR] Detailed error information:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        cause: error.cause
      });
    }

    // Instead of throwing and breaking the application, return an empty array with error info
    console.log('[ENRICHMENT] Returning empty business array due to fatal error');
    return [];
  }
}

/**
 * Save business data to database if it doesn't already exist
 */
async function saveToDatabaseIfNew(business: Business): Promise<void> {
  try {
    // Check if business already exists in database
    const existingBusiness = await prisma.business.findFirst({
      where: {
        OR: [
          { name: business.name },
          {
            AND: [
              { address: business.address },
              { phone: business.phone }
            ]
          }
        ]
      }
    });

    if (existingBusiness) {
      // Update existing record with new information
      await prisma.business.update({
        where: { id: existingBusiness.id },
        data: {
          name: business.name,
          description: business.description,
          address: business.address,
          phone: business.phone,
          website: business.website,
          category: business.category,
          // Add other fields as needed
          updatedAt: new Date()
        }
      });
      console.log(`Updated existing business: ${business.name}`);
    } else {
      // Create new business record
      await prisma.business.create({
        data: {
          name: business.name,
          description: business.description,
          address: business.address,
          phone: business.phone,
          website: business.website,
          category: business.category,
          // Add other fields as needed
        }
      });
      console.log(`Added new business: ${business.name}`);
    }
  } catch (error) {
    console.error(`Error saving business ${business.name} to database:`, error);
  }
}

/**
 * Run the enrichment process on a schedule
 * @param cronSchedule - Cron schedule expression (e.g., '0 0 * * 0' for weekly on Sunday at midnight)
 */
export function scheduleBusinessDataEnrichment(cronSchedule: string = '0 0 * * 0'): void {
  // This would typically use a scheduling library like node-cron
  console.log(`Business data enrichment scheduled with cron: ${cronSchedule}`);
  // Implementation would depend on the chosen scheduling library
}
