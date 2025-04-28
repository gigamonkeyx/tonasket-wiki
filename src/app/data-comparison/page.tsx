'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the component with no SSR to avoid hydration issues
const DataComparisonTool = dynamic(() => import('@/components/DataComparisonTool'), { ssr: false });

export default function DataComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Data Comparison Tool</h1>
          <p className="text-xl max-w-3xl">
            Compare Tonasket's economic metrics with county, state, and national averages across different time periods.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Overview</h2>
          <p className="text-black dark:text-white mb-4">
            This interactive tool allows you to compare key economic metrics for Tonasket with Okanogan County, 
            Washington State, and national averages. You can select different metrics, regions, and time periods 
            to create customized comparisons.
          </p>
          <p className="text-black dark:text-white">
            Use the buttons below to select what you want to compare. The tool will automatically generate 
            insights based on your selections.
          </p>
        </div>

        {/* Data Comparison Tool Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800 dark:text-blue-400">Interactive Comparison Tool</h2>
          <div className="bg-gray-800 dark:bg-gray-900 rounded p-6">
            <DataComparisonTool />
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">How to Use This Tool</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Select a Metric</h3>
                <p className="text-black dark:text-gray-300">
                  Choose from unemployment rate, median income, housing prices, or job growth to see how these metrics 
                  compare across different regions.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Compare Regions</h3>
                <p className="text-black dark:text-gray-300">
                  Select which regions you want to compare. You can compare Tonasket with Okanogan County, 
                  Washington State, and/or the national average.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Choose Time Periods</h3>
                <p className="text-black dark:text-gray-300">
                  Select which years you want to include in your comparison to see how metrics have changed over time.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-blue-600 dark:text-blue-400 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Review Insights</h3>
                <p className="text-black dark:text-gray-300">
                  The tool will automatically generate insights based on your selections, highlighting how Tonasket 
                  compares to other regions and how metrics have changed over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Data Sources & Methodology</h2>
          <div className="space-y-4">
            <p className="text-black dark:text-white">
              The data presented in this comparison tool is compiled from the following sources:
            </p>
            <ul className="list-disc pl-5 text-black dark:text-white space-y-2">
              <li>Washington State Employment Security Department</li>
              <li>U.S. Bureau of Labor Statistics</li>
              <li>U.S. Census Bureau American Community Survey</li>
              <li>Okanogan County Economic Development Council</li>
              <li>National Association of Realtors</li>
            </ul>
            <p className="text-black dark:text-white">
              Data is updated annually. The most recent update was in January 2024. All comparisons are based on 
              annual averages for each metric. For more detailed methodology information, please contact the 
              Tonasket Economic Development Office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
