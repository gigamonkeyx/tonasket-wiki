import { NextRequest, NextResponse } from 'next/server';
import { datasetSources } from '@/data/research';

/**
 * GET /api/research/sources
 * Get all dataset sources
 */
export async function GET(request: NextRequest) {
  try {
    const sources = datasetSources;
    return NextResponse.json(sources);
  } catch (error) {
    console.error('Error fetching sources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sources' },
      { status: 500 }
    );
  }
}
