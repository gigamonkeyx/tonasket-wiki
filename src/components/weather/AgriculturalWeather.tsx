'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AgriculturalWeatherProps {
  className?: string;
}

interface AgriculturalWeatherData {
  evapotranspiration: number;
  soilTemperature: {
    surface: number;
    depth6cm: number;
  };
  soilMoisture: {
    surface: number;
    depth1to3cm: number;
  };
  forecast: {
    today: {
      tempHigh: number;
      tempLow: number;
      precipitation: number;
    };
    tomorrow: {
      tempHigh: number;
      tempLow: number;
      precipitation: number;
    };
  };
  growingConditions: {
    overallConditions: string;
    frostRisk: string;
    droughtRisk: string;
    averageTemperature: number;
  };
}

export default function AgriculturalWeather({ className }: AgriculturalWeatherProps) {
  const [agWeather, setAgWeather] = useState<AgriculturalWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgriculturalWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/weather/agricultural');

        if (!response.ok) {
          throw new Error('Failed to fetch agricultural weather data');
        }

        const data = await response.json();

        // Transform the data if it has a nested structure
        if (data.daily || data.hourly) {
          // Handle Open-Meteo API format
          const transformedData: AgriculturalWeatherData = {
            evapotranspiration: data.daily?.et0_fao_evapotranspiration?.[0] || 0,
            soilTemperature: {
              surface: data.hourly?.soil_temperature_0cm?.[0] || 0,
              depth6cm: data.hourly?.soil_temperature_6cm?.[0] || 0
            },
            soilMoisture: {
              surface: data.hourly?.soil_moisture_0_1cm?.[0] || 0,
              depth1to3cm: data.hourly?.soil_moisture_1_3cm?.[0] || 0
            },
            forecast: {
              today: {
                tempHigh: data.daily?.temperature_2m_max?.[0] || 0,
                tempLow: data.daily?.temperature_2m_min?.[0] || 0,
                precipitation: data.daily?.precipitation_sum?.[0] || 0
              },
              tomorrow: {
                tempHigh: data.daily?.temperature_2m_max?.[1] || 0,
                tempLow: data.daily?.temperature_2m_min?.[1] || 0,
                precipitation: data.daily?.precipitation_sum?.[1] || 0
              }
            },
            growingConditions: calculateGrowingConditions(data)
          };

          setAgWeather(transformedData);
        } else {
          // Assume the data is already in the expected format
          setAgWeather(data);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching agricultural weather:', err);
        setError('Unable to load agricultural weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchAgriculturalWeather();

    // Refresh data every 2 hours
    const intervalId = setInterval(fetchAgriculturalWeather, 2 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Helper function to calculate growing conditions based on weather data
  const calculateGrowingConditions = (data: any) => {
    // Default values
    const conditions = {
      overallConditions: 'Fair',
      frostRisk: 'Low',
      droughtRisk: 'Low',
      averageTemperature: 0
    };

    if (!data.daily) return conditions;

    // Calculate average temperature
    const maxTemp = data.daily.temperature_2m_max?.[0] || 0;
    const minTemp = data.daily.temperature_2m_min?.[0] || 0;
    conditions.averageTemperature = (maxTemp + minTemp) / 2;

    // Determine frost risk
    if (minTemp < 32) {
      conditions.frostRisk = 'High';
    } else if (minTemp < 36) {
      conditions.frostRisk = 'Moderate';
    }

    // Determine drought risk based on precipitation
    const precipitation = data.daily.precipitation_sum?.[0] || 0;
    if (precipitation < 0.1 && maxTemp > 80) {
      conditions.droughtRisk = 'High';
    } else if (precipitation < 0.25) {
      conditions.droughtRisk = 'Moderate';
    }

    // Determine overall growing conditions
    if (conditions.frostRisk === 'High') {
      conditions.overallConditions = 'Poor - Too Cold';
    } else if (maxTemp > 95) {
      conditions.overallConditions = 'Poor - Too Hot';
    } else if (conditions.droughtRisk === 'High') {
      conditions.overallConditions = 'Poor - Too Dry';
    } else if (precipitation > 1.5) {
      conditions.overallConditions = 'Poor - Too Wet';
    } else if (conditions.averageTemperature > 60 && conditions.averageTemperature < 85 && conditions.droughtRisk === 'Low') {
      conditions.overallConditions = 'Excellent';
    }

    return conditions;
  };

  // Function to get color for condition
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent':
        return 'text-green-600';
      case 'Fair':
        return 'text-yellow-600';
      case 'Poor - Too Cold':
      case 'Poor - Too Hot':
      case 'Poor - Too Wet':
      case 'Poor - Too Dry':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Function to get color for risk level
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600';
      case 'Moderate':
        return 'text-yellow-600';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Agricultural Weather</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 w-[220px]" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : agWeather ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-black">Growing Conditions</h3>
              <p className={`text-lg font-bold ${getConditionColor(agWeather.growingConditions.overallConditions)}`}>
                {agWeather.growingConditions.overallConditions}
              </p>
              <p className="font-medium text-black">Average Temperature: {agWeather.growingConditions.averageTemperature}°F</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-black">Frost Risk</h4>
                <p className={`font-bold ${getRiskColor(agWeather.growingConditions.frostRisk)}`}>
                  {agWeather.growingConditions.frostRisk}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-black">Drought Risk</h4>
                <p className={`font-bold ${getRiskColor(agWeather.growingConditions.droughtRisk)}`}>
                  {agWeather.growingConditions.droughtRisk}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-black">Soil Conditions</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-black">Surface Temperature</h4>
                  <p className="text-black">{agWeather.soilTemperature.surface.toFixed(1)}°F</p>
                </div>
                <div>
                  <h4 className="font-medium text-black">6cm Depth Temperature</h4>
                  <p className="text-black">{agWeather.soilTemperature.depth6cm.toFixed(1)}°F</p>
                </div>
                <div>
                  <h4 className="font-medium text-black">Surface Moisture</h4>
                  <p className="text-black">{(agWeather.soilMoisture.surface * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <h4 className="font-medium text-black">1-3cm Depth Moisture</h4>
                  <p className="text-black">{(agWeather.soilMoisture.depth1to3cm * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-black">Evapotranspiration</h3>
              <p className="text-black">{agWeather.evapotranspiration.toFixed(2)} inches</p>
              <p className="text-sm font-medium text-black">
                Reference ET₀ for well-watered grass (FAO-56)
              </p>
            </div>
          </div>
        ) : (
          <div>No agricultural weather data available</div>
        )}
      </CardContent>
    </Card>
  );
}
