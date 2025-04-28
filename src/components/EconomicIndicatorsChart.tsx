'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Sample economic indicators data (quarterly data for 2 years)
const economicData = {
  unemployment: [
    { quarter: 'Q1 2022', rate: 5.8 },
    { quarter: 'Q2 2022', rate: 5.5 },
    { quarter: 'Q3 2022', rate: 5.2 },
    { quarter: 'Q4 2022', rate: 5.4 },
    { quarter: 'Q1 2023', rate: 5.6 },
    { quarter: 'Q2 2023', rate: 5.3 },
    { quarter: 'Q3 2023', rate: 5.0 },
    { quarter: 'Q4 2023', rate: 4.8 }
  ],
  jobGrowth: [
    { quarter: 'Q1 2022', percent: 1.2 },
    { quarter: 'Q2 2022', percent: 1.5 },
    { quarter: 'Q3 2022', percent: 1.8 },
    { quarter: 'Q4 2022', percent: 1.3 },
    { quarter: 'Q1 2023', percent: 1.0 },
    { quarter: 'Q2 2023', percent: 1.4 },
    { quarter: 'Q3 2023', percent: 1.7 },
    { quarter: 'Q4 2023', percent: 2.0 }
  ],
  medianIncome: [
    { quarter: 'Q1 2022', amount: 48500 },
    { quarter: 'Q2 2022', amount: 48700 },
    { quarter: 'Q3 2022', amount: 49000 },
    { quarter: 'Q4 2022', amount: 49200 },
    { quarter: 'Q1 2023', amount: 49500 },
    { quarter: 'Q2 2023', amount: 49800 },
    { quarter: 'Q3 2023', amount: 50100 },
    { quarter: 'Q4 2023', amount: 50400 }
  ]
};

interface EconomicIndicatorsChartProps {
  defaultIndicator?: 'unemployment' | 'jobGrowth' | 'medianIncome';
}

const EconomicIndicatorsChart = ({ defaultIndicator = 'unemployment' }: EconomicIndicatorsChartProps) => {
  const chartRef = useRef(null);
  const [selectedIndicator, setSelectedIndicator] = useState(defaultIndicator);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  // Update chart when selected indicator changes
  useEffect(() => {
    const textColor = 'rgba(255, 255, 255, 0.9)';
    const gridColor = 'rgba(107, 114, 128, 0.2)';
    
    // Configure chart based on selected indicator
    let data;
    let label;
    let borderColor;
    let backgroundColor;
    let yAxisLabel;
    let tooltipFormat;
    
    switch (selectedIndicator) {
      case 'unemployment':
        data = economicData.unemployment.map(item => item.rate);
        label = 'Unemployment Rate';
        borderColor = 'rgb(239, 68, 68)';
        backgroundColor = 'rgba(239, 68, 68, 0.1)';
        yAxisLabel = 'Rate (%)';
        tooltipFormat = (value) => `${value}%`;
        break;
      case 'jobGrowth':
        data = economicData.jobGrowth.map(item => item.percent);
        label = 'Job Growth';
        borderColor = 'rgb(34, 197, 94)';
        backgroundColor = 'rgba(34, 197, 94, 0.1)';
        yAxisLabel = 'Growth (%)';
        tooltipFormat = (value) => `+${value}%`;
        break;
      case 'medianIncome':
        data = economicData.medianIncome.map(item => item.amount);
        label = 'Median Income';
        borderColor = 'rgb(59, 130, 246)';
        backgroundColor = 'rgba(59, 130, 246, 0.1)';
        yAxisLabel = 'USD ($)';
        tooltipFormat = (value) => `$${value.toLocaleString()}`;
        break;
      default:
        data = [];
        label = '';
        borderColor = '';
        backgroundColor = '';
        yAxisLabel = '';
        tooltipFormat = (value) => `${value}`;
    }
    
    // Set up chart data
    setChartData({
      labels: economicData.unemployment.map(item => item.quarter),
      datasets: [
        {
          label,
          data,
          borderColor,
          backgroundColor,
          borderWidth: 2,
          pointBackgroundColor: borderColor,
          pointBorderColor: 'rgba(255, 255, 255, 0.8)',
          pointBorderWidth: 1,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.3
        }
      ]
    });
    
    // Set up chart options
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: gridColor,
            drawBorder: false
          },
          ticks: {
            color: textColor,
            font: {
              size: 11
            }
          }
        },
        y: {
          grid: {
            color: gridColor,
            drawBorder: false
          },
          ticks: {
            color: textColor,
            font: {
              size: 11
            },
            callback: function(value) {
              if (selectedIndicator === 'medianIncome') {
                return '$' + value.toLocaleString();
              }
              return value + '%';
            }
          },
          title: {
            display: true,
            text: yAxisLabel,
            color: textColor,
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          titleColor: 'rgba(255, 255, 255, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'rgba(75, 85, 99, 0.3)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 4,
          callbacks: {
            label: function(context) {
              const value = context.raw;
              return `${label}: ${tooltipFormat(value)}`;
            }
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    });
  }, [selectedIndicator]);

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4 space-x-4">
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${
            selectedIndicator === 'unemployment'
              ? 'bg-red-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setSelectedIndicator('unemployment')}
        >
          Unemployment
        </button>
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${
            selectedIndicator === 'jobGrowth'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setSelectedIndicator('jobGrowth')}
        >
          Job Growth
        </button>
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${
            selectedIndicator === 'medianIncome'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setSelectedIndicator('medianIncome')}
        >
          Median Income
        </button>
      </div>
      <div className="h-64">
        {Object.keys(chartData).length > 0 && (
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default EconomicIndicatorsChart;
