'use client';

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import tradeImpactService from '@/services/tradeImpactService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TariffImpactChartProps {
  className?: string;
}

export default function TariffImpactChart({ className }: TariffImpactChartProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const data = await tradeImpactService.getTariffImpactChartData();
        setChartData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tariff impact chart data:', err);
        setError('Unable to load chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'black',
        },
      },
      title: {
        display: true,
        text: 'Tariff Impact by Sector (%)',
        color: 'black',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: 'black',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'black',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  // Dark mode options
  const darkModeOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        ...options.plugins.legend,
        labels: {
          color: 'white',
        },
      },
      title: {
        ...options.plugins.title,
        color: 'white',
      },
    },
    scales: {
      y: {
        ...options.scales.y,
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ...options.scales.x,
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className={`h-64 ${className}`}>
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      ) : error ? (
        <div className="h-full w-full flex items-center justify-center text-red-500 dark:text-red-400">
          {error}
        </div>
      ) : chartData ? (
        <div className="h-full w-full">
          <Bar 
            data={chartData} 
            options={document.documentElement.classList.contains('dark') ? darkModeOptions : options} 
          />
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-black dark:text-white">
          No chart data available
        </div>
      )}
    </div>
  );
}
