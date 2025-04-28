'use client';

import React from 'react';
import Link from 'next/link';
import { newsCategories } from '@/data/news';

interface NewsCategoryListProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const NewsCategoryList: React.FC<NewsCategoryListProps> = ({
  activeCategory = 'All Categories',
  onCategoryChange
}) => {
  // Handle category click
  const handleCategoryClick = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Categories</h3>
      <div className="space-y-2">
        <button
          className={`block w-full text-left px-3 py-2 rounded-md ${
            activeCategory === 'All Categories'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleCategoryClick('All Categories')}
        >
          All Categories
        </button>
        
        {newsCategories.map((category) => (
          <button
            key={category}
            className={`block w-full text-left px-3 py-2 rounded-md ${
              activeCategory === category
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsCategoryList;
