/**
 * Dataset Service
 * 
 * This service manages research datasets from various sources,
 * including Awesome Public Datasets and government data sources.
 */

// Categories of datasets
export const DATASET_CATEGORIES = {
  AGRICULTURE: 'Agriculture',
  CLIMATE: 'Climate/Weather',
  ECONOMICS: 'Economics',
  DEMOGRAPHICS: 'Demographics',
  EDUCATION: 'Education',
  ENVIRONMENT: 'Environment',
  GOVERNMENT: 'Government',
  HEALTH: 'Health',
  HOUSING: 'Housing',
  TRANSPORTATION: 'Transportation',
  MISC: 'Miscellaneous'
};

// Dataset sources
export const DATASET_SOURCES = {
  AWESOME_PUBLIC: 'Awesome Public Datasets',
  CENSUS: 'US Census Bureau',
  BLS: 'Bureau of Labor Statistics',
  USDA: 'USDA Economic Research Service',
  WA_STATE: 'Washington State Open Data Portal',
  COUNTY: 'Okanogan County',
  OTHER: 'Other'
};

// Awesome Public Datasets - curated list relevant to Tonasket
const awesomePublicDatasets = [
  {
    id: 'ap-001',
    title: 'USDA/NASS QuickStats',
    description: 'Agricultural data including crops, livestock, and farm economics',
    category: DATASET_CATEGORIES.AGRICULTURE,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://quickstats.nass.usda.gov/',
    format: ['CSV', 'API'],
    lastUpdated: '2023-12-01',
    relevance: 'High - Contains county-level agricultural data for Okanogan County'
  },
  {
    id: 'ap-002',
    title: 'NOAA Climate Data',
    description: 'Historical weather and climate data for the United States',
    category: DATASET_CATEGORIES.CLIMATE,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://www.ncdc.noaa.gov/cdo-web/',
    format: ['CSV', 'JSON', 'API'],
    lastUpdated: '2023-12-15',
    relevance: 'High - Contains historical weather data for Tonasket area'
  },
  {
    id: 'ap-003',
    title: 'US Census Bureau American Community Survey',
    description: 'Demographic, social, economic, and housing data',
    category: DATASET_CATEGORIES.DEMOGRAPHICS,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://www.census.gov/programs-surveys/acs',
    format: ['CSV', 'API'],
    lastUpdated: '2023-09-14',
    relevance: 'High - Contains detailed demographic data for Tonasket and Okanogan County'
  },
  {
    id: 'ap-004',
    title: 'Bureau of Economic Analysis Regional Data',
    description: 'GDP, personal income, and employment data by region',
    category: DATASET_CATEGORIES.ECONOMICS,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://www.bea.gov/data/by-place-county-metro-local',
    format: ['CSV', 'XLS'],
    lastUpdated: '2023-11-16',
    relevance: 'Medium - Contains county-level economic data'
  },
  {
    id: 'ap-005',
    title: 'USGS Water Data',
    description: 'Surface and groundwater data for the United States',
    category: DATASET_CATEGORIES.ENVIRONMENT,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://waterdata.usgs.gov/nwis',
    format: ['CSV', 'JSON', 'API'],
    lastUpdated: '2023-12-20',
    relevance: 'Medium - Contains water data for Okanogan River and local watersheds'
  },
  {
    id: 'ap-006',
    title: 'National Bridge Inventory',
    description: 'Data on all bridges and tunnels in the United States',
    category: DATASET_CATEGORIES.TRANSPORTATION,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://www.fhwa.dot.gov/bridge/nbi.cfm',
    format: ['CSV'],
    lastUpdated: '2023-06-01',
    relevance: 'Low - Contains data on bridges in Okanogan County'
  },
  {
    id: 'ap-007',
    title: 'USDA ERS County-Level Data Sets',
    description: 'Economic data for rural and agricultural counties',
    category: DATASET_CATEGORIES.ECONOMICS,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://www.ers.usda.gov/data-products/county-level-data-sets/',
    format: ['XLS', 'CSV'],
    lastUpdated: '2023-10-05',
    relevance: 'High - Specific economic data for rural counties like Okanogan'
  },
  {
    id: 'ap-008',
    title: 'CDC WONDER',
    description: 'Public health data including mortality, vaccinations, and population',
    category: DATASET_CATEGORIES.HEALTH,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://wonder.cdc.gov/',
    format: ['CSV', 'API'],
    lastUpdated: '2023-11-30',
    relevance: 'Medium - Contains county-level health statistics'
  },
  {
    id: 'ap-009',
    title: 'Department of Education College Scorecard',
    description: 'Data on colleges and universities in the United States',
    category: DATASET_CATEGORIES.EDUCATION,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://collegescorecard.ed.gov/data/',
    format: ['CSV', 'API'],
    lastUpdated: '2023-07-19',
    relevance: 'Low - Limited higher education in immediate Tonasket area'
  },
  {
    id: 'ap-010',
    title: 'HUD Housing Data',
    description: 'Housing affordability, homelessness, and housing market data',
    category: DATASET_CATEGORIES.HOUSING,
    source: DATASET_SOURCES.AWESOME_PUBLIC,
    url: 'https://www.huduser.gov/portal/datasets/cp.html',
    format: ['CSV', 'XLS'],
    lastUpdated: '2023-08-22',
    relevance: 'Medium - Contains housing data for rural areas'
  }
];

