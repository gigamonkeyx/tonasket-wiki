'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import economicDataService from '@/services/economicDataService';

// Dynamically import the components with no SSR to avoid hydration issues
const EconomicIndicatorsChart = dynamic(() => import('@/components/EconomicIndicatorsChart'), { ssr: false });
const DataComparisonTool = dynamic(() => import('@/components/DataComparisonTool'), { ssr: false });
const EconomicDashboard = dynamic(() => import('@/components/EconomicDashboard'), { ssr: false });

export default function EconomicDataPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(
    tabParam === 'indicators' ? 'indicators' :
    tabParam === 'comparison' ? 'comparison' :
    'overview'
  );
  const [economicData, setEconomicData] = useState<any>({
    unemployment: null,
    laborForce: null,
    homeValue: null,
    homeownership: null,
    rent: null
  });

  useEffect(() => {
    const fetchEconomicData = async () => {
      try {
        setLoading(true);

        // Fetch specific economic data points
        const [unemployment, laborForce, homeValue, homeownership, rent] = await Promise.all([
          economicDataService.getLatestEconomicDataByTitle('Unemployment Rate'),
          economicDataService.getLatestEconomicDataByTitle('Labor Force Participation'),
          economicDataService.getLatestEconomicDataByTitle('Median Home Value'),
          economicDataService.getLatestEconomicDataByTitle('Homeownership Rate'),
          economicDataService.getLatestEconomicDataByTitle('Median Rent')
        ]);

        setEconomicData({
          unemployment,
          laborForce,
          homeValue,
          homeownership,
          rent
        });

        setError(null);
      } catch (err) {
        console.error('Error fetching economic data:', err);
        setError('Unable to load economic data');
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicData();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Latest data';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Economic Data</h1>
          <p className="text-xl max-w-3xl">
            Comprehensive economic information for Tonasket and Okanogan County, including key statistics, trends, indicators, and comparative analysis.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              aria-selected={activeTab === 'overview'}
              role="tab"
            >
              Overview & Key Statistics
            </button>
            <button
              onClick={() => setActiveTab('indicators')}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'indicators'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              aria-selected={activeTab === 'indicators'}
              role="tab"
            >
              Economic Indicators
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'comparison'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              aria-selected={activeTab === 'comparison'}
              role="tab"
            >
              Data Comparison
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Economic Dashboard */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Economic Dashboard</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <EconomicDashboard />
              </div>
            </div>

            {/* Key Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Key Statistics Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Key Statistics</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Population</h3>
                    <p className="text-2xl font-bold text-black dark:text-white">976</p>
                    <p className="text-sm text-black dark:text-gray-300">2023 estimate</p>
                  </div>
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Median Household Income</h3>
                    <p className="text-2xl font-bold text-black dark:text-white">$38,273</p>
                    <p className="text-sm text-black dark:text-gray-300">2023 estimate</p>
                  </div>
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Median Age</h3>
                    <p className="text-2xl font-bold text-black dark:text-white">50</p>
                    <p className="text-sm text-black dark:text-gray-300">2023 estimate</p>
                  </div>
                </div>
              </div>

              {/* Employment Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Employment</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Unemployment Rate</h3>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ) : error ? (
                      <div className="text-red-500 dark:text-red-400">Error loading data</div>
                    ) : economicData.unemployment ? (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">{economicData.unemployment.value}</p>
                        <p className="text-sm text-black dark:text-gray-300">{formatDate(economicData.unemployment.date)}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">5.2%</p>
                        <p className="text-sm text-black dark:text-gray-300">Estimated data</p>
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Labor Force Participation</h3>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ) : error ? (
                      <div className="text-red-500 dark:text-red-400">Error loading data</div>
                    ) : economicData.laborForce ? (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">{economicData.laborForce.value}</p>
                        <p className="text-sm text-black dark:text-gray-300">{formatDate(economicData.laborForce.date)}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">58.7%</p>
                        <p className="text-sm text-black dark:text-gray-300">Estimated data</p>
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Major Industries</h3>
                    <p className="text-md text-black dark:text-white">Agriculture, Forestry</p>
                    <p className="text-sm text-black dark:text-gray-300">Primary economic sectors</p>
                  </div>
                </div>
              </div>

              {/* Housing Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Housing</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Median Home Value</h3>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ) : error ? (
                      <div className="text-red-500 dark:text-red-400">Error loading data</div>
                    ) : economicData.homeValue ? (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">{economicData.homeValue.value}</p>
                        <p className="text-sm text-black dark:text-gray-300">{formatDate(economicData.homeValue.date)}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">$215,000</p>
                        <p className="text-sm text-black dark:text-gray-300">Estimated data</p>
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Homeownership Rate</h3>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ) : error ? (
                      <div className="text-red-500 dark:text-red-400">Error loading data</div>
                    ) : economicData.homeownership ? (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">{economicData.homeownership.value}</p>
                        <p className="text-sm text-black dark:text-gray-300">{formatDate(economicData.homeownership.date)}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">62.4%</p>
                        <p className="text-sm text-black dark:text-gray-300">Estimated data</p>
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-black dark:text-white text-sm">Median Rent</h3>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ) : error ? (
                      <div className="text-red-500 dark:text-red-400">Error loading data</div>
                    ) : economicData.rent ? (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">{economicData.rent.value}</p>
                        <p className="text-sm text-black dark:text-gray-300">{formatDate(economicData.rent.date)}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-bold text-black dark:text-white">$895</p>
                        <p className="text-sm text-black dark:text-gray-300">Estimated data</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sources Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Data Sources</h2>
              <ul className="list-disc pl-5 space-y-2 text-black dark:text-white">
                <li>U.S. Census Bureau</li>
                <li>Bureau of Labor Statistics</li>
                <li>Okanogan County Economic Development Council</li>
                <li>Washington State Department of Commerce</li>
                <li>Data USA</li>
              </ul>
              <p className="mt-4 text-sm text-black dark:text-gray-300">
                Last updated: April 2025
              </p>
            </div>
          </div>
        )}

        {/* Indicators Tab */}
        {activeTab === 'indicators' && (
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Economic Indicators</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Track key economic indicators for Tonasket and Okanogan County over time. These charts show trends in unemployment, job growth, and median income.
              </p>
              <div className="h-96">
                <EconomicIndicatorsChart />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Understanding the Indicators</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Unemployment Rate</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The unemployment rate represents the percentage of the labor force that is jobless and actively looking for work.
                    A decreasing unemployment rate generally indicates economic improvement.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Job Growth</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Job growth measures the percentage change in employment over time. Positive job growth indicates
                    economic expansion and increased opportunities.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Median Income</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Median income represents the middle value of income distribution in the area. Rising median income
                    suggests improving economic conditions for residents.
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                Data sources: Washington State Employment Security Department, U.S. Census Bureau, Bureau of Labor Statistics
              </p>
            </div>
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Data Comparison Tool</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Compare Tonasket's economic metrics with county, state, and national averages across different time periods.
                Use the controls below to customize your comparison.
              </p>
              <div className="mt-6">
                <DataComparisonTool />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Comparison Insights</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Understanding how Tonasket compares to broader regions provides valuable context for economic analysis:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <span className="font-medium">Local vs. County:</span> Comparing Tonasket to Okanogan County shows how the city performs within its immediate region.
                </li>
                <li>
                  <span className="font-medium">Local vs. State:</span> Comparing to Washington State benchmarks Tonasket against the broader state economy.
                </li>
                <li>
                  <span className="font-medium">Local vs. National:</span> National comparisons provide context within the overall U.S. economy.
                </li>
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                Data sources: Washington State Employment Security Department, U.S. Census Bureau, Bureau of Labor Statistics
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
