'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { newsArticles, newsCategories } from '@/data/news';
import NewsList from '@/components/news/NewsList';
import NewsPagination from '@/components/news/NewsPagination';
import NewsSourcesList from '@/components/news/NewsSourcesList';

export default function NewsCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.category as string;
  
  // Convert slug to category name (e.g., "local-news" to "Local News")
  const getCategoryFromSlug = (slug: string): string => {
    const formattedSlug = slug.replace(/-/g, ' ').toLowerCase();
    
    // Find matching category (case insensitive)
    const matchedCategory = newsCategories.find(
      category => category.toLowerCase() === formattedSlug
    );
    
    return matchedCategory || 'Unknown Category';
  };
  
  const categoryName = getCategoryFromSlug(categorySlug);
  
  // Filter articles by category
  const categoryArticles = newsArticles.filter(
    article => article.category.toLowerCase() === categoryName.toLowerCase()
  );
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(categoryArticles.length / 5));
  const articlesPerPage = 5;
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the news list
    document.getElementById('category-news-list')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Get current articles for pagination
  const getCurrentArticles = () => {
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    return categoryArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  };
  
  // If category not found or no articles, show message
  if (categoryName === 'Unknown Category' || categoryArticles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
          <div className="container mx-auto px-4">
            <Link 
              href="/news"
              className="inline-flex items-center text-blue-200 hover:text-white mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryName}</h1>
            <p className="text-xl max-w-3xl">
              News and updates related to {categoryName.toLowerCase()} in Tonasket and the Okanogan Valley.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No Articles Found</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {categoryName === 'Unknown Category'
                ? "The category you are looking for does not exist."
                : `There are currently no articles in the ${categoryName} category.`}
            </p>
            <Link 
              href="/news"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All News
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Link 
            href="/news"
            className="inline-flex items-center text-blue-200 hover:text-white mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryName}</h1>
          <p className="text-xl max-w-3xl">
            News and updates related to {categoryName.toLowerCase()} in Tonasket and the Okanogan Valley.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* News List */}
          <div id="category-news-list" className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {categoryName} News
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {categoryArticles.length} {categoryArticles.length === 1 ? 'article' : 'articles'} found
              </div>
            </div>
            
            <NewsList articles={getCurrentArticles()} />
            
            {/* Pagination */}
            {categoryArticles.length > articlesPerPage && (
              <NewsPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-6">
            {/* Other Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Other Categories</h3>
              <div className="space-y-2">
                <Link 
                  href="/news"
                  className="block text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md transition-colors"
                >
                  All News
                </Link>
                
                {newsCategories
                  .filter(category => category.toLowerCase() !== categoryName.toLowerCase())
                  .map((category) => (
                    <Link 
                      key={category}
                      href={`/news/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md transition-colors"
                    >
                      {category}
                    </Link>
                  ))
                }
              </div>
            </div>
            
            {/* News Sources */}
            <NewsSourcesList compact />
          </div>
        </div>
      </div>
    </div>
  );
}
