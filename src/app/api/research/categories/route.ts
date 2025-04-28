import { NextRequest, NextResponse } from 'next/server';
import { getCategoriesWithCounts } from '@/data/research';

/**
 * GET /api/research/categories
 * Get research dataset categories with counts
 */
export async function GET(request: NextRequest) {
  try {
    const categories = getCategoriesWithCounts();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
