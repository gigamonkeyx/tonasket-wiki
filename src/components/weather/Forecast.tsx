'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ForecastProps {
  days?: number;
  className?: string;
}

interface ForecastDay {
  date: string;
  dateISO: string;
  tempHigh: number;
  tempLow: number;
  precipitation: number;
  precipitationHours: number;
  windSpeed: number;
  weatherDescription: string;
  weatherIcon: string;
}

export default function Forecast({ days = 7, className }: ForecastProps) {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/weather/forecast?days=${days}`);

        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }

        const data = await response.json();

        // Transform the data if it has a nested structure
        if (data.daily || data.forecast?.forecastday) {
          let transformedData: ForecastDay[] = [];

          if (data.daily) {
            // Handle Open-Meteo API format
            const dailyData = data.daily;
            const dates = dailyData.time || [];

            transformedData = dates.map((date: string, index: number) => ({
              date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
              dateISO: date,
              tempHigh: dailyData.temperature_2m_max?.[index] || 0,
              tempLow: dailyData.temperature_2m_min?.[index] || 0,
              precipitation: dailyData.precipitation_sum?.[index] || 0,
              precipitationHours: dailyData.precipitation_hours?.[index] || 0,
              windSpeed: dailyData.windspeed_10m_max?.[index] || 0,
              weatherDescription: getWeatherDescription(dailyData.weathercode?.[index] || 0),
              weatherIcon: getWeatherIconFromCode(dailyData.weathercode?.[index] || 0)
            }));
          } else if (data.forecast?.forecastday) {
            // Handle Weather API format
            transformedData = data.forecast.forecastday.map((day: any) => ({
              date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
              dateISO: day.date,
              tempHigh: day.day.maxtemp_f || 0,
              tempLow: day.day.mintemp_f || 0,
              precipitation: day.day.totalprecip_in || 0,
              precipitationHours: 0, // Not available in this API
              windSpeed: day.day.maxwind_mph || 0,
              weatherDescription: day.day.condition?.text || 'Unknown',
              weatherIcon: getWeatherIconFromCondition(day.day.condition?.text || '')
            }));
          }

          setForecast(transformedData);
        } else {
          // Assume the data is already in the expected format
          setForecast(data);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching forecast:', err);
        setError('Unable to load forecast data');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();

    // Refresh forecast data every 3 hours
    const intervalId = setInterval(fetchForecast, 3 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [days]);

  // Helper function to get weather description from code
  const getWeatherDescription = (code: number): string => {
    // WMO Weather interpretation codes (WW)
    // https://open-meteo.com/en/docs
    switch (code) {
      case 0: return 'Clear sky';
      case 1: return 'Mainly clear';
      case 2: return 'Partly cloudy';
      case 3: return 'Overcast';
      case 45: case 48: return 'Fog';
      case 51: case 53: case 55: return 'Drizzle';
      case 56: case 57: return 'Freezing Drizzle';
      case 61: case 63: case 65: return 'Rain';
      case 66: case 67: return 'Freezing Rain';
      case 71: case 73: case 75: return 'Snow';
      case 77: return 'Snow grains';
      case 80: case 81: case 82: return 'Rain showers';
      case 85: case 86: return 'Snow showers';
      case 95: return 'Thunderstorm';
      case 96: case 99: return 'Thunderstorm with hail';
      default: return 'Unknown';
    }
  };

  // Helper function to get weather icon from code
  const getWeatherIconFromCode = (code: number): string => {
    // WMO Weather interpretation codes (WW)
    switch (code) {
      case 0: return 'sun';
      case 1: return 'sun';
      case 2: return 'cloud-sun';
      case 3: return 'cloud';
      case 45: case 48: return 'fog';
      case 51: case 53: case 55: return 'cloud-rain';
      case 56: case 57: return 'cloud-rain';
      case 61: case 63: case 65: return 'cloud-rain';
      case 66: case 67: return 'cloud-rain';
      case 71: case 73: case 75: return 'cloud-snow';
      case 77: return 'cloud-snow';
      case 80: case 81: case 82: return 'cloud-rain';
      case 85: case 86: return 'cloud-snow';
      case 95: return 'cloud-lightning';
      case 96: case 99: return 'cloud-lightning';
      default: return 'cloud';
    }
  };

  // Helper function to get weather icon from condition text
  const getWeatherIconFromCondition = (condition: string): string => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return 'sun';
    if (lowerCondition.includes('partly cloudy')) return 'cloud-sun';
    if (lowerCondition.includes('cloud')) return 'cloud';
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return 'cloud-rain';
    if (lowerCondition.includes('snow') || lowerCondition.includes('sleet')) return 'cloud-snow';
    if (lowerCondition.includes('thunder') || lowerCondition.includes('lightning')) return 'cloud-lightning';
    if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return 'fog';
    return 'cloud';
  };

  // Function to get the appropriate weather icon
  const getWeatherIcon = (iconName: string) => {
    // This would be replaced with actual icon components or images
    switch (iconName) {
      case 'sun':
        return '☀️';
      case 'cloud-sun':
        return '⛅';
      case 'cloud':
        return '☁️';
      case 'cloud-rain':
        return '🌧️';
      case 'cloud-snow':
        return '❄️';
      case 'cloud-lightning':
        return '⚡';
      case 'fog':
        return '🌫️';
      default:
        return '🌡️';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{days}-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: days }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : forecast.length > 0 ? (
          <div className="space-y-4">
            {forecast.map((day, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                <div className="flex items-center gap-2">
                  <span>{getWeatherIcon(day.weatherIcon)}</span>
                  <span className="font-medium text-black">{day.date}</span>
                </div>
                <div className="text-sm font-medium text-black">{day.weatherDescription}</div>
                <div className="font-medium text-black">
                  {day.tempHigh}° / {day.tempLow}°
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No forecast data available</div>
        )}
      </CardContent>
    </Card>
  );
}
