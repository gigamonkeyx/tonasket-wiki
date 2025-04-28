import { NextRequest, NextResponse } from 'next/server';
import { getDatasetById, getCategoryById, getSourceById } from '@/data/research';

/**
 * GET /api/research/datasets/[id]
 * Get a specific dataset by ID
 */
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Properly await and destructure the params
    const { id } = context.params;

    // Get dataset by ID
    const dataset = getDatasetById(id);

    if (!dataset) {
      return NextResponse.json(
        { error: 'Dataset not found' },
        { status: 404 }
      );
    }

    // Get related category and source information
    const category = getCategoryById(dataset.categoryId);
    const source = getSourceById(dataset.sourceId);

    // Return dataset with additional information
    return NextResponse.json({
      ...dataset,
      category,
      source
    });
  } catch (error) {
    console.error('Error fetching dataset:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dataset' },
      { status: 500 }
    );
  }
}
