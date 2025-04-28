'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CurrentWeatherProps {
  className?: string;
}

interface CurrentWeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  weatherDescription: string;
  weatherIcon: string;
  isDay: boolean;
  time: string;
  location: string;
}

export default function CurrentWeather({ className }: CurrentWeatherProps) {
  const [weather, setWeather] = useState<CurrentWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/weather/current');

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        // Transform the data if it has a nested structure
        if (data.current && data.location) {
          // Handle nested structure
          setWeather({
            temperature: data.current.temp_f || data.current.temperature || 0,
            windSpeed: data.current.wind_mph || data.current.windSpeed || 0,
            windDirection: data.current.wind_dir || data.current.windDirection || 0,
            weatherDescription: data.current.condition?.text || data.current.weatherDescription || 'Unknown',
            weatherIcon: data.current.condition?.icon || data.current.weatherIcon || 'sun',
            isDay: data.current.is_day === 1 || data.current.isDay || false,
            time: data.current.last_updated || data.current.time || new Date().toLocaleTimeString(),
            location: data.location.name || 'Tonasket'
          });
        } else {
          // Assume the data is already in the expected format
          setWeather(data);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching current weather:', err);
        setError('Unable to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

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
        <CardTitle>Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : weather ? (
          <div className="space-y-2">
            <div className="text-sm font-medium text-black">{weather.location}</div>
            <div className="flex items-center gap-2">
              <span className="text-4xl">{getWeatherIcon(weather.weatherIcon)}</span>
              <span className="text-3xl font-bold text-black">{weather.temperature}°F</span>
            </div>
            <div className="text-lg font-medium text-black">{weather.weatherDescription}</div>
            <div className="text-sm font-medium text-black">
              Wind: {weather.windSpeed} mph
            </div>
            <div className="text-xs font-medium text-black">
              Last updated: {weather.time}
            </div>
          </div>
        ) : (
          <div>No weather data available</div>
        )}
      </CardContent>
    </Card>
  );
}
