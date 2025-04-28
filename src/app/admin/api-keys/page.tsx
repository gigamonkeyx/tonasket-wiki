'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ApiKeyManager from '@/components/admin/settings/ApiKeyManager';
import LicenseDataManager from '@/components/admin/LicenseDataManager';

export default function ApiKeysPage() {
  return (
    <AdminLayout
      title="API Keys Management"
      description="Manage API keys for external data sources"
    >
      <div className="space-y-8">
        {/* API Key Management */}
        <ApiKeyManager />

        {/* License Data Management */}
        <div className="mt-8 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">License Data Management</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Manage the license data cache for the business directory. This data is used to enrich business listings with official license information.
          </p>
          <LicenseDataManager />
        </div>

        {/* Documentation Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">API Documentation</h2>

          <div className="space-y-6">
            {/* Socrata API */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Washington State Business Lookup (Socrata)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                The Washington Department of Revenue Business Lookup dataset is available through the Socrata Open Data API.
                This API provides business registration and license information for businesses in Washington State.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Endpoint:</h4>
                <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm font-mono overflow-x-auto">
                  https://data.wa.gov/resource/7xux-kdpf.json
                </code>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://data.wa.gov/Business/Business-Lookup-Dataset-Washington-State-Department/7xux-kdpf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>View Dataset</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://data.wa.gov/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Get API Key</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://dev.socrata.com/docs/app-tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>API Documentation</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Open-Meteo API */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Open-Meteo Weather API</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Open-Meteo provides free weather data with no API key required for basic usage.
                This API is used for weather forecasts and historical weather data.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Endpoint:</h4>
                <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm font-mono overflow-x-auto">
                  https://api.open-meteo.com/v1/forecast
                </code>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Visit Website</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://open-meteo.com/en/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>API Documentation</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Google Maps API */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Google Maps API</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Google Maps API is used for displaying maps, geocoding, and location-based services.
                An API key is required for all Google Maps services.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Endpoint:</h4>
                <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm font-mono overflow-x-auto">
                  https://maps.googleapis.com/maps/api/js
                </code>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://developers.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Visit Website</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://developers.google.com/maps/documentation/javascript/get-api-key"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Get API Key</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Census Bureau API */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">US Census Bureau API</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                The Census Bureau API provides access to demographic and economic data from the US Census.
                An API key is required for all Census Bureau API requests.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Endpoint:</h4>
                <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm font-mono overflow-x-auto">
                  https://api.census.gov/data
                </code>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.census.gov/data/developers/data-sets.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Available Datasets</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://api.census.gov/data/key_signup.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Get API Key</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
