import React from 'react';
import Link from 'next/link';
import CurrentWeather from '@/components/weather/CurrentWeather';
import Forecast from '@/components/weather/Forecast';
import AgriculturalWeather from '@/components/weather/AgriculturalWeather';
import WeatherMap from '@/components/weather/WeatherMap';

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Weather Forecast</h1>
          <p className="text-xl max-w-3xl">
            Current conditions and forecast for Tonasket and Okanogan County.
          </p>
        </div>
      </div>

      {/* Current Weather */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Current Weather in Tonasket</h2>
          <CurrentWeather />
        </div>

        {/* 7-Day Forecast */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">7-Day Forecast</h2>
          <Forecast days={7} />
        </div>

        {/* Weather Map */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Weather Map</h2>
          <WeatherMap />
        </div>

        {/* Agricultural Weather */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Agricultural Weather Information</h2>
          <p className="text-black mb-4">
            Specialized weather information for agricultural purposes in the Tonasket area.
          </p>
          <AgriculturalWeather />
        </div>
      </div>
    </div>
  );
}
