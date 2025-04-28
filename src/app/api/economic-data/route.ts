import { NextResponse } from 'next/server';
import { prisma } from '@/lib/mock-prisma';

export async function GET() {
  try {
    const economicData = await prisma.economicData.findMany({
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json(economicData);
  } catch (error) {
    console.error('Error fetching economic data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch economic data' },
      { status: 500 }
    );
  }
}
