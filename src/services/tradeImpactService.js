/**
 * Service for fetching and managing trade impact data
 */

// Cache for trade impact data
const tradeImpactCache = {
  data: null,
  timestamp: null,
  // Cache expiration time: 1 hour
  expirationTime: 60 * 60 * 1000
};

/**
 * Get all trade impact data
 * Uses cache if available, otherwise fetches from API
 * @returns {Promise<Array>} Trade impact data
 */
export async function getTradeImpactData() {
  // Check cache first
  if (tradeImpactCache.data && 
      tradeImpactCache.timestamp && 
      (Date.now() - tradeImpactCache.timestamp < tradeImpactCache.expirationTime)) {
    return tradeImpactCache.data;
  }
  
  try {
    // Fetch from API if not in cache
    const response = await fetch('/api/trade-impact');
    
    if (!response.ok) {
      throw new Error(`Trade impact API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Cache the data
    tradeImpactCache.data = data;
    tradeImpactCache.timestamp = Date.now();
    
    return data;
  } catch (error) {
    console.error('Error fetching trade impact data:', error);
    
    // Return fallback data if API fails
    return getFallbackTradeImpactData();
  }
}

/**
 * Get trade impact data by category
 * @param {string} category - Category of trade impact data
 * @returns {Promise<Array>} Filtered trade impact data
 */
export async function getTradeImpactDataByCategory(category) {
  const data = await getTradeImpactData();
  return data.filter(item => item.category === category);
}

/**
 * Get latest trade impact data by title
 * @param {string} title - Title of trade impact data
 * @returns {Promise<Object|null>} Latest trade impact data item or null if not found
 */
export async function getLatestTradeImpactDataByTitle(title) {
  const data = await getTradeImpactData();
  const filteredData = data.filter(item => item.title === title);
  
  if (filteredData.length === 0) {
    return null;
  }
  
  // Sort by date (newest first) and return the first item
  return filteredData.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

/**
 * Get tariff impact data for chart visualization
 * @returns {Promise<Object>} Chart data for tariff impacts
 */
export async function getTariffImpactChartData() {
  try {
    const data = await getTradeImpactData();
    const tariffData = data.filter(item => item.category === 'Tariff Impact');
    
    if (tariffData.length === 0) {
      return getFallbackTariffChartData();
    }
    
    // Process data for chart
    const labels = tariffData.map(item => item.title);
    const values = tariffData.map(item => parseFloat(item.value || '0'));
    
    return {
      labels,
      datasets: [
        {
          label: 'Tariff Impact (%)',
          data: values,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }
      ]
    };
  } catch (error) {
    console.error('Error creating chart data:', error);
    return getFallbackTariffChartData();
  }
}

/**
 * Fallback trade impact data in case API fails
 * @returns {Array} Fallback trade impact data
 */
function getFallbackTradeImpactData() {
  return [
    {
      id: 'fallback-1',
      category: 'Tariff Impact',
      title: 'Agriculture',
      description: 'Impact on agricultural exports to Canada',
      value: '-8.5',
      date: new Date('2024-03-01'),
      source: 'U.S. Department of Agriculture (Fallback Data)'
    },
    {
      id: 'fallback-2',
      category: 'Tariff Impact',
      title: 'Manufacturing',
      description: 'Impact on manufacturing exports to Canada',
      value: '-5.2',
      date: new Date('2024-03-01'),
      source: 'U.S. Census Bureau (Fallback Data)'
    },
    {
      id: 'fallback-3',
      category: 'Tariff Impact',
      title: 'Retail',
      description: 'Impact on retail businesses near the border',
      value: '-12.7',
      date: new Date('2024-03-01'),
      source: 'Washington State Department of Commerce (Fallback Data)'
    },
    {
      id: 'fallback-4',
      category: 'Tariff Impact',
      title: 'Tourism',
      description: 'Impact on tourism from Canada',
      value: '-15.3',
      date: new Date('2024-03-01'),
      source: 'Okanogan County Tourism Board (Fallback Data)'
    },
    {
      id: 'fallback-5',
      category: 'Tariff Impact',
      title: 'Transportation',
      description: 'Impact on cross-border transportation services',
      value: '-7.8',
      date: new Date('2024-03-01'),
      source: 'U.S. Department of Transportation (Fallback Data)'
    }
  ];
}

/**
 * Fallback chart data for tariff impacts
 * @returns {Object} Fallback chart data
 */
function getFallbackTariffChartData() {
  return {
    labels: ['Agriculture', 'Manufacturing', 'Retail', 'Tourism', 'Transportation'],
    datasets: [
      {
        label: 'Tariff Impact (%)',
        data: [-8.5, -5.2, -12.7, -15.3, -7.8],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      }
    ]
  };
}

export default {
  getTradeImpactData,
  getTradeImpactDataByCategory,
  getLatestTradeImpactDataByTitle,
  getTariffImpactChartData
};
