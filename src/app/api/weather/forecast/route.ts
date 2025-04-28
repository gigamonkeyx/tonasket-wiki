import { NextResponse } from 'next/server';

/**
 * GET /api/weather/forecast
 * Get weather forecast for Tonasket
 */
export async function GET() {
  try {
    // Create mock forecast data
    const mockForecastData = [
      {
        date: "Mon, Oct 16",
        dateISO: "2023-10-16",
        tempHigh: 68,
        tempLow: 42,
        precipitation: 0,
        precipitationHours: 0,
        windSpeed: 8,
        weatherDescription: "Sunny",
        weatherIcon: "sun"
      },
      {
        date: "Tue, Oct 17",
        dateISO: "2023-10-17",
        tempHigh: 65,
        tempLow: 40,
        precipitation: 0,
        precipitationHours: 0,
        windSpeed: 6,
        weatherDescription: "Partly cloudy",
        weatherIcon: "cloud-sun"
      },
      {
        date: "Wed, Oct 18",
        dateISO: "2023-10-18",
        tempHigh: 62,
        tempLow: 38,
        precipitation: 0.1,
        precipitationHours: 2,
        windSpeed: 10,
        weatherDescription: "Cloudy with light rain",
        weatherIcon: "cloud-rain"
      },
      {
        date: "Thu, Oct 19",
        dateISO: "2023-10-19",
        tempHigh: 58,
        tempLow: 36,
        precipitation: 0.2,
        precipitationHours: 4,
        windSpeed: 12,
        weatherDescription: "Rain showers",
        weatherIcon: "cloud-rain"
      },
      {
        date: "Fri, Oct 20",
        dateISO: "2023-10-20",
        tempHigh: 55,
        tempLow: 34,
        precipitation: 0,
        precipitationHours: 0,
        windSpeed: 8,
        weatherDescription: "Partly cloudy",
        weatherIcon: "cloud-sun"
      },
      {
        date: "Sat, Oct 21",
        dateISO: "2023-10-21",
        tempHigh: 60,
        tempLow: 35,
        precipitation: 0,
        precipitationHours: 0,
        windSpeed: 5,
        weatherDescription: "Sunny",
        weatherIcon: "sun"
      },
      {
        date: "Sun, Oct 22",
        dateISO: "2023-10-22",
        tempHigh: 63,
        tempLow: 38,
        precipitation: 0,
        precipitationHours: 0,
        windSpeed: 7,
        weatherDescription: "Sunny",
        weatherIcon: "sun"
      }
    ];

    return NextResponse.json(mockForecastData);
  } catch (error) {
    console.error('Forecast API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forecast data' },
      { status: 500 }
    );
  }
}
