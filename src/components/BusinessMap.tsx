'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Business } from '@/data/businesses';

interface BusinessMapProps {
  businesses: Business[];
  selectedBusinessId?: string;
  onBusinessSelect?: (businessId: string) => void;
  height?: string;
  width?: string;
  zoom?: number;
  center?: { lat: number; lng: number };
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const BusinessMap: React.FC<BusinessMapProps> = ({
  businesses,
  selectedBusinessId,
  onBusinessSelect,
  height = '400px',
  width = '100%',
  zoom = 13,
  center
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any>(null);

  // Default center coordinates for Tonasket, WA
  const defaultCenter = { lat: 48.7052, lng: -119.4395 };

  // Load Google Maps script
  useEffect(() => {
    // Skip if already loaded
    if (window.google?.maps || document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      setMapLoaded(true);
      return;
    }

    // Define the callback function
    window.initMap = () => {
      setMapLoaded(true);
    };

    // Create script element
    const script = document.createElement('script');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Append script to document
    document.head.appendChild(script);

    // Cleanup
    return () => {
      window.initMap = () => {};
      if (document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
        document.head.removeChild(document.querySelector('script[src*="maps.googleapis.com/maps/api"]')!);
      }
    };
  }, []);

  // Initialize map when script is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // Create map
    const mapCenter = center || getMapCenter(businesses) || defaultCenter;
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Create info window
    const newInfoWindow = new window.google.maps.InfoWindow();

    setMap(newMap);
    setInfoWindow(newInfoWindow);
  }, [mapLoaded, businesses, center, zoom]);

  // Add markers when map is created
  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: any[] = [];

    // Add markers for businesses with coordinates
    businesses.forEach(business => {
      if (!business.coordinates) return;

      const marker = new window.google.maps.Marker({
        position: business.coordinates,
        map: map,
        title: business.name,
        animation: business.id === selectedBusinessId ? 
          window.google.maps.Animation.BOUNCE : 
          null,
        icon: {
          url: business.featured ? 
            'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 
            'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });

      // Create info window content
      const contentString = `
        <div class="p-2 max-w-xs">
          <h3 class="font-semibold text-base mb-1">${business.name}</h3>
          <p class="text-sm text-gray-600 mb-1">${business.category}</p>
          <p class="text-sm mb-2">${business.address.split(',')[0]}</p>
          <a href="/businesses/${business.id}" class="text-blue-600 text-sm font-medium hover:underline">View Details</a>
        </div>
      `;

      // Add click listener
      marker.addListener('click', () => {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        
        if (onBusinessSelect) {
          onBusinessSelect(business.id);
        }
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // If a business is selected, center on it and open info window
    if (selectedBusinessId) {
      const selectedBusiness = businesses.find(b => b.id === selectedBusinessId);
      if (selectedBusiness?.coordinates) {
        map.setCenter(selectedBusiness.coordinates);
        map.setZoom(16);
        
        const selectedMarker = newMarkers.find(
          marker => marker.getTitle() === selectedBusiness.name
        );
        
        if (selectedMarker) {
          const contentString = `
            <div class="p-2 max-w-xs">
              <h3 class="font-semibold text-base mb-1">${selectedBusiness.name}</h3>
              <p class="text-sm text-gray-600 mb-1">${selectedBusiness.category}</p>
              <p class="text-sm mb-2">${selectedBusiness.address.split(',')[0]}</p>
              <a href="/businesses/${selectedBusiness.id}" class="text-blue-600 text-sm font-medium hover:underline">View Details</a>
            </div>
          `;
          
          infoWindow.setContent(contentString);
          infoWindow.open(map, selectedMarker);
        }
      }
    }

    // Cleanup
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, infoWindow, businesses, selectedBusinessId, onBusinessSelect]);

  // Calculate map center based on business coordinates
  function getMapCenter(businesses: Business[]) {
    const businessesWithCoords = businesses.filter(b => b.coordinates);
    
    if (businessesWithCoords.length === 0) return null;
    
    // If only one business, center on it
    if (businessesWithCoords.length === 1) {
      return businessesWithCoords[0].coordinates;
    }
    
    // Calculate the average of all coordinates
    const totalLat = businessesWithCoords.reduce((sum, b) => sum + b.coordinates!.lat, 0);
    const totalLng = businessesWithCoords.reduce((sum, b) => sum + b.coordinates!.lng, 0);
    
    return {
      lat: totalLat / businessesWithCoords.length,
      lng: totalLng / businessesWithCoords.length
    };
  }

  return (
    <div 
      ref={mapRef} 
      style={{ height, width }} 
      className="rounded-lg overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700"
      aria-label="Map showing business locations"
    >
      {!mapLoaded && (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default BusinessMap;
