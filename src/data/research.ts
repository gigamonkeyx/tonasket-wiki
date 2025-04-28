/**
 * Research data types
 */
export interface Dataset {
  id: string;
  title: string;
  description: string;
  url: string;
  categoryId: string;
  sourceId: string;
  format: string;
  lastUpdated: string;
  coverage: {
    temporal: {
      start: string;
      end: string;
    };
    spatial: string;
  };
  tags: string[];
  featured: boolean;
}

export interface DatasetCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
  count?: number;
}

export interface DatasetSource {
  id: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
}

/**
 * Dataset categories
 */
export const datasetCategories: DatasetCategory[] = [
  {
    id: 'agriculture',
    name: 'Agriculture',
    icon: 'leaf',
    description: 'Agricultural data including crops, livestock, and farm economics'
  },
  {
    id: 'climate',
    name: 'Climate',
    icon: 'cloud-sun',
    description: 'Climate and weather data including temperature, precipitation, and forecasts'
  },
  {
    id: 'demographics',
    name: 'Demographics',
    icon: 'users',
    description: 'Population statistics, census data, and demographic trends'
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: 'chart-line',
    description: 'Economic indicators, employment data, and business statistics'
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'graduation-cap',
    description: 'School performance, enrollment, and educational outcomes'
  },
  {
    id: 'government',
    name: 'Government',
    icon: 'landmark',
    description: 'Government services, budgets, and public administration data'
  },
  {
    id: 'health',
    name: 'Health',
    icon: 'heart-pulse',
    description: 'Health statistics, healthcare access, and public health data'
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: 'road',
    description: 'Transportation, utilities, and public infrastructure data'
  }
];

/**
 * Dataset sources
 */
export const datasetSources: DatasetSource[] = [
  {
    id: 'usda',
    name: 'USDA',
    description: 'United States Department of Agriculture',
    url: 'https://www.usda.gov',
    logo: '/images/sources/usda.png'
  },
  {
    id: 'noaa',
    name: 'NOAA',
    description: 'National Oceanic and Atmospheric Administration',
    url: 'https://www.noaa.gov',
    logo: '/images/sources/noaa.png'
  },
  {
    id: 'census',
    name: 'US Census Bureau',
    description: 'United States Census Bureau',
    url: 'https://www.census.gov',
    logo: '/images/sources/census.png'
  },
  {
    id: 'bls',
    name: 'Bureau of Labor Statistics',
    description: 'U.S. Bureau of Labor Statistics',
    url: 'https://www.bls.gov',
    logo: '/images/sources/bls.png'
  },
  {
    id: 'wa-data',
    name: 'Washington Data',
    description: 'Washington State Open Data Portal',
    url: 'https://data.wa.gov',
    logo: '/images/sources/wa-data.png'
  }
];

/**
 * Research datasets
 */
export const datasets: Dataset[] = [
  {
    id: 'ds001',
    title: 'Okanogan County Agricultural Production',
    description: 'Annual agricultural production statistics for Okanogan County, including crop yields, livestock numbers, and farm income.',
    url: 'https://www.nass.usda.gov/Statistics_by_State/Washington/Publications/County_Profiles/Okanogan.pdf',
    categoryId: 'agriculture',
    sourceId: 'usda',
    format: 'PDF',
    lastUpdated: '2024-01-15',
    coverage: {
      temporal: {
        start: '2018',
        end: '2023'
      },
      spatial: 'Okanogan County, WA'
    },
    tags: ['agriculture', 'crops', 'livestock', 'farm income', 'production'],
    featured: true
  },
  {
    id: 'ds002',
    title: 'Tonasket Area Climate Data',
    description: 'Historical climate data for the Tonasket area, including temperature, precipitation, and growing degree days.',
    url: 'https://www.ncdc.noaa.gov/cdo-web/datasets/GHCND/locations/ZIP:98855/detail',
    categoryId: 'climate',
    sourceId: 'noaa',
    format: 'CSV',
    lastUpdated: '2024-03-01',
    coverage: {
      temporal: {
        start: '1950',
        end: '2023'
      },
      spatial: 'Tonasket, WA (98855)'
    },
    tags: ['climate', 'temperature', 'precipitation', 'weather', 'historical data'],
    featured: true
  },
  {
    id: 'ds003',
    title: 'Okanogan County Demographics',
    description: 'Demographic data for Okanogan County, including population, age distribution, and household characteristics.',
    url: 'https://www.census.gov/quickfacts/fact/table/okanogancountywashington/PST045222',
    categoryId: 'demographics',
    sourceId: 'census',
    format: 'HTML/CSV',
    lastUpdated: '2023-07-01',
    coverage: {
      temporal: {
        start: '2010',
        end: '2022'
      },
      spatial: 'Okanogan County, WA'
    },
    tags: ['demographics', 'population', 'census', 'households', 'age distribution'],
    featured: false
  },
  {
    id: 'ds004',
    title: 'Okanogan County Employment Statistics',
    description: 'Employment data for Okanogan County, including labor force participation, unemployment rates, and employment by industry.',
    url: 'https://esd.wa.gov/labormarketinfo/county-profiles/okanogan',
    categoryId: 'economics',
    sourceId: 'wa-data',
    format: 'HTML/PDF',
    lastUpdated: '2024-02-15',
    coverage: {
      temporal: {
        start: '2015',
        end: '2023'
      },
      spatial: 'Okanogan County, WA'
    },
    tags: ['economics', 'employment', 'unemployment', 'labor force', 'industry'],
    featured: true
  },
  {
    id: 'ds005',
    title: 'Tonasket School District Data',
    description: 'Educational statistics for Tonasket School District, including enrollment, graduation rates, and test scores.',
    url: 'https://washingtonstatereportcard.ospi.k12.wa.us/ReportCard/ViewSchoolOrDistrict/100269',
    categoryId: 'education',
    sourceId: 'wa-data',
    format: 'HTML/CSV',
    lastUpdated: '2023-09-15',
    coverage: {
      temporal: {
        start: '2018',
        end: '2023'
      },
      spatial: 'Tonasket School District, WA'
    },
    tags: ['education', 'schools', 'enrollment', 'graduation rates', 'test scores'],
    featured: false
  }
];

/**
 * Get datasets by category
 */
export function getDatasetsByCategory(categoryId: string): Dataset[] {
  return datasets.filter(dataset => dataset.categoryId === categoryId);
}

/**
 * Get dataset by ID
 */
export function getDatasetById(id: string): Dataset | undefined {
  return datasets.find(dataset => dataset.id === id);
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): DatasetCategory | undefined {
  return datasetCategories.find(category => category.id === id);
}

/**
 * Get source by ID
 */
export function getSourceById(id: string): DatasetSource | undefined {
  return datasetSources.find(source => source.id === id);
}

/**
 * Search datasets
 */
export function searchDatasets(query: string): Dataset[] {
  const lowercaseQuery = query.toLowerCase();
  return datasets.filter(dataset => 
    dataset.title.toLowerCase().includes(lowercaseQuery) ||
    dataset.description.toLowerCase().includes(lowercaseQuery) ||
    dataset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get featured datasets
 */
export function getFeaturedDatasets(): Dataset[] {
  return datasets.filter(dataset => dataset.featured);
}

/**
 * Get categories with dataset counts
 */
export function getCategoriesWithCounts(): DatasetCategory[] {
  return datasetCategories.map(category => {
    const count = datasets.filter(dataset => dataset.categoryId === category.id).length;
    return { ...category, count };
  });
}
