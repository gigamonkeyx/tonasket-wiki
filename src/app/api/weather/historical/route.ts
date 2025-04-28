import { NextRequest, NextResponse } from 'next/server';
import weatherService from '@/services/weatherService';

/**
 * GET /api/weather/historical
 * Get historical weather data for Tonasket
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate parameters are required' },
        { status: 400 }
      );
    }
    
    const historicalData = await weatherService.getHistoricalWeather(startDate, endDate);
    return NextResponse.json(historicalData);
  } catch (error) {
    console.error('Historical weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical weather data' },
      { status: 500 }
    );
  }
}
