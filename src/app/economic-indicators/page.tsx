'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the components with no SSR to avoid hydration issues
const EconomicIndicatorsChart = dynamic(() => import('@/components/EconomicIndicatorsChart'), { ssr: false });

export default function EconomicIndicatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Economic Indicators</h1>
          <p className="text-xl max-w-3xl">
            Key economic indicators for Tonasket and Okanogan County, including unemployment rates, job growth, and income data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Overview</h2>
          <p className="text-black dark:text-white mb-4">
            This page provides an overview of key economic indicators for Tonasket and the surrounding Okanogan County region.
            The data is sourced from the Washington State Employment Security Department, the U.S. Bureau of Labor Statistics,
            and the U.S. Census Bureau.
          </p>
          <p className="text-black dark:text-white">
            Use the interactive charts below to explore trends in unemployment, job growth, and median income over time.
            Click on the buttons to switch between different indicators.
          </p>
        </div>



        {/* Economic Indicators Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Quarterly Economic Indicators</h2>
            <div className="mb-4">
              <div className="bg-gray-800 dark:bg-gray-900 rounded p-4">
                <h3 className="text-lg font-medium text-white mb-4">Tonasket Economic Trends (2022-2023)</h3>

                {/* Economic Indicators Chart */}
                <EconomicIndicatorsChart defaultIndicator="unemployment" />
              </div>
            </div>
            <p className="text-black dark:text-gray-300 text-sm">
              Data shown represents quarterly figures for Okanogan County. Click on the buttons above the chart to view different economic indicators.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Key Economic Statistics</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <h3 className="font-medium text-black dark:text-white mb-2">Unemployment Rate</h3>
                <p className="text-black dark:text-gray-300 mb-2">
                  The current unemployment rate in Okanogan County is <span className="font-bold text-red-600 dark:text-red-400">4.8%</span>,
                  which is slightly higher than the Washington state average of 4.2%.
                </p>
                <div className="flex items-center">
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    Improved 1.0% from previous year
                  </span>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <h3 className="font-medium text-black dark:text-white mb-2">Job Growth</h3>
                <p className="text-black dark:text-gray-300 mb-2">
                  Annual job growth in Okanogan County is currently at <span className="font-bold text-green-600 dark:text-green-400">2.0%</span>,
                  with the strongest growth in healthcare, agriculture, and tourism sectors.
                </p>
                <div className="flex items-center">
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    Increased 0.7% from previous year
                  </span>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <h3 className="font-medium text-black dark:text-white mb-2">Median Household Income</h3>
                <p className="text-black dark:text-gray-300 mb-2">
                  The median household income in Okanogan County is <span className="font-bold text-blue-600 dark:text-blue-400">$50,400</span>,
                  which is below the Washington state median of $77,006.
                </p>
                <div className="flex items-center">
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    Increased 3.9% from previous year
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Breakdown Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Industry Employment Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="py-3 px-4 text-left text-black dark:text-white">Industry</th>
                  <th className="py-3 px-4 text-left text-black dark:text-white">Employment</th>
                  <th className="py-3 px-4 text-left text-black dark:text-white">% of Total</th>
                  <th className="py-3 px-4 text-left text-black dark:text-white">Annual Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 px-4 text-black dark:text-white">Agriculture, Forestry & Fishing</td>
                  <td className="py-3 px-4 text-black dark:text-white">3,245</td>
                  <td className="py-3 px-4 text-black dark:text-white">24.8%</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">+1.2%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-black dark:text-white">Healthcare & Social Assistance</td>
                  <td className="py-3 px-4 text-black dark:text-white">2,180</td>
                  <td className="py-3 px-4 text-black dark:text-white">16.7%</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">+3.5%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-black dark:text-white">Retail Trade</td>
                  <td className="py-3 px-4 text-black dark:text-white">1,875</td>
                  <td className="py-3 px-4 text-black dark:text-white">14.3%</td>
                  <td className="py-3 px-4 text-red-600 dark:text-red-400">-0.8%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-black dark:text-white">Government</td>
                  <td className="py-3 px-4 text-black dark:text-white">1,650</td>
                  <td className="py-3 px-4 text-black dark:text-white">12.6%</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">+0.5%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-black dark:text-white">Accommodation & Food Services</td>
                  <td className="py-3 px-4 text-black dark:text-white">1,320</td>
                  <td className="py-3 px-4 text-black dark:text-white">10.1%</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">+4.2%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-black dark:text-white">Construction</td>
                  <td className="py-3 px-4 text-black dark:text-white">985</td>
                  <td className="py-3 px-4 text-black dark:text-white">7.5%</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">+2.1%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-black dark:text-white">Manufacturing</td>
                  <td className="py-3 px-4 text-black dark:text-white">780</td>
                  <td className="py-3 px-4 text-black dark:text-white">6.0%</td>
                  <td className="py-3 px-4 text-red-600 dark:text-red-400">-1.5%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-black dark:text-white">Other Services</td>
                  <td className="py-3 px-4 text-black dark:text-white">1,045</td>
                  <td className="py-3 px-4 text-black dark:text-white">8.0%</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">+1.8%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-black dark:text-gray-300">
            Source: Washington State Employment Security Department, 2023 Annual Report
          </p>
        </div>

        {/* Data Sources Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Data Sources & Methodology</h2>
          <div className="space-y-4">
            <p className="text-black dark:text-white">
              The economic data presented on this page is compiled from the following sources:
            </p>
            <ul className="list-disc pl-5 text-black dark:text-white space-y-2">
              <li>Washington State Employment Security Department</li>
              <li>U.S. Bureau of Labor Statistics</li>
              <li>U.S. Census Bureau American Community Survey</li>
              <li>Okanogan County Economic Development Council</li>
            </ul>
            <p className="text-black dark:text-white">
              Data is updated quarterly. The most recent update was in January 2024. Employment figures represent
              non-farm employment unless otherwise noted. Unemployment rates are seasonally adjusted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
