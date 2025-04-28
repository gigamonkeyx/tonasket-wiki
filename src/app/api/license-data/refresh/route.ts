import { NextRequest, NextResponse } from 'next/server';
import { enrichBusinessWithLicenseData } from '@/services/businessEnrichment/sources/waLicenseEnrichment';
import { businesses } from '@/data/businesses';
import fs from 'fs';
import path from 'path';

/**
 * POST /api/license-data/refresh
 *
 * Refreshes the license data for all businesses in the directory.
 * This endpoint can be called manually or via a scheduled job.
 *
 * Query parameters:
 * - apiKey: API key for authentication (required)
 * - zipCode: Filter by ZIP code (default: 98855)
 * - limit: Maximum number of businesses to process (default: 100)
 */
export async function POST(request: NextRequest) {
  try {
    // Check API key for authentication
    const searchParams = request.nextUrl.searchParams;
    const apiKey = searchParams.get('apiKey');
    const expectedApiKey = process.env.ADMIN_API_KEY;

    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid or missing API key.' },
        { status: 401 }
      );
    }

    // Get parameters
    const zipCode = searchParams.get('zipCode') || '98855';
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const activeOnly = searchParams.get('activeOnly') === 'true';

    console.log(`[LICENSE_REFRESH] Starting license data refresh for ZIP code ${zipCode} (limit: ${limit}, activeOnly: ${activeOnly})`);

    // Get businesses to refresh
    const businessesToRefresh = businesses
      .filter(b => b.address.includes(zipCode))
      .slice(0, limit);

    console.log(`[LICENSE_REFRESH] Found ${businessesToRefresh.length} businesses to refresh`);

    // Process businesses in batches to avoid rate limits
    const batchSize = 10;
    const batches = [];

    for (let i = 0; i < businessesToRefresh.length; i += batchSize) {
      batches.push(businessesToRefresh.slice(i, i + batchSize));
    }

    console.log(`[LICENSE_REFRESH] Processing businesses in ${batches.length} batches of ${batchSize}`);

    // Process each batch sequentially
    const enrichedBusinesses = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`[LICENSE_REFRESH] Processing batch ${i + 1} of ${batches.length}`);

      // Process each business in the batch concurrently
      const batchResults = await Promise.all(
        batch.map(async (business) => {
          try {
            console.log(`[LICENSE_REFRESH] Enriching business: ${business.name}`);
            const enrichedBusiness = await enrichBusinessWithLicenseData(business);
            successCount++;
            return enrichedBusiness;
          } catch (error) {
            console.error(`[LICENSE_REFRESH] Error enriching business ${business.name}:`, error);
            errorCount++;
            return business; // Return original business on error
          }
        })
      );

      // Add batch results to enriched businesses
      enrichedBusinesses.push(...batchResults);

      // Add a delay between batches to avoid rate limits
      if (i < batches.length - 1) {
        console.log(`[LICENSE_REFRESH] Waiting 2 seconds before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`[LICENSE_REFRESH] Completed license data refresh. Success: ${successCount}, Errors: ${errorCount}`);

    // Save the enriched data to a cache file
    try {
      const cacheDir = path.join(process.cwd(), 'cache');

      // Create cache directory if it doesn't exist
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      const cachePath = path.join(cacheDir, 'license-data-cache.json');

      // Save the data with timestamp
      fs.writeFileSync(
        cachePath,
        JSON.stringify({
          businesses: enrichedBusinesses,
          timestamp: new Date().toISOString(),
          zipCode,
          limit,
          activeOnly
        }, null, 2),
        'utf8'
      );

      console.log(`[LICENSE_REFRESH] Saved license data cache to ${cachePath}`);
    } catch (cacheError) {
      console.error('[LICENSE_REFRESH] Error saving license data cache:', cacheError);
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: `License data refresh completed. Processed ${enrichedBusinesses.length} businesses.`,
      stats: {
        total: enrichedBusinesses.length,
        success: successCount,
        error: errorCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[LICENSE_REFRESH] Error refreshing license data:', error);

    return NextResponse.json(
      {
        error: 'Failed to refresh license data',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/license-data/refresh
 *
 * Returns the status of the license data cache.
 */
export async function GET(request: NextRequest) {
  try {
    const cachePath = path.join(process.cwd(), 'cache', 'license-data-cache.json');

    // Check if cache file exists
    if (!fs.existsSync(cachePath)) {
      return NextResponse.json(
        {
          exists: false,
          message: 'License data cache does not exist.',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      );
    }

    // Read cache file
    const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

    // Calculate cache age
    const cacheTimestamp = new Date(cacheData.timestamp);
    const now = new Date();
    const cacheAgeMs = now.getTime() - cacheTimestamp.getTime();
    const cacheAgeHours = Math.round(cacheAgeMs / (1000 * 60 * 60) * 10) / 10;

    // Return cache status
    return NextResponse.json({
      exists: true,
      timestamp: cacheData.timestamp,
      cacheAge: {
        ms: cacheAgeMs,
        hours: cacheAgeHours,
        days: Math.round(cacheAgeHours / 24 * 10) / 10
      },
      businessCount: cacheData.businesses.length,
      zipCode: cacheData.zipCode,
      limit: cacheData.limit,
      activeOnly: cacheData.activeOnly
    });
  } catch (error) {
    console.error('[LICENSE_REFRESH] Error getting license data cache status:', error);

    return NextResponse.json(
      {
        error: 'Failed to get license data cache status',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
