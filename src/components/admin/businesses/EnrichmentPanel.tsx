'use client';

import React, { useState } from 'react';

const EnrichmentPanel: React.FC = () => {
  // State for enrichment options
  const [zipCode, setZipCode] = useState('98855');
  const [limit, setLimit] = useState('100');
  const [dataSources, setDataSources] = useState({
    waState: true,
    googlePlaces: true,
    yelp: true,
    webScraping: true
  });
  
  // State for enrichment process
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichmentLogs, setEnrichmentLogs] = useState<string[]>([]);
  const [enrichmentStats, setEnrichmentStats] = useState<{
    total: number;
    enriched: number;
    errors: number;
    sources: Record<string, number>;
  } | null>(null);
  
  // Handle data source toggle
  const handleDataSourceToggle = (source: keyof typeof dataSources) => {
    setDataSources(prev => ({
      ...prev,
      [source]: !prev[source]
    }));
  };
  
  // Handle enrichment process
  const handleStartEnrichment = async () => {
    setIsEnriching(true);
    setEnrichmentLogs([]);
    setEnrichmentStats(null);
    
    // Add initial log
    addLog(`Starting business data enrichment for ZIP code ${zipCode} with limit ${limit}...`);
    
    // In a real implementation, this would call an API to start the enrichment process
    // For now, we'll simulate the process with timeouts
    
    // Simulate WA State API
    if (dataSources.waState) {
      await simulateApiCall('WA State Business Lookup API', 2000, 25);
    }
    
    // Simulate Google Places API
    if (dataSources.googlePlaces) {
      await simulateApiCall('Google Places API', 3000, 20);
    }
    
    // Simulate Yelp API
    if (dataSources.yelp) {
      await simulateApiCall('Yelp Fusion API', 2500, 18);
    }
    
    // Simulate Web Scraping
    if (dataSources.webScraping) {
      await simulateApiCall('Web Scraping', 4000, 15);
    }
    
    // Simulate data merging
    addLog('Merging data from all sources...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate saving to database
    addLog('Saving enriched data to database...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Set final stats
    const totalBusinesses = Math.min(parseInt(limit), 30);
    const enrichedBusinesses = Math.floor(totalBusinesses * 0.9);
    const errorBusinesses = totalBusinesses - enrichedBusinesses;
    
    setEnrichmentStats({
      total: totalBusinesses,
      enriched: enrichedBusinesses,
      errors: errorBusinesses,
      sources: {
        'WA State': dataSources.waState ? totalBusinesses : 0,
        'Google Places': dataSources.googlePlaces ? Math.floor(totalBusinesses * 0.8) : 0,
        'Yelp': dataSources.yelp ? Math.floor(totalBusinesses * 0.7) : 0,
        'Web Scraping': dataSources.webScraping ? Math.floor(totalBusinesses * 0.6) : 0
      }
    });
    
    addLog(`Enrichment process completed. Enriched ${enrichedBusinesses} of ${totalBusinesses} businesses.`);
    
    setIsEnriching(false);
  };
  
  // Simulate API call
  const simulateApiCall = async (apiName: string, duration: number, count: number) => {
    addLog(`Fetching data from ${apiName}...`);
    await new Promise(resolve => setTimeout(resolve, duration / 2));
    
    // Simulate progress
    for (let i = 1; i <= 5; i++) {
      addLog(`Processing batch ${i}/5 from ${apiName}...`);
      await new Promise(resolve => setTimeout(resolve, duration / 10));
    }
    
    addLog(`Found ${count} businesses from ${apiName}.`);
  };
  
  // Add log message
  const handleClearLogs = () => {
    setEnrichmentLogs([]);
    setEnrichmentStats(null);
  };
  
  // Add log message
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEnrichmentLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Business Data Enrichment</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Enrich business data from multiple sources to create comprehensive business profiles.
          This process fetches data from external APIs and merges it with existing business data.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrichment Options */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Enrichment Options</h4>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., 98855"
              />
            </div>
            
            <div>
              <label htmlFor="limit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Maximum Businesses
              </label>
              <input
                type="number"
                id="limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., 100"
                min="1"
                max="500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Sources
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="waState"
                    checked={dataSources.waState}
                    onChange={() => handleDataSourceToggle('waState')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="waState" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    WA State Business Lookup API
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="googlePlaces"
                    checked={dataSources.googlePlaces}
                    onChange={() => handleDataSourceToggle('googlePlaces')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="googlePlaces" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Google Places API
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="yelp"
                    checked={dataSources.yelp}
                    onChange={() => handleDataSourceToggle('yelp')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="yelp" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Yelp Fusion API
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="webScraping"
                    checked={dataSources.webScraping}
                    onChange={() => handleDataSourceToggle('webScraping')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="webScraping" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Web Scraping
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                onClick={handleStartEnrichment}
                disabled={isEnriching || (!dataSources.waState && !dataSources.googlePlaces && !dataSources.yelp && !dataSources.webScraping)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEnriching ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enriching Data...
                  </>
                ) : (
                  'Start Enrichment Process'
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Enrichment Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white">Enrichment Logs</h4>
            <button
              onClick={handleClearLogs}
              disabled={isEnriching || enrichmentLogs.length === 0}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Logs
            </button>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 h-64 overflow-y-auto font-mono text-xs">
            {enrichmentLogs.length > 0 ? (
              <div className="space-y-1">
                {enrichmentLogs.map((log, index) => (
                  <div key={index} className="text-gray-800 dark:text-gray-300">{log}</div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">
                Logs will appear here when you start the enrichment process.
              </div>
            )}
          </div>
          
          {/* Enrichment Stats */}
          {enrichmentStats && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Enrichment Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Businesses</div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{enrichmentStats.total}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Enriched</div>
                  <div className="text-lg font-medium text-green-600 dark:text-green-400">{enrichmentStats.enriched}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Errors</div>
                  <div className="text-lg font-medium text-red-600 dark:text-red-400">{enrichmentStats.errors}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                  <div className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    {Math.round((enrichmentStats.enriched / enrichmentStats.total) * 100)}%
                  </div>
                </div>
              </div>
              
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mt-4 mb-2">Data Sources</h5>
              <div className="space-y-2">
                {Object.entries(enrichmentStats.sources).map(([source, count]) => (
                  count > 0 && (
                    <div key={source} className="flex justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{source}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{count} businesses</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrichmentPanel;
