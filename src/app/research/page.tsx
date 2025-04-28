'use client';

import React, { useState, useEffect } from 'react';
import DatasetGrid from '@/components/research/DatasetGrid';
import CategoryFilter from '@/components/research/CategoryFilter';
import SourceFilter from '@/components/research/SourceFilter';
import SearchBar from '@/components/research/SearchBar';

// Import types from our data file
import { Dataset as DatasetType, DatasetSource, DatasetCategory } from '@/data/research';

export default function ResearchPage() {
  const [datasets, setDatasets] = useState<DatasetType[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<DatasetType[]>([]);
  const [categories, setCategories] = useState<DatasetCategory[]>([]);
  const [sources, setSources] = useState<DatasetSource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all datasets, categories, and sources
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch datasets
        const datasetsResponse = await fetch('/api/research/datasets');
        if (!datasetsResponse.ok) {
          throw new Error('Failed to fetch datasets');
        }
        const datasetsData = await datasetsResponse.json();
        setDatasets(datasetsData);
        setFilteredDatasets(datasetsData);

        // Fetch categories
        const categoriesResponse = await fetch('/api/research/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch sources
        const sourcesResponse = await fetch('/api/research/sources');
        if (!sourcesResponse.ok) {
          throw new Error('Failed to fetch sources');
        }
        const sourcesData = await sourcesResponse.json();
        setSources(sourcesData);

        setError(null);
      } catch (err) {
        console.error('Error fetching research data:', err);
        setError('Failed to load research data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters when category, source, or search query changes
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...datasets];

      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter(dataset => dataset.categoryId === selectedCategory);
      }

      // Apply source filter
      if (selectedSource) {
        filtered = filtered.filter(dataset => dataset.sourceId === selectedSource);
      }

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(dataset =>
          dataset.title.toLowerCase().includes(query) ||
          dataset.description.toLowerCase().includes(query) ||
          dataset.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      setFilteredDatasets(filtered);
    };

    applyFilters();
  }, [datasets, selectedCategory, selectedSource, searchQuery]);

  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Handle source selection
  const handleSourceSelect = (source: string | null) => {
    setSelectedSource(source);
  };

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Research Data</h1>
          <p className="text-xl max-w-3xl">
            Explore datasets relevant to Tonasket and Okanogan County from various public sources.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 space-y-8">
                  <SearchBar
                    query={searchQuery}
                    onQueryChange={handleSearchChange}
                  />

                  <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                  />

                  <SourceFilter
                    sources={sources}
                    selectedSource={selectedSource}
                    onSelectSource={handleSourceSelect}
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                      {loading ? 'Loading Datasets...' : `${filteredDatasets.length} Datasets Found`}
                    </h2>

                    {(selectedCategory || selectedSource || searchQuery) && (
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setSelectedSource(null);
                          setSearchQuery('');
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <DatasetGrid datasets={filteredDatasets} />
                  )}
                </div>
              </div>
            </div>

            {/* About Research Data */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About Our Research Data</h2>
              <p className="mb-4 text-black">
                The Tonasket Resource Wiki provides access to a curated collection of public datasets
                relevant to Tonasket and Okanogan County. These datasets come from various sources,
                including federal agencies, state government, and other public data repositories.
              </p>
              <p className="mb-4 text-black">
                Our goal is to make it easier for residents, businesses, researchers, and policymakers
                to find and use data that can help inform decisions and understand trends affecting
                our community.
              </p>
              <p className="text-black">
                We've rated each dataset's relevance to Tonasket specifically, to help you find the
                most applicable information for local research and analysis.
              </p>
            </div>

            {/* Data Sources */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Data Sources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Awesome Public Datasets</h3>
                  <p className="text-sm text-black mb-4">
                    A curated list of high-quality open datasets from various domains,
                    maintained by the open data community.
                  </p>
                  <a
                    href="https://github.com/awesomedata/awesome-public-datasets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Visit Source →
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Washington State Open Data Portal</h3>
                  <p className="text-sm text-black mb-4">
                    Official open data from Washington State government agencies,
                    including economic, environmental, and demographic information.
                  </p>
                  <a
                    href="https://data.wa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Visit Source →
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">US Census Bureau</h3>
                  <p className="text-sm text-black mb-4">
                    Comprehensive demographic, economic, and housing data for the United States,
                    including detailed information for Okanogan County.
                  </p>
                  <a
                    href="https://www.census.gov/data.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Visit Source →
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">USDA Economic Research Service</h3>
                  <p className="text-sm text-black mb-4">
                    Agricultural and rural economy data, including farm income, agricultural
                    production, and rural development statistics.
                  </p>
                  <a
                    href="https://www.ers.usda.gov/data-products/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Visit Source →
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
