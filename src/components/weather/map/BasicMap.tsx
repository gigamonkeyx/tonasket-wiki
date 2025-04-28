'use client';

import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Layers } from 'lucide-react';
import type { WeatherMapType } from './index';

interface BasicMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  className?: string;
  onFullScreenChange?: (isFullScreen: boolean) => void;
  weatherType?: WeatherMapType;
}

/**
 * A simple Google Maps component that displays a map centered on the given coordinates
 */
export default function BasicMap({
  latitude,
  longitude,
  zoom,
  className,
  onFullScreenChange,
  weatherType = 'radar'
}: BasicMapProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    const newFullScreenState = !isFullScreen;
    setIsFullScreen(newFullScreenState);

    // Notify parent component if callback is provided
    if (onFullScreenChange) {
      onFullScreenChange(newFullScreenState);
    }
  };

  // Toggle map type
  const toggleMapType = () => {
    setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap');
  };

  // Listen for escape key to exit full screen
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
        if (onFullScreenChange) {
          onFullScreenChange(false);
        }
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullScreen, onFullScreenChange]);

  // Create the Google Maps URL with the appropriate parameters
  const getGoogleMapsUrl = () => {
    // Base URL for Google Maps embed
    const baseUrl = 'https://www.google.com/maps/embed/v1/view';

    // API key (this is a public key used by Google for demos, replace with your own for production)
    const apiKey = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';

    // Map parameters
    const params = new URLSearchParams({
      key: apiKey,
      center: `${latitude},${longitude}`,
      zoom: zoom.toString(),
      maptype: mapType,
    });

    return `${baseUrl}?${params.toString()}`;
  };

  // Function to render weather overlay based on type
  const renderWeatherOverlay = () => {
    switch (weatherType) {
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
              <div className="w-64 h-64 rounded-full border-2 border-green-500 opacity-30 animate-ping-slow" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-32 h-32 rounded-full border-2 border-green-500 opacity-40 animate-ping-slow" style={{ animationDelay: '1s' }}></div>
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
    <div className={`relative w-full h-full rounded overflow-hidden ${className} ${isFullScreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* Google Maps Embed */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={getGoogleMapsUrl()}
          title="Google Map of Tonasket, WA"
        ></iframe>
      </div>

      {/* Weather Overlay */}
      {renderWeatherOverlay()}

      {/* Map Controls */}
      <div className="absolute top-2 left-2 flex flex-col gap-2 z-30">
        {/* Full Screen Button */}
        <button
          onClick={toggleFullScreen}
          className="bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullScreen ? (
            <Minimize2 className="w-5 h-5 text-gray-700" />
          ) : (
            <Maximize2 className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* Map Type Toggle Button */}
        <button
          onClick={toggleMapType}
          className="bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          aria-label={`Switch to ${mapType === 'roadmap' ? 'satellite' : 'roadmap'} view`}
        >
          <Layers className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Weather Overlay Label */}
      <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-3 py-1 rounded shadow z-20">
        <span className="text-sm font-medium">{weatherType.charAt(0).toUpperCase() + weatherType.slice(1)} View</span>
      </div>
    </div>
  );
}
