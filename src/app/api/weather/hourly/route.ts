import { NextRequest, NextResponse } from 'next/server';
import weatherService from '@/services/weatherService';

/**
 * GET /api/weather/hourly
 * Get hourly weather data for Tonasket
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hours = parseInt(searchParams.get('hours') || '24', 10);
    
    const hourlyData = await weatherService.getHourlyWeather(hours);
    return NextResponse.json(hourlyData);
  } catch (error) {
    console.error('Hourly weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hourly weather data' },
      { status: 500 }
    );
  }
}
