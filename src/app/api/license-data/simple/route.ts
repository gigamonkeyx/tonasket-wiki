import { NextRequest, NextResponse } from 'next/server';
import { searchBusinessesByName, searchBusinessByUBI, searchBusinessesByLocation } from '@/services/businessEnrichment/sources/waLicenseLookup';

/**
 * GET /api/license-data/simple
 * 
 * Simple API endpoint for license data lookup.
 * 
 * Query parameters:
 * - name: Business name to search for
 * - ubi: UBI number to search for
 * - location: Location to search for
 * - limit: Maximum number of results to return (default: 10)
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');
    const ubi = searchParams.get('ubi');
    const location = searchParams.get('location');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    // Validate parameters
    if (!name && !ubi && !location) {
      return NextResponse.json(
        { 
          error: 'Missing search parameters', 
          message: 'Please provide at least one search parameter: name, ubi, or location' 
        },
        { status: 400 }
      );
    }
    
    // Perform search based on provided parameters
    let results = [];
    
    if (ubi) {
      console.log(`[LICENSE_API] Searching by UBI: ${ubi}`);
      const ubiResult = await searchBusinessByUBI(ubi);
      if (ubiResult) {
        results = [ubiResult];
      }
    } else if (name) {
      console.log(`[LICENSE_API] Searching by name: ${name}`);
      results = await searchBusinessesByName(name, limit);
    } else if (location) {
      console.log(`[LICENSE_API] Searching by location: ${location}`);
      results = await searchBusinessesByLocation(location, limit);
    }
    
    // Return results
    return NextResponse.json({
      results,
      count: results.length,
      query: { name, ubi, location, limit },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[LICENSE_API] Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to search license data', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
