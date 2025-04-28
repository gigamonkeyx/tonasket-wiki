'use client';

import React from 'react';

type WeatherType = 'temperature' | 'precipitation' | 'wind' | 'radar' | 'satellite';

interface MapLegendProps {
  type: WeatherType;
  className?: string;
}

/**
 * A component that displays a legend for the weather map
 */
export default function MapLegend({ type, className }: MapLegendProps) {
  // Function to get the appropriate legend content based on the type
  const getLegendContent = () => {
    switch (type) {
      case 'temperature':
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold mb-1">Temperature (°F)</div>
            <div className="flex items-center">
              <div className="w-full h-4 bg-gradient-to-r from-blue-600 via-green-400 to-red-600 rounded"></div>
            </div>
            <div className="flex justify-between text-xs">
              <span>0°</span>
              <span>50°</span>
              <span>100°</span>
            </div>
          </div>
        );
      case 'precipitation':
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold mb-1">Precipitation (in/hr)</div>
            <div className="flex items-center">
              <div className="w-full h-4 bg-gradient-to-r from-blue-100 via-blue-400 to-blue-800 rounded"></div>
            </div>
            <div className="flex justify-between text-xs">
              <span>0</span>
              <span>0.5</span>
              <span>1+</span>
            </div>
          </div>
        );
      case 'wind':
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold mb-1">Wind Speed (mph)</div>
            <div className="flex items-center">
              <div className="w-full h-4 bg-gradient-to-r from-green-200 via-yellow-300 to-red-500 rounded"></div>
            </div>
            <div className="flex justify-between text-xs">
              <span>0</span>
              <span>25</span>
              <span>50+</span>
            </div>
          </div>
        );
      case 'radar':
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold mb-1">Radar Reflectivity (dBZ)</div>
            <div className="flex items-center">
              <div className="w-full h-4 bg-gradient-to-r from-blue-300 via-green-400 via-yellow-300 to-red-600 rounded"></div>
            </div>
            <div className="flex justify-between text-xs">
              <span>Light</span>
              <span>Moderate</span>
              <span>Heavy</span>
            </div>
          </div>
        );
      case 'satellite':
        return (
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold mb-1">Satellite Imagery</div>
            <div className="text-xs">High-resolution satellite view</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white bg-opacity-90 p-2 rounded shadow ${className}`}>
      {getLegendContent()}
    </div>
  );
}
