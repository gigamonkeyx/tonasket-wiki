'use client';

import React from 'react';
import Link from 'next/link';

export default function TradeImpactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Trade Impact Analysis</h1>
          <p className="text-xl max-w-3xl">
            Analysis of trade policies and their impact on the local economy, including tariffs on Canada.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Overview</h2>
          <p className="text-black dark:text-white mb-4">
            Tonasket's economy is significantly influenced by trade policies, particularly those affecting
            cross-border trade with Canada. This page provides analysis and data on how recent trade
            policies, including tariffs implemented by the Trump administration, have impacted local
            businesses, employment, and economic growth.
          </p>
          <p className="text-black dark:text-white">
            Okanogan County, located along the Canadian border, has unique economic considerations
            due to its geographic position and reliance on cross-border commerce.
          </p>
        </div>

        {/* Key Impacts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Key Impacts on Local Economy</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black dark:text-white">Agriculture Exports</h3>
                  <p className="text-black dark:text-gray-300">
                    Changes in tariffs have affected agricultural exports to Canada, particularly in the fruit industry.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black dark:text-white">Retail and Tourism</h3>
                  <p className="text-black dark:text-gray-300">
                    Cross-border shopping and tourism have been affected by trade tensions and policy changes.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black dark:text-white">Supply Chain Disruptions</h3>
                  <p className="text-black dark:text-gray-300">
                    Local businesses have experienced supply chain challenges due to changing trade regulations.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black dark:text-white">Employment Shifts</h3>
                  <p className="text-black dark:text-gray-300">
                    Changes in trade patterns have led to employment shifts in certain sectors.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Tariff Impact Data</h2>
            <div className="mb-4">
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded p-4">
                <h3 className="text-lg font-medium text-black dark:text-white mb-4">Estimated Tariff Impact by Sector</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-black dark:text-white">Agriculture</span>
                      <span className="text-red-500 dark:text-red-400">-8.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-red-500 dark:bg-red-400 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-black dark:text-white">Manufacturing</span>
                      <span className="text-red-500 dark:text-red-400">-5.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-red-500 dark:bg-red-400 h-2.5 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-black dark:text-white">Retail</span>
                      <span className="text-red-500 dark:text-red-400">-12.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-red-500 dark:bg-red-400 h-2.5 rounded-full" style={{ width: '127%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-black dark:text-white">Tourism</span>
                      <span className="text-red-500 dark:text-red-400">-15.3%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-red-500 dark:bg-red-400 h-2.5 rounded-full" style={{ width: '153%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-black dark:text-white">Transportation</span>
                      <span className="text-red-500 dark:text-red-400">-7.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div className="bg-red-500 dark:bg-red-400 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-black dark:text-gray-300 text-sm">
              This chart shows the estimated impact of tariffs on key export categories from Okanogan County to Canada.
            </p>
          </div>
        </div>

        {/* Trump Administration Policies Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Trump Administration Trade Policies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">USMCA (Replacing NAFTA)</h3>
              <p className="text-black dark:text-gray-300">
                The United States-Mexico-Canada Agreement (USMCA) replaced the North American Free Trade Agreement (NAFTA)
                in 2020. This section analyzes how specific provisions of the USMCA have affected Tonasket's economy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">Aluminum and Steel Tariffs</h3>
              <p className="text-black dark:text-gray-300">
                Section 232 tariffs on aluminum and steel imports from Canada have had downstream effects on local
                manufacturing and construction costs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">Agricultural Trade</h3>
              <p className="text-black dark:text-gray-300">
                Changes to agricultural trade provisions have impacted local farmers, particularly those exporting to Canada.
              </p>
            </div>
          </div>
        </div>

        {/* Opportunities Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Emerging Opportunities</h2>
          <p className="text-black dark:text-white mb-6">
            Despite challenges, trade policy changes have created new opportunities for local businesses:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-black dark:text-white">Local Manufacturing</h3>
              <p className="text-black dark:text-gray-300">
                Some businesses have found opportunities in domestic manufacturing to replace imported goods.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-black dark:text-white">New Export Markets</h3>
              <p className="text-black dark:text-gray-300">
                Diversification of export markets beyond Canada has helped some businesses grow.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2 text-black dark:text-white">Value-Added Agriculture</h3>
              <p className="text-black dark:text-gray-300">
                Processing agricultural products locally before export has created new value streams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
