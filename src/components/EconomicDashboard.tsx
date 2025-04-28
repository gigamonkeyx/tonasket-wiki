'use client';

import React, { useState } from 'react';

// Sample dashboard data
const dashboardData = {
  population: {
    current: 4852,
    previous: 4795,
    change: 1.2,
    trend: 'up'
  },
  unemployment: {
    current: 4.8,
    previous: 5.8,
    change: -1.0,
    trend: 'down'
  },
  medianIncome: {
    current: 50400,
    previous: 48500,
    change: 3.9,
    trend: 'up'
  },
  housingPrice: {
    current: 285000,
    previous: 265000,
    change: 7.5,
    trend: 'up'
  },
  businessCount: {
    current: 423,
    previous: 412,
    change: 2.7,
    trend: 'up'
  },
  educationRate: {
    current: 87.2,
    previous: 86.5,
    change: 0.7,
    trend: 'up'
  }
};

const EconomicDashboard = () => {
  const [timeframe, setTimeframe] = useState('annual');
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Economic Dashboard</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'quarterly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setTimeframe('quarterly')}
          >
            Quarterly
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'annual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setTimeframe('annual')}
          >
            Annual
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Population Card */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="bg-indigo-500 p-2 rounded-md mr-3">
                <span className="text-white text-lg">👥</span>
              </div>
              <h3 className="text-white font-medium">Population</h3>
            </div>
            <div className={`flex items-center ${dashboardData.population.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              <span className="mr-1">{dashboardData.population.trend === 'up' ? '↑' : '↓'}</span>
              <span>{Math.abs(dashboardData.population.change)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {dashboardData.population.current.toLocaleString()}
          </div>
          <p className="text-gray-400 text-sm">
            {timeframe === 'annual' ? 'Annual change' : 'Quarterly change'} from {dashboardData.population.previous.toLocaleString()}
          </p>
        </div>
        
        {/* Unemployment Card */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-md mr-3">
                <span className="text-white text-lg">📉</span>
              </div>
              <h3 className="text-white font-medium">Unemployment</h3>
            </div>
            <div className={`flex items-center ${dashboardData.unemployment.trend === 'down' ? 'text-green-400' : 'text-red-400'}`}>
              <span className="mr-1">{dashboardData.unemployment.trend === 'down' ? '↓' : '↑'}</span>
              <span>{Math.abs(dashboardData.unemployment.change)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {dashboardData.unemployment.current}%
          </div>
          <p className="text-gray-400 text-sm">
            {timeframe === 'annual' ? 'Annual change' : 'Quarterly change'} from {dashboardData.unemployment.previous}%
          </p>
        </div>
        
        {/* Median Income Card */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-md mr-3">
                <span className="text-white text-lg">💵</span>
              </div>
              <h3 className="text-white font-medium">Median Income</h3>
            </div>
            <div className={`flex items-center ${dashboardData.medianIncome.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              <span className="mr-1">{dashboardData.medianIncome.trend === 'up' ? '↑' : '↓'}</span>
              <span>{Math.abs(dashboardData.medianIncome.change)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ${dashboardData.medianIncome.current.toLocaleString()}
          </div>
          <p className="text-gray-400 text-sm">
            {timeframe === 'annual' ? 'Annual change' : 'Quarterly change'} from ${dashboardData.medianIncome.previous.toLocaleString()}
          </p>
        </div>
        
        {/* Housing Price Card */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-2 rounded-md mr-3">
                <span className="text-white text-lg">🏠</span>
              </div>
              <h3 className="text-white font-medium">Median Home Price</h3>
            </div>
            <div className={`flex items-center ${dashboardData.housingPrice.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              <span className="mr-1">{dashboardData.housingPrice.trend === 'up' ? '↑' : '↓'}</span>
              <span>{Math.abs(dashboardData.housingPrice.change)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ${dashboardData.housingPrice.current.toLocaleString()}
          </div>
          <p className="text-gray-400 text-sm">
            {timeframe === 'annual' ? 'Annual change' : 'Quarterly change'} from ${dashboardData.housingPrice.previous.toLocaleString()}
          </p>
        </div>
        
        {/* Business Count Card */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-md mr-3">
                <span className="text-white text-lg">🏢</span>
              </div>
              <h3 className="text-white font-medium">Business Count</h3>
            </div>
            <div className={`flex items-center ${dashboardData.businessCount.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              <span className="mr-1">{dashboardData.businessCount.trend === 'up' ? '↑' : '↓'}</span>
              <span>{Math.abs(dashboardData.businessCount.change)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {dashboardData.businessCount.current}
          </div>
          <p className="text-gray-400 text-sm">
            {timeframe === 'annual' ? 'Annual change' : 'Quarterly change'} from {dashboardData.businessCount.previous}
          </p>
        </div>
        
        {/* Education Rate Card */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="bg-purple-500 p-2 rounded-md mr-3">
                <span className="text-white text-lg">🎓</span>
              </div>
              <h3 className="text-white font-medium">High School Graduation</h3>
            </div>
            <div className={`flex items-center ${dashboardData.educationRate.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              <span className="mr-1">{dashboardData.educationRate.trend === 'up' ? '↑' : '↓'}</span>
              <span>{Math.abs(dashboardData.educationRate.change)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {dashboardData.educationRate.current}%
          </div>
          <p className="text-gray-400 text-sm">
            {timeframe === 'annual' ? 'Annual change' : 'Quarterly change'} from {dashboardData.educationRate.previous}%
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>Data sources: Washington State Employment Security Department, U.S. Census Bureau, Okanogan County Records</p>
        <p>Last updated: January 2024</p>
      </div>
    </div>
  );
};

export default EconomicDashboard;
