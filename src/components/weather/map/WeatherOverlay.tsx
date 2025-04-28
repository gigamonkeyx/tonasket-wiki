'use client';

import React from 'react';

type WeatherType = 'temperature' | 'precipitation' | 'wind' | 'radar' | 'satellite';

interface WeatherOverlayProps {
  type: WeatherType;
  className?: string;
}

/**
 * A component that displays weather data overlays on top of a map
 */
export default function WeatherOverlay({ type, className }: WeatherOverlayProps) {
  // Function to get the appropriate overlay content based on the type
  const getOverlayContent = () => {
    switch (type) {
      case 'temperature':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-400 to-red-500 opacity-30 mix-blend-overlay pointer-events-none">
            {/* Temperature Indicators */}
            <div className="absolute top-1/4 left-1/4 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-white text-xs font-bold">45°F</span>
            </div>
            <div className="absolute top-1/3 right-1/3 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-white text-xs font-bold">62°F</span>
            </div>
            <div className="absolute bottom-1/4 left-1/2 bg-red-500 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-white text-xs font-bold">78°F</span>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full w-16 h-16 flex items-center justify-center border-2 border-white">
              <span className="text-white text-sm font-bold">72°F</span>
            </div>
          </div>
        );
      case 'precipitation':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-600 opacity-30 mix-blend-overlay pointer-events-none">
            {/* Rain Indicators */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16">
              <div className="absolute inset-0 flex flex-wrap">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-2 h-4 bg-blue-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
            <div className="absolute top-1/3 right-1/3 w-16 h-16">
              <div className="absolute inset-0 flex flex-wrap">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-4 bg-blue-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-1/4 left-1/2 w-16 h-16">
              <div className="absolute inset-0 flex flex-wrap">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2 h-4 bg-blue-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center border-2 border-white">
              <span className="text-white text-sm font-bold">0.1 in</span>
            </div>
          </div>
        );
      case 'wind':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-teal-100 via-teal-300 to-teal-500 opacity-30 mix-blend-overlay pointer-events-none">
            {/* Wind Indicators */}
            <div className="absolute top-1/4 left-1/4">
              <div className="w-12 h-2 bg-teal-600 transform rotate-45"></div>
              <div className="w-0 h-0 border-t-8 border-r-8 border-t-transparent border-r-teal-600 transform rotate-45 -translate-y-1"></div>
            </div>
            <div className="absolute top-1/3 right-1/3">
              <div className="w-12 h-2 bg-teal-600 transform -rotate-45"></div>
              <div className="w-0 h-0 border-t-8 border-r-8 border-t-transparent border-r-teal-600 transform -rotate-45 -translate-y-1"></div>
            </div>
            <div className="absolute bottom-1/4 left-1/2">
              <div className="w-12 h-2 bg-teal-600 transform rotate-90"></div>
              <div className="w-0 h-0 border-t-8 border-r-8 border-t-transparent border-r-teal-600 transform rotate-90 -translate-y-1"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-600 rounded-full w-16 h-16 flex items-center justify-center border-2 border-white">
              <span className="text-white text-sm font-bold">8 mph NW</span>
            </div>
          </div>
        );
      case 'radar':
        return (
          <div className="absolute inset-0 pointer-events-none">
            {/* Radar Indicators */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-96 h-96 rounded-full border-2 border-green-500 opacity-20 animate-ping-slow"></div>
              <div className="w-64 h-64 rounded-full border-2 border-green-500 opacity-30 animate-ping-slow animation-delay-500"></div>
              <div className="w-32 h-32 rounded-full border-2 border-green-500 opacity-40 animate-ping-slow animation-delay-1000"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center border-2 border-white">
                  <span className="text-white text-xs font-bold">Clear</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'satellite':
        return (
          <div className="absolute inset-0 pointer-events-none">
            {/* Cloud Patterns */}
            <div className="absolute top-1/4 left-1/4 w-32 h-16 bg-white rounded-full opacity-30"></div>
            <div className="absolute top-1/3 right-1/4 w-48 h-24 bg-white rounded-full opacity-40"></div>
            <div className="absolute bottom-1/4 left-1/3 w-40 h-20 bg-white rounded-full opacity-35"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center border-2 border-white">
              <span className="text-white text-xs font-bold">Clear Sky</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {getOverlayContent()}
      <div className="absolute top-2 right-2 bg-white bg-opacity-80 p-2 rounded shadow text-sm z-20">
        {type.charAt(0).toUpperCase() + type.slice(1)} View
      </div>
    </div>
  );
}
