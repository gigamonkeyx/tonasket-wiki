'use client';

import React, { useState, useEffect } from 'react';
import { categories, subcategories } from '@/data/businesses';

interface BusinessFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    subcategory: string;
  }) => void;
  initialFilters?: {
    search: string;
    category: string;
    subcategory: string;
  };
}

const BusinessFilter: React.FC<BusinessFilterProps> = ({
  onFilterChange,
  initialFilters = { search: '', category: 'All Categories', subcategory: '' }
}) => {
  const [search, setSearch] = useState(initialFilters.search);
  const [category, setCategory] = useState(initialFilters.category);
  const [subcategory, setSubcategory] = useState(initialFilters.subcategory);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Update available subcategories when category changes
  useEffect(() => {
    if (category === 'All Categories') {
      setAvailableSubcategories([]);
      setSubcategory('');
    } else {
      setAvailableSubcategories(subcategories[category as keyof typeof subcategories] || []);
      setSubcategory('');
    }
  }, [category]);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (search) count++;
    if (category !== 'All Categories') count++;
    if (subcategory) count++;
    setActiveFiltersCount(count);
  }, [search, category, subcategory]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Handle category selection change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  // Handle subcategory selection change
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubcategory(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search, category, subcategory });
  };

  // Handle reset filters
  const handleReset = () => {
    setSearch('');
    setCategory('All Categories');
    setSubcategory('');
    onFilterChange({ search: '', category: 'All Categories', subcategory: '' });
  };

  // Toggle advanced filters
  const toggleAdvancedFilters = () => {
    setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-6">
        {/* Basic Search */}
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Businesses
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Search by name, description, or tags..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                aria-label="Search businesses"
              />
            </div>
          </div>

          <div className="flex gap-2 self-end">
            <button
              type="button"
              onClick={toggleAdvancedFilters}
              className="flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isAdvancedFiltersOpen}
              aria-controls="advanced-filters"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-600 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Search
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div
          id="advanced-filters"
          className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${isAdvancedFiltersOpen ? 'block' : 'hidden'}`}
          aria-hidden={!isAdvancedFiltersOpen}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Category
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                aria-label="Filter by business category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subcategory" className={`block text-sm font-medium mb-2 ${availableSubcategories.length > 0 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                Business Subcategory
              </label>
              <select
                id="subcategory"
                value={subcategory}
                onChange={handleSubcategoryChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 ${
                  availableSubcategories.length > 0
                    ? 'border-gray-300 dark:border-gray-600 dark:text-white'
                    : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
                disabled={availableSubcategories.length === 0}
                aria-label="Filter by business subcategory"
                aria-disabled={availableSubcategories.length === 0}
              >
                <option value="">All Subcategories</option>
                {availableSubcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
              {availableSubcategories.length === 0 && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Select a category first to see available subcategories
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeFiltersCount === 0}
              aria-label="Reset all filters"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BusinessFilter;
