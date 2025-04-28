import { NextRequest, NextResponse } from 'next/server';
import { businesses } from '@/data/businesses';
import { prisma } from '@/lib/mock-prisma';
import { enrichBusinessData } from '@/services/businessEnrichment';

/**
 * GET /api/businesses/enriched
 *
 * Fetches enriched business data from multiple sources.
 *
 * Query parameters:
 * - zipCode: Filter by ZIP code (default: 98855)
 * - limit: Maximum number of businesses to return (default: 50)
 * - refresh: Whether to refresh the data from external sources (default: false)
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[API] Received request for enriched businesses');

    const searchParams = request.nextUrl.searchParams;
    const zipCode = searchParams.get('zipCode') || '98855';
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const refresh = true; // Force refresh to use the Socrata API

    console.log('[API] Request parameters:', { zipCode, limit, refresh });

    let enrichedBusinesses;

    // Check if we should refresh the data from external sources
    if (refresh) {
      console.log('[API] Refresh requested, fetching fresh data from external sources');
      try {
        // Fetch fresh data from external sources
        enrichedBusinesses = await enrichBusinessData(zipCode, limit);

        console.log(`[API] Successfully refreshed data, got ${enrichedBusinesses.length} businesses`);

        // Ensure we have featured businesses by marking some as featured
        // This ensures the featured section doesn't disappear after refresh

        // First, mark businesses with higher quality data as featured
        for (let i = 0; i < enrichedBusinesses.length; i++) {
          if (enrichedBusinesses[i].description && enrichedBusinesses[i].description.length > 30) {
            enrichedBusinesses[i].featured = true;
          }
        }

        // Get current featured businesses
        let featuredBusinesses = enrichedBusinesses.filter(b => b.featured);

        // Determine target count - either 3 or 6 for balanced grid layout
        let targetCount = 3;
        if (featuredBusinesses.length > 3 && featuredBusinesses.length < 6) {
          targetCount = 6;
        }

        // If we have between 4-5 featured businesses, aim for 6
        if (featuredBusinesses.length >= 4 && featuredBusinesses.length < 6) {
          // Add more featured businesses to reach 6
          for (let i = 0; i < enrichedBusinesses.length && featuredBusinesses.length < 6; i++) {
            if (!enrichedBusinesses[i].featured) {
              enrichedBusinesses[i].featured = true;
              featuredBusinesses.push(enrichedBusinesses[i]);
            }
          }
        }
        // If we have less than 3, ensure we have at least 3
        else if (featuredBusinesses.length < 3) {
          // Add more featured businesses to reach 3
          for (let i = 0; i < enrichedBusinesses.length && featuredBusinesses.length < 3; i++) {
            if (!enrichedBusinesses[i].featured) {
              enrichedBusinesses[i].featured = true;
              featuredBusinesses.push(enrichedBusinesses[i]);
            }
          }
        }

        console.log(`[API] Marked ${featuredBusinesses.length} businesses as featured`);

        // Analyze the data for logging
        const categories: Record<string, number> = {};
        enrichedBusinesses.forEach(business => {
          const category = business.category || 'Uncategorized';
          categories[category] = (categories[category] || 0) + 1;
        });

        console.log(`[API] Returning ${enrichedBusinesses.length} businesses from external APIs`);
        console.log('[API] Business categories distribution:', categories);

        // Return the enriched data with detailed source information
        return NextResponse.json({
          businesses: enrichedBusinesses,
          source: 'external_apis',
          sourceDetails: {
            type: 'external_apis',
            count: enrichedBusinesses.length,
            categories,
            dataAge: 'fresh'
          },
          timestamp: new Date().toISOString()
        });
      } catch (refreshError) {
        console.error('[API_ERROR] Error refreshing business data:', refreshError);

        if (refreshError instanceof Error) {
          console.error('[API_ERROR] Detailed refresh error:', {
            message: refreshError.message,
            name: refreshError.name,
            stack: refreshError.stack
          });
        }

        console.log('[API] Continuing to fallback options after refresh error');
        // Continue to fallback options instead of failing
      }
    }

    // Try to fetch from database first
    try {
      const dbBusinesses = await prisma.business.findMany({
        where: {
          address: {
            contains: zipCode
          }
        },
        take: limit
      });

      if (dbBusinesses.length > 0) {
        // Map database records to Business type
        enrichedBusinesses = dbBusinesses.map(db => ({
          id: db.id,
          name: db.name,
          description: db.description || '',
          category: db.category || 'Services',
          subcategory: db.subcategory || undefined,
          address: db.address || '',
          phone: db.phone || '',
          email: db.email || undefined,
          website: db.website || undefined,
          hours: db.hours || undefined,
          founded: db.founded || undefined,
          employees: db.employees || undefined,
          featured: db.featured || false,
          image: db.image || undefined,
          services: db.services as string[] || undefined,
          products: db.products as string[] || undefined,
          tags: db.tags as string[] || undefined,
          socialMedia: db.socialMedia as any || undefined,
          coordinates: db.latitude && db.longitude
            ? { lat: db.latitude, lng: db.longitude }
            : undefined,
          // License data fields
          licenseStatus: undefined,
          licenseType: undefined,
          licenseNumber: undefined,
          firstIssueDate: undefined,
          locationName: undefined,
          businessName: undefined,
          locationAddress: undefined,
          businessAddress: undefined,
          sourceData: {}
        }));

        // Ensure we have featured businesses by marking some as featured
        // This ensures the featured section doesn't disappear after refresh

        // Get current featured businesses
        let featuredBusinesses = enrichedBusinesses.filter(b => b.featured);

        // Determine target count - either 3 or 6 for balanced grid layout
        let targetCount = 3;
        if (featuredBusinesses.length > 3 && featuredBusinesses.length < 6) {
          targetCount = 6;
        }

        // If we have between 4-5 featured businesses, aim for 6
        if (featuredBusinesses.length >= 4 && featuredBusinesses.length < 6) {
          // Add more featured businesses to reach 6
          for (let i = 0; i < enrichedBusinesses.length && featuredBusinesses.length < 6; i++) {
            if (!enrichedBusinesses[i].featured) {
              enrichedBusinesses[i].featured = true;
              featuredBusinesses.push(enrichedBusinesses[i]);
            }
          }
        }
        // If we have less than 3, ensure we have at least 3
        else if (featuredBusinesses.length < 3) {
          // Add more featured businesses to reach 3
          for (let i = 0; i < enrichedBusinesses.length && featuredBusinesses.length < 3; i++) {
            if (!enrichedBusinesses[i].featured) {
              enrichedBusinesses[i].featured = true;
              featuredBusinesses.push(enrichedBusinesses[i]);
            }
          }
        }

        console.log(`[API] Database has ${featuredBusinesses.length} featured businesses`);

        // Analyze the data for logging
        const categories: Record<string, number> = {};
        enrichedBusinesses.forEach(business => {
          const category = business.category || 'Uncategorized';
          categories[category] = (categories[category] || 0) + 1;
        });

        console.log(`[API] Returning ${enrichedBusinesses.length} businesses from database`);
        console.log('[API] Business categories distribution:', categories);

        return NextResponse.json({
          businesses: enrichedBusinesses,
          source: 'database',
          sourceDetails: {
            type: 'database',
            count: enrichedBusinesses.length,
            categories,
            dataAge: 'current'
          },
          timestamp: new Date().toISOString()
        });
      }
    } catch (dbError) {
      console.error('Error fetching from database:', dbError);
      // Continue to fallback options
    }

    // If no database records or database error, try to use enriched-businesses.ts if it exists
    try {
      // Import the enriched businesses data
      const enrichedBusinessesModule = await import('@/data/enriched-businesses');
      const cachedBusinesses = enrichedBusinessesModule.default;

      if (cachedBusinesses && cachedBusinesses.length > 0) {
        // Filter by ZIP code
        enrichedBusinesses = cachedBusinesses.filter(b =>
          b.address && b.address.includes(zipCode)
        ).slice(0, limit)
        .map(b => ({
          ...b,
          // Add license data fields if they don't exist
          licenseStatus: b.licenseStatus || undefined,
          licenseType: b.licenseType || undefined,
          licenseNumber: b.licenseNumber || undefined,
          firstIssueDate: b.firstIssueDate || undefined,
          locationName: b.locationName || undefined,
          businessName: b.businessName || undefined,
          locationAddress: b.locationAddress || undefined,
          businessAddress: b.businessAddress || undefined,
          sourceData: b.sourceData || {}
        }));

        // Ensure we have featured businesses by marking some as featured
        // This ensures the featured section doesn't disappear after refresh

        // Get current featured businesses
        let featuredBusinesses = enrichedBusinesses.filter(b => b.featured);

        // Determine target count - either 3 or 6 for balanced grid layout
        let targetCount = 3;
        if (featuredBusinesses.length > 3 && featuredBusinesses.length < 6) {
          targetCount = 6;
        }

        // If we have between 4-5 featured businesses, aim for 6
        if (featuredBusinesses.length >= 4 && featuredBusinesses.length < 6) {
          // Add more featured businesses to reach 6
          for (let i = 0; i < enrichedBusinesses.length && featuredBusinesses.length < 6; i++) {
            if (!enrichedBusinesses[i].featured) {
              enrichedBusinesses[i].featured = true;
              featuredBusinesses.push(enrichedBusinesses[i]);
            }
          }
        }
        // If we have less than 3, ensure we have at least 3
        else if (featuredBusinesses.length < 3) {
          // Add more featured businesses to reach 3
          for (let i = 0; i < enrichedBusinesses.length && featuredBusinesses.length < 3; i++) {
            if (!enrichedBusinesses[i].featured) {
              enrichedBusinesses[i].featured = true;
              featuredBusinesses.push(enrichedBusinesses[i]);
            }
          }
        }

        console.log(`[API] Cached file has ${featuredBusinesses.length} featured businesses`);

        // Analyze the data for logging
        const categories: Record<string, number> = {};
        enrichedBusinesses.forEach(business => {
          const category = business.category || 'Uncategorized';
          categories[category] = (categories[category] || 0) + 1;
        });

        console.log(`[API] Returning ${enrichedBusinesses.length} businesses from cached file`);
        console.log('[API] Business categories distribution:', categories);

        return NextResponse.json({
          businesses: enrichedBusinesses,
          source: 'cached_file',
          sourceDetails: {
            type: 'cached_file',
            count: enrichedBusinesses.length,
            categories,
            dataAge: 'cached'
          },
          timestamp: new Date().toISOString()
        });
      }
    } catch (importError) {
      console.error('Error importing enriched businesses:', importError);
      // Continue to fallback options
    }

    // If all else fails, use the static businesses data
    enrichedBusinesses = businesses
      .filter(b => b.address.includes(zipCode))
      .slice(0, limit)
      .map(b => ({
        ...b,
        // Add license data fields if they don't exist
        licenseStatus: b.licenseStatus || undefined,
        licenseType: b.licenseType || undefined,
        licenseNumber: b.licenseNumber || undefined,
        firstIssueDate: b.firstIssueDate || undefined,
        locationName: b.locationName || undefined,
        businessName: b.businessName || undefined,
        locationAddress: b.locationAddress || undefined,
        businessAddress: b.businessAddress || undefined,
        sourceData: b.sourceData || {}
      }));

    // Ensure we have featured businesses by marking some as featured
    // This ensures the featured section doesn't disappear after refresh

    // Get current featured businesses
    let featuredBusinesses = enrichedBusinesses.filter(b => b.featured);

    // Determine target count - either 3 or 6 for balanced grid layout
    let targetCount = 3;
    if (featuredBusinesses.length > 3 && featuredBusinesses.length < 6) {
      targetCount = 6;
    }

    // If we have between 4-5 featured businesses, aim for 6
    if (featuredBusinesses.length >= 4 && featuredBusinesses.length < 6) {
      // Add more featured businesses to reach 6
      for (let i = 0; i < enrichedBusinesses.length && featuredBusinesses.length < 6; i++) {
        if (!enrichedBusinesses[i].featured) {
          enrichedBusinesses[i].featured = true;
          featuredBusinesses.push(enrichedBusinesses[i]);
        }
      }
    }
    // If we have less than 3, ensure we have at least 3
    else if (featuredBusinesses.length < 3) {
      // Add more featured businesses to reach 3
      for (let i = 0; i < enrichedBusinesses.length && featuredBusinesses.length < 3; i++) {
        if (!enrichedBusinesses[i].featured) {
          enrichedBusinesses[i].featured = true;
          featuredBusinesses.push(enrichedBusinesses[i]);
        }
      }
    }

    console.log(`[API] Static data has ${featuredBusinesses.length} featured businesses`);

    // Analyze the data for logging
    const categories: Record<string, number> = {};
    enrichedBusinesses.forEach(business => {
      const category = business.category || 'Uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });

    console.log(`[API] Returning ${enrichedBusinesses.length} businesses from static data`);
    console.log('[API] Business categories distribution:', categories);

    return NextResponse.json({
      businesses: enrichedBusinesses,
      source: 'static_data',
      sourceDetails: {
        type: 'static_data',
        count: enrichedBusinesses.length,
        categories,
        dataAge: 'static'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[API_ERROR] Fatal error in enriched businesses API:', error);

    if (error instanceof Error) {
      console.error('[API_ERROR] Detailed error information:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        cause: error.cause
      });
    }

    // Log request information for debugging
    console.error('[API_ERROR] Request information:', {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      params: Object.fromEntries(request.nextUrl.searchParams.entries())
    });

    // Return a more informative error response
    return NextResponse.json(
      {
        error: 'Failed to fetch enriched business data',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        // Include fallback data to prevent client-side errors
        businesses: [],
        source: 'error_fallback',
        sourceDetails: {
          type: 'error_fallback',
          count: 0,
          categories: {},
          dataAge: 'error'
        }
      },
      { status: 500 }
    );
  }
}