// Washington State Open Data Portal datasets
const waStateDatasets = [
  {
    id: 'wa-001',
    title: 'Washington State Employment Data',
    description: 'Employment statistics by county and industry',
    category: DATASET_CATEGORIES.ECONOMICS,
    source: DATASET_SOURCES.WA_STATE,
    url: 'https://data.wa.gov/Labor/Employment-estimates-for-Washington-State-counties-/hvqh-t8rx',
    format: ['CSV', 'JSON', 'API'],
    lastUpdated: '2023-11-15',
    relevance: 'High - Contains employment data for Okanogan County'
  },
  {
    id: 'wa-002',
    title: 'Washington Agricultural Production',
    description: 'Agricultural production statistics by county',
    category: DATASET_CATEGORIES.AGRICULTURE,
    source: DATASET_SOURCES.WA_STATE,
    url: 'https://agr.wa.gov/departments/business-and-marketing-support/statistics',
    format: ['PDF', 'XLS'],
    lastUpdated: '2023-06-30',
    relevance: 'High - Contains agricultural data for Okanogan County'
  },
  {
    id: 'wa-003',
    title: 'Washington State School District Data',
    description: 'Education statistics for school districts in Washington',
    category: DATASET_CATEGORIES.EDUCATION,
    source: DATASET_SOURCES.WA_STATE,
    url: 'https://data.wa.gov/Education/Report-Card-Enrollment-2019-20-School-Year/nq43-8hgj',
    format: ['CSV', 'JSON', 'API'],
    lastUpdated: '2023-09-01',
    relevance: 'Medium - Contains data for Tonasket School District'
  }
];

// Combined datasets
const allDatasets = [...awesomePublicDatasets, ...waStateDatasets];

/**
 * Get all available datasets
 * @returns {Array} All datasets
 */
export function getAllDatasets() {
  return allDatasets;
}

/**
 * Get datasets by category
 * @param {string} category Category to filter by
 * @returns {Array} Filtered datasets
 */
export function getDatasetsByCategory(category) {
  return allDatasets.filter(dataset => dataset.category === category);
}

/**
 * Get datasets by source
 * @param {string} source Source to filter by
 * @returns {Array} Filtered datasets
 */
export function getDatasetsBySource(source) {
  return allDatasets.filter(dataset => dataset.source === source);
}

/**
 * Get dataset by ID
 * @param {string} id Dataset ID
 * @returns {Object|null} Dataset or null if not found
 */
export function getDatasetById(id) {
  return allDatasets.find(dataset => dataset.id === id) || null;
}

/**
 * Search datasets by query
 * @param {string} query Search query
 * @returns {Array} Matching datasets
 */
export function searchDatasets(query) {
  const lowerQuery = query.toLowerCase();
  return allDatasets.filter(dataset => 
    dataset.title.toLowerCase().includes(lowerQuery) ||
    dataset.description.toLowerCase().includes(lowerQuery) ||
    dataset.category.toLowerCase().includes(lowerQuery) ||
    dataset.source.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all dataset categories
 * @returns {Array} All categories
 */
export function getAllCategories() {
  return Object.values(DATASET_CATEGORIES);
}

/**
 * Get all dataset sources
 * @returns {Array} All sources
 */
export function getAllSources() {
  return Object.values(DATASET_SOURCES);
}

export default {
  getAllDatasets,
  getDatasetsByCategory,
  getDatasetsBySource,
  getDatasetById,
  searchDatasets,
  getAllCategories,
  getAllSources,
  DATASET_CATEGORIES,
  DATASET_SOURCES
};
