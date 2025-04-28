import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/license-data/businesses
 * 
 * Returns businesses from the license data cache.
 * 
 * Query parameters:
 * - id: Filter by business ID
 * - name: Filter by business name
 * - category: Filter by business category
 * - limit: Maximum number of businesses to return (default: 100)
 */
export async function GET(request: NextRequest) {
  try {
    const cachePath = path.join(process.cwd(), 'cache', 'license-data-cache.json');
    
    // Check if cache file exists
    if (!fs.existsSync(cachePath)) {
      return NextResponse.json(
        {
          error: 'License data cache does not exist.',
          message: 'Please refresh the license data first.',
          timestamp: new Date().toISOString(),
          businesses: []
        },
        { status: 404 }
      );
    }
    
    // Read cache file
    const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    const businesses = cacheData.businesses;
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    
    // Apply filters
    let filteredBusinesses = businesses;
    
    if (id) {
      filteredBusinesses = filteredBusinesses.filter(b => b.id === id);
    }
    
    if (name) {
      const nameRegex = new RegExp(name, 'i');
      filteredBusinesses = filteredBusinesses.filter(b => 
        nameRegex.test(b.name) || 
        (b.businessName && nameRegex.test(b.businessName)) || 
        (b.locationName && nameRegex.test(b.locationName))
      );
    }
    
    if (category) {
      filteredBusinesses = filteredBusinesses.filter(b => b.category === category);
    }
    
    // Apply limit
    filteredBusinesses = filteredBusinesses.slice(0, limit);
    
    // Return businesses
    return NextResponse.json({
      businesses: filteredBusinesses,
      count: filteredBusinesses.length,
      timestamp: cacheData.timestamp,
      filters: { id, name, category, limit }
    });
  } catch (error) {
    console.error('[LICENSE_DATA] Error getting businesses from license data cache:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to get businesses from license data cache',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        businesses: []
      },
      { status: 500 }
    );
  }
}
