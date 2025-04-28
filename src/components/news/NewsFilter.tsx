'use client';

import React, { useState } from 'react';
import { newsCategories, newsSources } from '@/data/news';

interface NewsFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    source: string;
    sortBy: 'newest' | 'oldest' | 'relevance';
  }) => void;
  initialFilters?: {
    search: string;
    category: string;
    source: string;
    sortBy: 'newest' | 'oldest' | 'relevance';
  };
}

const NewsFilter: React.FC<NewsFilterProps> = ({
  onFilterChange,
  initialFilters = {
    search: '',
    category: 'All Categories',
    source: 'All Sources',
    sortBy: 'newest'
  }
}) => {
  const [search, setSearch] = useState(initialFilters.search);
  const [category, setCategory] = useState(initialFilters.category);
  const [source, setSource] = useState(initialFilters.source);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'relevance'>(initialFilters.sortBy);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  // Handle category selection change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  
  // Handle source selection change
  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(e.target.value);
  };
  
  // Handle sort selection change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'newest' | 'oldest' | 'relevance');
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search, category, source, sortBy });
  };
  
  // Handle reset filters
  const handleReset = () => {
    setSearch('');
    setCategory('All Categories');
    setSource('All Sources');
    setSortBy('newest');
    onFilterChange({
      search: '',
      category: 'All Categories',
      source: 'All Sources',
      sortBy: 'newest'
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search news articles..."
              value={search}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="w-full md:w-1/4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="All Categories">All Categories</option>
              {newsCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-1/4">
            <label htmlFor="source" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Source
            </label>
            <select
              id="source"
              value={source}
              onChange={handleSourceChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="All Sources">All Sources</option>
              {newsSources.map((src) => (
                <option key={src.id} value={src.name}>
                  {src.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewsFilter;
