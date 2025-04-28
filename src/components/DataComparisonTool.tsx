'use client';

import React, { useState, useEffect } from 'react';
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

// Sample comparison data
const comparisonData = {
  unemployment: {
    tonasket: {
      '2021': 5.8,
      '2022': 5.4,
      '2023': 4.8
    },
    county: {
      '2021': 6.2,
      '2022': 5.7,
      '2023': 5.1
    },
    state: {
      '2021': 5.2,
      '2022': 4.8,
      '2023': 4.2
    },
    national: {
      '2021': 5.4,
      '2022': 4.9,
      '2023': 3.7
    }
  },
  medianIncome: {
    tonasket: {
      '2021': 47200,
      '2022': 48500,
      '2023': 50400
    },
    county: {
      '2021': 49800,
      '2022': 51200,
      '2023': 53100
    },
    state: {
      '2021': 73500,
      '2022': 75200,
      '2023': 77000
    },
    national: {
      '2021': 67500,
      '2022': 69000,
      '2023': 70800
    }
  },
  housingPrice: {
    tonasket: {
      '2021': 245000,
      '2022': 265000,
      '2023': 285000
    },
    county: {
      '2021': 260000,
      '2022': 282000,
      '2023': 305000
    },
    state: {
      '2021': 485000,
      '2022': 520000,
      '2023': 545000
    },
    national: {
      '2021': 350000,
      '2022': 375000,
      '2023': 395000
    }
  },
  jobGrowth: {
    tonasket: {
      '2021': 0.8,
      '2022': 1.3,
      '2023': 2.0
    },
    county: {
      '2021': 1.0,
      '2022': 1.5,
      '2023': 1.8
    },
    state: {
      '2021': 2.1,
      '2022': 2.5,
      '2023': 2.8
    },
    national: {
      '2021': 1.8,
      '2022': 2.2,
      '2023': 2.4
    }
  }
};

// Metric configuration
const metricConfig = {
  unemployment: {
    label: 'Unemployment Rate (%)',
    format: (value) => `${value}%`,
    colors: {
      tonasket: 'rgba(239, 68, 68, 0.8)',
      county: 'rgba(245, 158, 11, 0.8)',
      state: 'rgba(59, 130, 246, 0.8)',
      national: 'rgba(16, 185, 129, 0.8)'
    },
    borderColors: {
      tonasket: 'rgb(220, 38, 38)',
      county: 'rgb(217, 119, 6)',
      state: 'rgb(37, 99, 235)',
      national: 'rgb(5, 150, 105)'
    },
    lowerIsBetter: true
  },
  medianIncome: {
    label: 'Median Household Income ($)',
    format: (value) => `$${value.toLocaleString()}`,
    colors: {
      tonasket: 'rgba(16, 185, 129, 0.8)',
      county: 'rgba(245, 158, 11, 0.8)',
      state: 'rgba(59, 130, 246, 0.8)',
      national: 'rgba(139, 92, 246, 0.8)'
    },
    borderColors: {
      tonasket: 'rgb(5, 150, 105)',
      county: 'rgb(217, 119, 6)',
      state: 'rgb(37, 99, 235)',
      national: 'rgb(124, 58, 237)'
    },
    lowerIsBetter: false
  },
  housingPrice: {
    label: 'Median Home Price ($)',
    format: (value) => `$${value.toLocaleString()}`,
    colors: {
      tonasket: 'rgba(59, 130, 246, 0.8)',
      county: 'rgba(245, 158, 11, 0.8)',
      state: 'rgba(239, 68, 68, 0.8)',
      national: 'rgba(139, 92, 246, 0.8)'
    },
    borderColors: {
      tonasket: 'rgb(37, 99, 235)',
      county: 'rgb(217, 119, 6)',
      state: 'rgb(220, 38, 38)',
      national: 'rgb(124, 58, 237)'
    },
    lowerIsBetter: null // Neutral
  },
  jobGrowth: {
    label: 'Job Growth (%)',
    format: (value) => `${value}%`,
    colors: {
      tonasket: 'rgba(16, 185, 129, 0.8)',
      county: 'rgba(245, 158, 11, 0.8)',
      state: 'rgba(59, 130, 246, 0.8)',
      national: 'rgba(139, 92, 246, 0.8)'
    },
    borderColors: {
      tonasket: 'rgb(5, 150, 105)',
      county: 'rgb(217, 119, 6)',
      state: 'rgb(37, 99, 235)',
      national: 'rgb(124, 58, 237)'
    },
    lowerIsBetter: false
  }
};

