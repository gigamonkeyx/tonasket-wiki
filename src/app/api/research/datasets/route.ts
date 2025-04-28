import { NextRequest, NextResponse } from 'next/server';
import { datasets, searchDatasets, getDatasetsByCategory, getFeaturedDatasets } from '@/data/research';

/**
 * GET /api/research/datasets
 * Get research datasets with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const categoryId = searchParams.get('category');
    const featured = searchParams.get('featured');

    let filteredDatasets = [...datasets];

    // Apply search query if provided
    if (query) {
      filteredDatasets = searchDatasets(query);
    }

    // Filter by category if provided
    if (categoryId) {
      filteredDatasets = filteredDatasets.filter(dataset => dataset.categoryId === categoryId);
    }

    // Filter featured datasets if requested
    if (featured === 'true') {
      filteredDatasets = filteredDatasets.filter(dataset => dataset.featured);
    }

    return NextResponse.json(filteredDatasets);
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch datasets' },
      { status: 500 }
    );
  }
}
