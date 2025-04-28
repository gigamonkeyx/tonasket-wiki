import { NextResponse } from 'next/server';

/**
 * GET /api/weather/agricultural
 * Get agricultural weather data for Tonasket
 */
export async function GET() {
  try {
    // Create mock agricultural weather data
    const mockAgriculturalData = {
      evapotranspiration: 0.12,
      soilTemperature: {
        surface: 58.3,
        depth6cm: 55.7
      },
      soilMoisture: {
        surface: 0.32,
        depth1to3cm: 0.38
      },
      forecast: {
        today: {
          tempHigh: 68,
          tempLow: 42,
          precipitation: 0
        },
        tomorrow: {
          tempHigh: 65,
          tempLow: 40,
          precipitation: 0
        }
      },
      growingConditions: {
        overallConditions: "Fair",
        frostRisk: "Low",
        droughtRisk: "Moderate",
        averageTemperature: 55
      }
    };

    return NextResponse.json(mockAgriculturalData);
  } catch (error) {
    console.error('Agricultural weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agricultural weather data' },
      { status: 500 }
    );
  }
}
