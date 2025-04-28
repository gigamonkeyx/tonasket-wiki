'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { businesses } from '@/data/businesses';
import { fetchEnrichedBusinesses, refreshEnrichedBusinesses } from '@/services/enrichedBusinessService';
import BusinessCard from '@/components/BusinessCard';
import EnrichedBusinessCard from '@/components/EnrichedBusinessCard';
import BusinessList from '@/components/BusinessList';
import BusinessFilter from '@/components/BusinessFilter';

export default function BusinessesPage() {
  // State for businesses data
  const [allBusinesses, setAllBusinesses] = useState(businesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [featuredBusinesses, setFeaturedBusinesses] = useState(businesses.filter(b => b.featured));

  // State for data source and loading
  const [dataSource, setDataSource] = useState<string>('static_data');
  const [sourceDetails, setSourceDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(businesses.length / 10));

  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    subcategory: ''
  });

  // Fetch enriched business data on component mount
  useEffect(() => {
    async function loadEnrichedBusinesses() {
      setIsLoading(true);
      try {
        // Clear source details first to prevent stale data
        setSourceDetails(null);

        const response = await fetchEnrichedBusinesses('98855', 100);

        // Process the response only if it contains businesses
        if (response && response.businesses && response.businesses.length > 0) {
          // Update business data
          setAllBusinesses(response.businesses);
          setFilteredBusinesses(response.businesses);
          setFeaturedBusinesses(response.businesses.filter(b => b.featured));

          // Update pagination
          setTotalPages(Math.ceil(response.businesses.length / 10));

          // Update data source information
          setDataSource(response.source || 'unknown');

          // Wait a moment before updating source details to ensure UI stability
          setTimeout(() => {
            setSourceDetails(response.sourceDetails || null);
            setLastUpdated(response.timestamp || new Date().toISOString());
          }, 100);
        }
      } catch (error) {
        console.error('Error loading enriched businesses:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadEnrichedBusinesses();
  }, []);

  // Function to refresh business data from external sources
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      // First, clear the source details to prevent stale data display during refresh
      setSourceDetails(null);

      const response = await refreshEnrichedBusinesses('98855', 100);

      // Process the response only if it contains businesses
      if (response && response.businesses && response.businesses.length > 0) {
        // Update all businesses
        setAllBusinesses(response.businesses);

        // Re-apply current filters to the new data
        let results = [...response.businesses];

        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          results = results.filter(business =>
            business.name.toLowerCase().includes(searchTerm) ||
            business.description.toLowerCase().includes(searchTerm) ||
            (business.tags && business.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
          );
        }

        if (filters.category && filters.category !== 'All Categories') {
          results = results.filter(business => business.category === filters.category);
        }

        if (filters.subcategory) {
          results = results.filter(business => business.subcategory === filters.subcategory);
        }

        // Update filtered businesses
        setFilteredBusinesses(results);

        // Update featured businesses
        setFeaturedBusinesses(
          filters.category !== 'All Categories' || filters.subcategory
            ? results.filter(b => b.featured)
            : response.businesses.filter(b => b.featured)
        );

        // Update pagination
        setTotalPages(Math.ceil(results.length / 10));

        // Update data source information
        setDataSource(response.source || 'unknown');

        // Wait a moment before updating source details to ensure UI stability
        setTimeout(() => {
          setSourceDetails(response.sourceDetails || null);
          setLastUpdated(response.timestamp || new Date().toISOString());
        }, 100);
      }
    } catch (error) {
      console.error('Error refreshing business data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: {
    search: string;
    category: string;
    subcategory: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change

    // Apply filters
    let results = [...allBusinesses];

    // Filter by search term
    if (newFilters.search) {
      const searchTerm = newFilters.search.toLowerCase();
      results = results.filter(business =>
        business.name.toLowerCase().includes(searchTerm) ||
        business.description.toLowerCase().includes(searchTerm) ||
        (business.tags && business.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
        (business.services && business.services.some(service => service.toLowerCase().includes(searchTerm))) ||
        (business.products && business.products.some(product => product.toLowerCase().includes(searchTerm)))
      );
    }

    // Filter by category
    if (newFilters.category && newFilters.category !== 'All Categories') {
      results = results.filter(business => business.category === newFilters.category);
    }

    // Filter by subcategory
    if (newFilters.subcategory) {
      results = results.filter(business => business.subcategory === newFilters.subcategory);
    }

    // Update filtered businesses
    setFilteredBusinesses(results);
    setTotalPages(Math.ceil(results.length / 10));

    // Update featured businesses (only if category or subcategory filters are applied)
    if (newFilters.category !== 'All Categories' || newFilters.subcategory) {
      setFeaturedBusinesses(results.filter(b => b.featured));
    } else {
      setFeaturedBusinesses(allBusinesses.filter(b => b.featured));
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the business listings section
    document.getElementById('business-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Directory</h1>
              <p className="text-xl max-w-3xl">
                Explore local businesses, services, and opportunities in the Tonasket area.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                href="/businesses/map"
                className="inline-flex items-center bg-white text-blue-800 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                View Map
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <BusinessFilter
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Data Source Information */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Business Data Source</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Source: <span className="font-medium text-gray-900 dark:text-white">{dataSource.replace(/_/g, ' ')}</span>
                {lastUpdated && (
                  <> • Last updated: <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(lastUpdated).toLocaleString()}
                  </span></>
                )}
              </div>
            </div>
            <button
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className={`mt-3 md:mt-0 px-4 py-2 rounded-md text-sm font-medium ${
                isRefreshing
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
              }`}
            >
              {isRefreshing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                'Refresh Business Data'
              )}
            </button>
          </div>

          {sourceDetails ? (
            <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-1">Total Businesses</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{sourceDetails.count || 0}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-1">Data Age</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{sourceDetails.dataAge || 'unknown'}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-1">Categories</div>
                  {sourceDetails.categories && Object.keys(sourceDetails.categories).length > 0 ? (
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                      {Object.entries(sourceDetails.categories).slice(0, 5).map(([category, count]: [string, any]) => (
                        <span key={category} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {category}: {count}
                        </span>
                      ))}
                      {Object.keys(sourceDetails.categories).length > 5 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          +{Object.keys(sourceDetails.categories).length - 5} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">No category data available</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Detailed source information not available
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Featured Businesses */}
            {featuredBusinesses.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Featured Businesses</h2>
                {/*
                  Display logic:
                  - If we have 1-3 businesses, show them in a single row (lg:grid-cols-3)
                  - If we have 4-6 businesses, show them in two rows (lg:grid-cols-3)
                  - If we have more than 6, only show the first 6 to keep the grid balanced
                */}
                <div className={`grid grid-cols-1 md:grid-cols-2 ${featuredBusinesses.length <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} gap-6`}>
                  {featuredBusinesses.slice(0, featuredBusinesses.length <= 3 ? 3 : Math.min(6, featuredBusinesses.length)).map(business => (
                    <EnrichedBusinessCard
                      key={business.id}
                      business={business}
                      featured={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Business Listings */}
            <div id="business-listings">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {filters.category !== 'All Categories'
                    ? `${filters.category} Businesses`
                    : 'All Businesses'}
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'} found
                </div>
              </div>

              <BusinessList
                businesses={filteredBusinesses}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}


        {/* Business Owner Actions */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Business Owner?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you own a business in the Tonasket area, you can add your business to our directory or claim an existing listing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Add Your Business</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Not listed in our directory? Submit your business information to be included in the Tonasket Business Directory.
              </p>
              <Link
                href="/businesses/submit"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Business
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Claim Your Listing</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Already listed? Claim your business to update information, respond to reviews, and access analytics.
              </p>
              <Link
                href="/businesses/claim"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Claim Business
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About the Business Directory</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The Tonasket Business Directory is a comprehensive resource for finding local businesses, services, and organizations in the Tonasket area.
            Our directory includes detailed information about each business, including contact information, hours of operation, and services offered.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our data is enriched from multiple sources including official business records, online business profiles, and direct submissions from business owners.
            This ensures the most accurate and up-to-date information for our users.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Link
              href="/economic-data"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              View Economic Data
            </Link>
            <Link
              href="/economic-data?tab=comparison"
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
            >
              Compare Economic Metrics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
