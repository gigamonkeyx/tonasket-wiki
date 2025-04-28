'use client';

import React from 'react';

type WeatherType = 'temperature' | 'precipitation' | 'wind' | 'radar' | 'satellite';

interface MapControlsProps {
  activeType: WeatherType;
  onTypeChange: (type: WeatherType) => void;
  className?: string;
}

/**
 * A component that displays controls for the weather map
 */
export default function MapControls({ activeType, onTypeChange, className }: MapControlsProps) {
  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      <button
        className={`px-4 py-2 border rounded ${
          activeType === 'temperature' 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'border-gray-300 hover:bg-gray-50 text-black'
        }`}
        onClick={() => onTypeChange('temperature')}
      >
        Temperature
      </button>
      <button
        className={`px-4 py-2 border rounded ${
          activeType === 'precipitation' 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'border-gray-300 hover:bg-gray-50 text-black'
        }`}
        onClick={() => onTypeChange('precipitation')}
      >
        Precipitation
      </button>
      <button
        className={`px-4 py-2 border rounded ${
          activeType === 'wind' 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'border-gray-300 hover:bg-gray-50 text-black'
        }`}
        onClick={() => onTypeChange('wind')}
      >
        Wind
      </button>
      <button
        className={`px-4 py-2 border rounded ${
          activeType === 'radar' 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'border-gray-300 hover:bg-gray-50 text-black'
        }`}
        onClick={() => onTypeChange('radar')}
      >
        Radar
      </button>
      <button
        className={`px-4 py-2 border rounded ${
          activeType === 'satellite' 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'border-gray-300 hover:bg-gray-50 text-black'
        }`}
        onClick={() => onTypeChange('satellite')}
      >
        Satellite
      </button>
    </div>
  );
}
