'use client';

import React, { useState } from 'react';

export default function LicenseTestPage() {
  const [limit, setLimit] = useState('20');
  const [includeExpired, setIncludeExpired] = useState(false);
  const [countyWide, setCountyWide] = useState(false);
  const [includeCities, setIncludeCities] = useState({
    tonasket: true,
    okanogan: false,
    omak: false,
    brewster: false,
    twisp: false,
    winthrop: false
  });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setStats(null);

    try {
      // Determine the location term based on selected cities
      let locationTerm = 'Okanogan County';

      if (!countyWide) {
        // If not county-wide, use the first selected city
        const selectedCities = Object.entries(includeCities)
          .filter(([_, isSelected]) => isSelected)
          .map(([city]) => city);

        if (selectedCities.length > 0) {
          // Capitalize the first letter of the city name
          locationTerm = selectedCities[0].charAt(0).toUpperCase() + selectedCities[0].slice(1);
        } else {
          // Default to Tonasket if no cities are selected
          locationTerm = 'Tonasket';
          // Also update the includeCities state to reflect this
          setIncludeCities({...includeCities, tonasket: true});
        }
      }

      // Use the API endpoint instead of direct function call
      const params = new URLSearchParams({
        type: 'location',
        term: locationTerm,
        limit: limit,
        activeOnly: (!includeExpired).toString(),
        countyWide: countyWide.toString(),
        includeCities: JSON.stringify(includeCities)
      });

      const response = await fetch(`/api/license-lookup?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to fetch data');
      }

      setResults(data.results || []);
      setStats(data.stats || {
        total: data.results?.length || 0,
        active: 0,
        expired: 0,
        other: 0
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Okanogan County Business License Lookup</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label htmlFor="limit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Result Limit
            </label>
            <input
              id="limit"
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              min="1"
              max="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="space-y-2 flex items-end">
            <div className="flex items-center h-10">
              <input
                id="includeExpired"
                type="checkbox"
                checked={includeExpired}
                onChange={(e) => setIncludeExpired(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeExpired" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Include Expired Businesses
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Cities to Include in Search</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex items-center">
              <input
                id="countyWide"
                type="checkbox"
                checked={countyWide}
                onChange={(e) => {
                  setCountyWide(e.target.checked);
                  if (e.target.checked) {
                    // If county-wide is checked, check all cities
                    setIncludeCities({
                      tonasket: true,
                      okanogan: true,
                      omak: true,
                      brewster: true,
                      twisp: true,
                      winthrop: true
                    });
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="countyWide" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                County-Wide (All Cities)
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="includeTonasket"
                type="checkbox"
                checked={includeCities.tonasket}
                onChange={(e) => setIncludeCities({...includeCities, tonasket: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeTonasket" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Tonasket
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="includeOkanogan"
                type="checkbox"
                checked={includeCities.okanogan}
                onChange={(e) => setIncludeCities({...includeCities, okanogan: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeOkanogan" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Okanogan
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="includeOmak"
                type="checkbox"
                checked={includeCities.omak}
                onChange={(e) => setIncludeCities({...includeCities, omak: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeOmak" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Omak
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="includeBrewster"
                type="checkbox"
                checked={includeCities.brewster}
                onChange={(e) => setIncludeCities({...includeCities, brewster: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeBrewster" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Brewster
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="includeTwisp"
                type="checkbox"
                checked={includeCities.twisp}
                onChange={(e) => setIncludeCities({...includeCities, twisp: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeTwisp" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Twisp
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="includeWinthrop"
                type="checkbox"
                checked={includeCities.winthrop}
                onChange={(e) => setIncludeCities({...includeCities, winthrop: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeWinthrop" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Winthrop
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            loading
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
          }`}
        >
          {loading ? 'Searching...' : 'Search Business Licenses'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <h3 className="text-lg font-medium">Error</h3>
          <p>{error}</p>
        </div>
      )}

      {stats && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Results Summary</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">{stats.active}</div>
              <div className="text-sm text-green-600 dark:text-green-500">Active</div>
            </div>
            <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-red-700 dark:text-red-400">{stats.expired}</div>
              <div className="text-sm text-red-600 dark:text-red-500">Expired</div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{stats.other}</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-500">Other</div>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Search Results ({results.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Business Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    License Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    License Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    First Issued
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {results.map((business, index) => (
                  <tr key={business.id || index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {business.name}
                      {business.locationName && business.locationName !== business.name && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          DBA: {business.locationName}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        business.licenseStatus === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : business.licenseStatus === 'Expired'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {business.licenseStatus || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {business.licenseType || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {business.address || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {business.firstIssueDate || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
