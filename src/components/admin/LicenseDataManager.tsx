'use client';

import React, { useState, useEffect } from 'react';
import { getLicenseDataCacheStatus, refreshLicenseData } from '@/services/licenseDataService';

export default function LicenseDataManager() {
  // State for API key
  const [apiKey, setApiKey] = useState('');
  const [zipCode, setZipCode] = useState('98855');
  const [limit, setLimit] = useState('100');
  const [activeOnly, setActiveOnly] = useState(false);

  // State for cache status
  const [cacheStatus, setCacheStatus] = useState<any>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  // State for refresh operation
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshResult, setRefreshResult] = useState<any>(null);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  // Load cache status on component mount
  useEffect(() => {
    loadCacheStatus();
  }, []);

  // Load API key from localStorage if available
  useEffect(() => {
    const savedApiKey = localStorage.getItem('admin_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Function to load cache status
  const loadCacheStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const status = await getLicenseDataCacheStatus();
      setCacheStatus(status);
    } catch (error) {
      console.error('Error loading cache status:', error);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  // Function to refresh license data
  const handleRefresh = async () => {
    if (!apiKey) {
      setRefreshError('API key is required');
      return;
    }

    // Save API key to localStorage
    localStorage.setItem('admin_api_key', apiKey);

    setIsRefreshing(true);
    setRefreshResult(null);
    setRefreshError(null);

    try {
      const result = await refreshLicenseData(
        apiKey,
        zipCode,
        parseInt(limit, 10),
        activeOnly
      );

      if (result.success) {
        setRefreshResult(result);
        // Reload cache status after successful refresh
        await loadCacheStatus();
      } else {
        setRefreshError(result.message);
      }
    } catch (error) {
      setRefreshError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">License Data Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage the license data cache for the business directory</p>
      </div>

      {/* Simple tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => {}}
              className="inline-block py-4 px-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
            >
              Status
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => {}}
              className="inline-block py-4 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Refresh
            </button>
          </li>
        </ul>
      </div>

      {/* Status content */}
      <div className="mb-6">
        {isLoadingStatus ? (
          <div className="space-y-4">
            <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {cacheStatus?.exists ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Cache Information</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    cacheStatus.cacheAge.days < 7
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {cacheStatus.cacheAge.days < 1
                      ? `${Math.round(cacheStatus.cacheAge.hours)} hours old`
                      : `${cacheStatus.cacheAge.days} days old`}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Last Updated</div>
                    <div className="text-lg">
                      {new Date(cacheStatus.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Businesses Cached</div>
                    <div className="text-lg">{cacheStatus.businessCount}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">ZIP Code</div>
                    <div className="text-lg">{cacheStatus.zipCode}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Cache Age</div>
                    <div className="space-y-1">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
                          style={{ width: `${Math.min(100, (cacheStatus.cacheAge.days / 30) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {cacheStatus.cacheAge.days < 1
                          ? `${Math.round(cacheStatus.cacheAge.hours)} hours`
                          : `${cacheStatus.cacheAge.days} days`}
                        {cacheStatus.cacheAge.days > 30 && " (Recommended: Refresh)"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-md border ${
                  cacheStatus.cacheAge.days > 30
                    ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                    : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                }`}>
                  <h4 className="text-sm font-semibold mb-1">
                    {cacheStatus.cacheAge.days > 30
                      ? "Cache is outdated"
                      : "Cache is up to date"}
                  </h4>
                  <p className="text-sm">
                    {cacheStatus.cacheAge.days > 30
                      ? "It's recommended to refresh the license data to ensure the most current information is available."
                      : "The license data cache is recent and should contain up-to-date information."}
                  </p>
                </div>
              </>
            ) : (
              <div className="p-4 rounded-md border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <h4 className="text-sm font-semibold mb-1">Cache not found</h4>
                <p className="text-sm">
                  No license data cache exists. Please refresh the license data to create a cache.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form for refreshing data */}
      <div className="mb-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your admin API key"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ZIP Code
              </label>
              <input
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="98855"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="limit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Limit
              </label>
              <input
                id="limit"
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="100"
                min="1"
                max="500"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="space-y-2 flex items-end">
              <div className="flex items-center h-10">
                <input
                  id="activeOnly"
                  type="checkbox"
                  checked={activeOnly}
                  onChange={(e) => setActiveOnly(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="activeOnly" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Active Businesses Only
                </label>
              </div>
            </div>
          </div>

          {refreshError && (
            <div className="p-4 rounded-md border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <h4 className="text-sm font-semibold mb-1">Error</h4>
              <p className="text-sm">{refreshError}</p>
            </div>
          )}

          {refreshResult && (
            <div className="p-4 rounded-md border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <h4 className="text-sm font-semibold mb-1">Success</h4>
              <div className="space-y-2">
                <p className="text-sm">{refreshResult.message}</p>
                {refreshResult.stats && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-center p-2 bg-green-100 dark:bg-green-900/40 rounded">
                      <div className="text-xs font-medium">Total</div>
                      <div className="text-lg">{refreshResult.stats.total}</div>
                    </div>
                    <div className="text-center p-2 bg-green-100 dark:bg-green-900/40 rounded">
                      <div className="text-xs font-medium">Success</div>
                      <div className="text-lg">{refreshResult.stats.success}</div>
                    </div>
                    <div className="text-center p-2 bg-red-100 dark:bg-red-900/40 rounded">
                      <div className="text-xs font-medium">Errors</div>
                      <div className="text-lg">{refreshResult.stats.error}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with buttons */}
      <div className="flex justify-between">
        <button
          onClick={loadCacheStatus}
          disabled={isLoadingStatus}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isLoadingStatus
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
          }`}
        >
          {isLoadingStatus ? 'Loading...' : 'Refresh Status'}
        </button>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing || !apiKey}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isRefreshing || !apiKey
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
          }`}
        >
          {isRefreshing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </>
          ) : (
            'Refresh License Data'
          )}
        </button>
      </div>
    </div>
  );
}