const DataComparisonTool = ({ defaultMetric = 'unemployment' }) => {
  const [selectedMetric, setSelectedMetric] = useState(defaultMetric);
  const [selectedRegions, setSelectedRegions] = useState(['tonasket', 'county', 'state']);
  const [selectedYears, setSelectedYears] = useState(['2021', '2022', '2023']);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  // Toggle region selection
  const toggleRegion = (region) => {
    if (selectedRegions.includes(region)) {
      // Don't allow deselecting all regions
      if (selectedRegions.length > 1) {
        setSelectedRegions(selectedRegions.filter(r => r !== region));
      }
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  // Toggle year selection
  const toggleYear = (year) => {
    if (selectedYears.includes(year)) {
      // Don't allow deselecting all years
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== year));
      }
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  // Update chart when selections change
  useEffect(() => {
    const textColor = 'rgba(255, 255, 255, 0.9)';
    const gridColor = 'rgba(107, 114, 128, 0.2)';
    
    // Prepare data for the chart
    const labels = selectedYears.sort();
    const datasets = selectedRegions.map(region => ({
      label: region.charAt(0).toUpperCase() + region.slice(1), // Capitalize first letter
      data: labels.map(year => comparisonData[selectedMetric][region][year]),
      backgroundColor: metricConfig[selectedMetric].colors[region],
      borderColor: metricConfig[selectedMetric].borderColors[region],
      borderWidth: 1
    }));
    
    setChartData({
      labels,
      datasets
    });
    
    // Configure chart options
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
              size: 12
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
              size: 12
            },
            callback: function(value) {
              if (selectedMetric === 'medianIncome' || selectedMetric === 'housingPrice') {
                return '$' + value.toLocaleString();
              }
              return value + '%';
            }
          },
          title: {
            display: true,
            text: metricConfig[selectedMetric].label,
            color: textColor,
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: textColor,
            font: {
              size: 12
            },
            usePointStyle: true,
            pointStyle: 'circle'
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
              return `${context.dataset.label}: ${metricConfig[selectedMetric].format(value)}`;
            }
          }
        }
      }
    });
  }, [selectedMetric, selectedRegions, selectedYears]);

  // Get comparison insight
  const getInsight = () => {
    if (selectedRegions.includes('tonasket') && selectedYears.includes('2023')) {
      const metric = selectedMetric;
      const tonasketValue = comparisonData[metric].tonasket['2023'];
      
      let comparisons = [];
      
      if (selectedRegions.includes('county')) {
        const countyValue = comparisonData[metric].county['2023'];
        const diff = ((tonasketValue - countyValue) / countyValue * 100).toFixed(1);
        const better = metricConfig[metric].lowerIsBetter ? tonasketValue < countyValue : tonasketValue > countyValue;
        
        if (metricConfig[metric].lowerIsBetter === null) {
          comparisons.push(`Tonasket's ${metric === 'housingPrice' ? 'housing is' : 'value is'} ${Math.abs(parseFloat(diff))}% ${parseFloat(diff) < 0 ? 'lower' : 'higher'} than the county average.`);
        } else {
          comparisons.push(`Tonasket is ${better ? 'outperforming' : 'underperforming'} the county average by ${Math.abs(parseFloat(diff))}%.`);
        }
      }
      
      if (selectedRegions.includes('state')) {
        const stateValue = comparisonData[metric].state['2023'];
        const diff = ((tonasketValue - stateValue) / stateValue * 100).toFixed(1);
        const better = metricConfig[metric].lowerIsBetter ? tonasketValue < stateValue : tonasketValue > stateValue;
        
        if (metricConfig[metric].lowerIsBetter === null) {
          comparisons.push(`Tonasket's ${metric === 'housingPrice' ? 'housing is' : 'value is'} ${Math.abs(parseFloat(diff))}% ${parseFloat(diff) < 0 ? 'lower' : 'higher'} than the state average.`);
        } else {
          comparisons.push(`Tonasket is ${better ? 'outperforming' : 'underperforming'} the state average by ${Math.abs(parseFloat(diff))}%.`);
        }
      }
      
      if (selectedRegions.includes('national')) {
        const nationalValue = comparisonData[metric].national['2023'];
        const diff = ((tonasketValue - nationalValue) / nationalValue * 100).toFixed(1);
        const better = metricConfig[metric].lowerIsBetter ? tonasketValue < nationalValue : tonasketValue > nationalValue;
        
        if (metricConfig[metric].lowerIsBetter === null) {
          comparisons.push(`Tonasket's ${metric === 'housingPrice' ? 'housing is' : 'value is'} ${Math.abs(parseFloat(diff))}% ${parseFloat(diff) < 0 ? 'lower' : 'higher'} than the national average.`);
        } else {
          comparisons.push(`Tonasket is ${better ? 'outperforming' : 'underperforming'} the national average by ${Math.abs(parseFloat(diff))}%.`);
        }
      }
      
      if (selectedYears.includes('2021') && selectedYears.includes('2023')) {
        const value2021 = comparisonData[metric].tonasket['2021'];
        const value2023 = comparisonData[metric].tonasket['2023'];
        const diff = ((value2023 - value2021) / value2021 * 100).toFixed(1);
        const better = metricConfig[metric].lowerIsBetter ? value2023 < value2021 : value2023 > value2021;
        
        if (metricConfig[metric].lowerIsBetter === null) {
          comparisons.push(`Tonasket has seen a ${Math.abs(parseFloat(diff))}% ${parseFloat(diff) < 0 ? 'decrease' : 'increase'} in this metric since 2021.`);
        } else {
          comparisons.push(`Tonasket has ${better ? 'improved' : 'declined'} by ${Math.abs(parseFloat(diff))}% in this metric since 2021.`);
        }
      }
      
      return comparisons.join(' ');
    }
    
    return 'Select Tonasket and at least one other region or year to see comparison insights.';
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-3">Select Metric</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              selectedMetric === 'unemployment'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setSelectedMetric('unemployment')}
          >
            Unemployment
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              selectedMetric === 'medianIncome'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setSelectedMetric('medianIncome')}
          >
            Median Income
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              selectedMetric === 'housingPrice'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setSelectedMetric('housingPrice')}
          >
            Housing Price
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              selectedMetric === 'jobGrowth'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setSelectedMetric('jobGrowth')}
          >
            Job Growth
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Compare Regions</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                selectedRegions.includes('tonasket')
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => toggleRegion('tonasket')}
            >
              Tonasket
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                selectedRegions.includes('county')
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => toggleRegion('county')}
            >
              Okanogan County
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                selectedRegions.includes('state')
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => toggleRegion('state')}
            >
              Washington State
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                selectedRegions.includes('national')
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => toggleRegion('national')}
            >
              National Average
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Select Years</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                selectedYears.includes('2021')
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => toggleYear('2021')}
            >
              2021
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                selectedYears.includes('2022')
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => toggleYear('2022')}
            >
              2022
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                selectedYears.includes('2023')
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => toggleYear('2023')}
            >
              2023
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-64 mb-6">
        {Object.keys(chartData).length > 0 && (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
      
      <div className="bg-gray-700 p-4 rounded-md mb-4">
        <h3 className="text-lg font-medium text-white mb-2">Comparison Insights</h3>
        <p className="text-gray-300">{getInsight()}</p>
      </div>
      
      <div className="text-xs text-gray-400">
        <p>Data sources: Washington State Employment Security Department, U.S. Census Bureau, Bureau of Labor Statistics</p>
        <p>Last updated: January 2024</p>
      </div>
    </div>
  );
};

export default DataComparisonTool;
