/**
 * Service for fetching and managing economic data
 */

// Cache for economic data
const economicDataCache = {
  data: null,
  timestamp: null,
  // Cache expiration time: 1 hour
  expirationTime: 60 * 60 * 1000
};

/**
 * Get all economic data
 * Uses cache if available, otherwise fetches from API
 * @returns {Promise<Array>} Economic data
 */
export async function getEconomicData() {
  // Check cache first
  if (economicDataCache.data && 
      economicDataCache.timestamp && 
      (Date.now() - economicDataCache.timestamp < economicDataCache.expirationTime)) {
    return economicDataCache.data;
  }
  
  try {
    // Fetch from API if not in cache
    const response = await fetch('/api/economic-data');
    
    if (!response.ok) {
      throw new Error(`Economic data API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Cache the data
    economicDataCache.data = data;
    economicDataCache.timestamp = Date.now();
    
    return data;
  } catch (error) {
    console.error('Error fetching economic data:', error);
    
    // Return fallback data if API fails
    return getFallbackEconomicData();
  }
}

/**
 * Get economic data by category
 * @param {string} category - Category of economic data
 * @returns {Promise<Array>} Filtered economic data
 */
export async function getEconomicDataByCategory(category) {
  const data = await getEconomicData();
  return data.filter(item => item.category === category);
}

/**
 * Get latest economic data by title
 * @param {string} title - Title of economic data
 * @returns {Promise<Object|null>} Latest economic data item or null if not found
 */
export async function getLatestEconomicDataByTitle(title) {
  const data = await getEconomicData();
  const filteredData = data.filter(item => item.title === title);
  
  if (filteredData.length === 0) {
    return null;
  }
  
  // Sort by date (newest first) and return the first item
  return filteredData.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

/**
 * Fallback economic data in case API fails
 * @returns {Array} Fallback economic data
 */
function getFallbackEconomicData() {
  return [
    {
      id: 'fallback-1',
      category: 'Employment',
      title: 'Unemployment Rate',
      value: '5.2%',
      date: new Date('2024-03-01'),
      source: 'Bureau of Labor Statistics (Fallback Data)'
    },
    {
      id: 'fallback-2',
      category: 'Employment',
      title: 'Labor Force Participation',
      value: '58.7%',
      date: new Date('2024-03-01'),
      source: 'Bureau of Labor Statistics (Fallback Data)'
    },
    {
      id: 'fallback-3',
      category: 'Housing',
      title: 'Median Home Value',
      value: '$215,000',
      date: new Date('2024-03-01'),
      source: 'Zillow (Fallback Data)'
    },
    {
      id: 'fallback-4',
      category: 'Housing',
      title: 'Homeownership Rate',
      value: '62.4%',
      date: new Date('2024-03-01'),
      source: 'U.S. Census Bureau (Fallback Data)'
    },
    {
      id: 'fallback-5',
      category: 'Housing',
      title: 'Median Rent',
      value: '$895',
      date: new Date('2024-03-01'),
      source: 'Zillow (Fallback Data)'
    }
  ];
}

export default {
  getEconomicData,
  getEconomicDataByCategory,
  getLatestEconomicDataByTitle
};
