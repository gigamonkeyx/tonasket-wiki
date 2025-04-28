import { NextResponse } from 'next/server';

/**
 * GET /api/weather/current
 * Get current weather conditions for Tonasket
 */
export async function GET() {
  try {
    // Return mock weather data for development
    const mockWeatherData = {
      location: {
        name: "Tonasket",
        region: "Washington",
        country: "USA",
        lat: 48.7,
        lon: -119.44,
        timezone: "America/Los_Angeles"
      },
      current: {
        temp_c: 22.5,
        temp_f: 72.5,
        condition: {
          text: "Sunny",
          icon: "/images/weather/sunny.png",
          code: 1000
        },
        wind_mph: 5.6,
        wind_kph: 9.0,
        wind_dir: "NW",
        humidity: 45,
        feelslike_c: 23.1,
        feelslike_f: 73.6,
        uv: 6.0,
        air_quality: {
          "us-epa-index": 1,
          "gb-defra-index": 1
        }
      },
      forecast: {
        forecastday: [
          {
            date: new Date().toISOString().split('T')[0],
            day: {
              maxtemp_c: 28.5,
              maxtemp_f: 83.3,
              mintemp_c: 15.2,
              mintemp_f: 59.4,
              condition: {
                text: "Sunny",
                icon: "/images/weather/sunny.png",
                code: 1000
              },
              uv: 6.0
            }
          }
        ]
      },
      last_updated: new Date().toISOString(),
      source: "Mock Data"
    };

    return NextResponse.json(mockWeatherData);
  } catch (error) {
    console.error('Current weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch current weather data' },
      { status: 500 }
    );
  }
}
