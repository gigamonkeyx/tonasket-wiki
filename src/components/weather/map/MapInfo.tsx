'use client';

import React from 'react';

interface MapInfoProps {
  location: string;
  lastUpdated: Date;
  className?: string;
}

/**
 * A component that displays information about the map
 */
export default function MapInfo({ location, lastUpdated, className }: MapInfoProps) {
  return (
    <div className={`flex justify-between items-center text-sm ${className}`}>
      <div className="font-medium">{location}</div>
      <div className="text-gray-500">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
}
