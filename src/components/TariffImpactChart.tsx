'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the tariff impact data
const tariffData = [
  { sector: 'Agriculture', impact: -8.5 },
  { sector: 'Manufacturing', impact: -5.2 },
  { sector: 'Retail', impact: -12.7 },
  { sector: 'Tourism', impact: -15.3 },
  { sector: 'Transportation', impact: -7.8 },
  { sector: 'Local Manufacturing', impact: 3.2 }
];

const TariffImpactChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  // Set up chart data and options
  useEffect(() => {
    // Always use dark mode colors for better visibility
    const textColor = 'rgba(255, 255, 255, 0.9)';
    const gridColor = 'rgba(107, 114, 128, 0.2)';
    const zeroLineColor = 'rgba(156, 163, 175, 0.5)';

    // Set up chart data
    setChartData({
      labels: tariffData.map(item => item.sector),
      datasets: [
        {
          label: 'Tariff Impact (%)',
          data: tariffData.map(item => item.impact),
          backgroundColor: tariffData.map(item =>
            item.impact < 0
              ? 'rgba(239, 68, 68, 0.8)'
              : 'rgba(34, 197, 94, 0.8)'
          ),
          borderColor: tariffData.map(item =>
            item.impact < 0
              ? 'rgb(248, 113, 113)'
              : 'rgb(74, 222, 128)'
          ),
          borderWidth: 1,
        }
      ]
    });

    // Set up chart options
    setChartOptions({
      indexAxis: 'y', // Horizontal bar chart
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 10
        }
      },
      scales: {
        x: {
          beginAtZero: false,
          min: -20,
          max: 10,
          grid: {
            color: gridColor,
            drawBorder: false,
            z: 1
          },
          border: {
            display: false
          },
          ticks: {
            color: textColor,
            font: {
              size: 11
            },
            callback: function(value) {
              return value + '%';
            }
          },
          afterFit: function(scale) {
            scale.paddingRight = 10;
          }
        },
        y: {
          grid: {
            display: false,
            drawBorder: false
          },
          border: {
            display: false
          },
          ticks: {
            color: textColor,
            font: {
              weight: '500'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          titleColor: 'rgba(255, 255, 255, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'rgba(75, 85, 99, 0.3)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 4,
          displayColors: false,
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              const value = context.raw;
              const sign = value >= 0 ? '+' : '';
              return `Impact: ${sign}${value}%`;
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      onResize: function(chart, size) {
        // Adjust font size based on container width
        const fontSize = size.width < 400 ? 10 : 12;
        chart.options.scales.y.ticks.font.size = fontSize;
        chart.update();
      }
    });
  }, []);

  return (
    <div className="h-full w-full">
      {Object.keys(chartData).length > 0 && (
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default TariffImpactChart;
