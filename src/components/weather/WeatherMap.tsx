'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BasicMap,
  WeatherOverlay,
  MapControls,
  MapLegend,
  MapInfo,
  WeatherMapType
} from './map';

interface WeatherMapProps {
  className?: string;
}

export default function WeatherMap({ className }: WeatherMapProps) {
  const [mapType, setMapType] = useState<WeatherMapType>('radar');
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Tonasket coordinates
  const TONASKET_LAT = 48.7049;
  const TONASKET_LON = -119.4365;

  // Function to handle map type change
  const handleMapTypeChange = (type: WeatherMapType) => {
    setLoading(true);
    setMapType(type);
    // Simulate loading time
    setTimeout(() => setLoading(false), 500);
  };

  // Listen for escape key to exit full screen
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullScreen]);

  // Handle full screen change from the BasicMap component
  const handleFullScreenChange = (fullScreen: boolean) => {
    setIsFullScreen(fullScreen);
  };

  return (
    <Card className={`${className} ${isFullScreen ? 'z-50' : ''}`}>
      <CardHeader className={isFullScreen ? 'hidden' : ''}>
        <CardTitle>Weather Map</CardTitle>
      </CardHeader>
      <CardContent className={isFullScreen ? 'p-0' : ''}>
        <div className={`space-y-4 ${isFullScreen ? 'space-y-0' : ''}`}>
          {loading ? (
            <div className={`${isFullScreen ? 'h-screen' : 'h-96'} bg-gray-100 rounded flex items-center justify-center`}>
              <Skeleton className="h-full w-full rounded" />
            </div>
          ) : (
            <div className={`${isFullScreen ? 'h-screen' : 'h-96'} bg-gray-100 rounded overflow-hidden relative`}>
              <BasicMap
                latitude={TONASKET_LAT}
                longitude={TONASKET_LON}
                zoom={14}
                onFullScreenChange={handleFullScreenChange}
                weatherType={mapType}
              />
              <div className="absolute bottom-8 left-2 z-20">
                <MapLegend type={mapType} className="max-w-xs" />
              </div>
            </div>
          )}

          <div className={isFullScreen ? 'hidden' : ''}>
            <MapInfo
              location="Tonasket, WA"
              lastUpdated={new Date()}
            />
          </div>

          <div className={isFullScreen ? 'absolute bottom-2 left-0 right-0 z-30 flex justify-center' : ''}>
            <MapControls
              activeType={mapType}
              onTypeChange={handleMapTypeChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
