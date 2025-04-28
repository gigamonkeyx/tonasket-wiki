import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tradeImpact = await prisma.tradeImpactData.findMany({
      orderBy: {
        date: 'desc'
      }
    });
    
    return NextResponse.json(tradeImpact);
  } catch (error) {
    console.error('Error fetching trade impact data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trade impact data' },
      { status: 500 }
    );
  }
}
