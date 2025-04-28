'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface WeatherWidgetProps {
  className?: string;
}

interface CurrentWeatherData {
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  location: string;
}

export default function WeatherWidget({ className }: WeatherWidgetProps) {
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
        setWeather(data);
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
    <Link href="/weather" className="block">
      <Card className={`hover:bg-muted/50 transition-colors ${className}`}>
        <CardContent className="p-4">
          {loading ? (
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-[100px]" />
              <Skeleton className="h-8 w-[50px]" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">Weather unavailable</div>
          ) : weather ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getWeatherIcon(weather.weatherIcon)}</span>
                <span className="text-sm font-medium text-black">{weather.weatherDescription}</span>
              </div>
              <div className="text-xl font-bold text-black">{weather.temperature}°F</div>
            </div>
          ) : (
            <div className="text-sm text-black">Weather data unavailable</div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
