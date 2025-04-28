import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const weather = await prisma.weatherData.findMany({
      orderBy: {
        date: 'desc'
      },
      take: 7 // Get the last 7 days
    });
    
    return NextResponse.json(weather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
