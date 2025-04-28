import { NextRequest, NextResponse } from 'next/server';
import { searchBusinessesByName, searchBusinessByUBI, searchBusinessesByLocation } from '@/services/businessEnrichment/sources/waLicenseLookup';

/**
 * GET /api/license-lookup
 *
 * Searches for businesses in the Washington State business license dataset.
 *
 * Query parameters:
 * - type: Search type (name, ubi, location)
 * - term: Search term
 * - limit: Maximum number of results to return (default: 20)
 * - activeOnly: Whether to include only active businesses (default: true)
 * - countyWide: Whether to search the entire county (default: false)
 * - includeCities: JSON string of cities to include in the search
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchType = searchParams.get('type') || 'name';
    const searchTerm = searchParams.get('term') || '';
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    // Default to active only unless explicitly set to false
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    // Parse county-wide and includeCities parameters
    const countyWide = searchParams.get('countyWide') === 'true';
    let includeCities = { tonasket: true };

    try {
      const includeCitiesParam = searchParams.get('includeCities');
      if (includeCitiesParam) {
        includeCities = JSON.parse(includeCitiesParam);
      }
    } catch (e) {
      console.error('[API] Error parsing includeCities parameter:', e);
    }

    if (!searchTerm) {
      return NextResponse.json(
        { error: 'Search term is required' },
        { status: 400 }
      );
    }

    console.log(`[API] License lookup request: type=${searchType}, term=${searchTerm}, limit=${limit}, activeOnly=${activeOnly}, countyWide=${countyWide}, includeCities=${JSON.stringify(includeCities)}`);

    let results;

    switch (searchType) {
      case 'name':
        results = await searchBusinessesByName(searchTerm, limit);
        break;
      case 'ubi':
        const business = await searchBusinessByUBI(searchTerm);
        results = business ? [business] : [];
        break;
      case 'location':
        results = await searchBusinessesByLocation(searchTerm, limit, activeOnly, countyWide, includeCities);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid search type. Must be one of: name, ubi, location' },
          { status: 400 }
        );
    }

    // Calculate statistics
    const activeCount = results.filter(b => b.licenseStatus === 'Active').length;
    const expiredCount = results.filter(b => b.licenseStatus === 'Expired').length;
    const otherCount = results.length - activeCount - expiredCount;

    // Add search metadata to each result
    const resultsWithMetadata = results.map(result => ({
      ...result,
      searchTerm,
      searchType
    }));

    console.log(`[API] License lookup found ${resultsWithMetadata.length} results (active: ${activeCount}, expired: ${expiredCount}, other: ${otherCount})`);

    return NextResponse.json({
      results: resultsWithMetadata,
      count: resultsWithMetadata.length,
      stats: {
        total: results.length,
        active: activeCount,
        expired: expiredCount,
        other: otherCount
      },
      query: { type: searchType, term: searchTerm, limit, activeOnly, countyWide, includeCities },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[API] License lookup error:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
