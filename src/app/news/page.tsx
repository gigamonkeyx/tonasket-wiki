'use client';

import React, { useState } from 'react';
import { newsArticles } from '@/data/news';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsList from '@/components/news/NewsList';
import NewsFilter from '@/components/news/NewsFilter';
import NewsCategoryList from '@/components/news/NewsCategoryList';
import NewsSourcesList from '@/components/news/NewsSourcesList';
import NewsPagination from '@/components/news/NewsPagination';

export default function NewsPage() {
  // State for filtered articles
  const [filteredArticles, setFilteredArticles] = useState(newsArticles);
  const [featuredArticles, setFeaturedArticles] = useState(newsArticles.filter(a => a.featured));

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(newsArticles.length / 5));
  const articlesPerPage = 5;

  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    source: 'All Sources',
    sortBy: 'newest' as 'newest' | 'oldest' | 'relevance'
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: {
    search: string;
    category: string;
    source: string;
    sortBy: 'newest' | 'oldest' | 'relevance';
  }) => {
    // Only reset to first page if filters actually changed
    const filtersChanged =
      filters.search !== newFilters.search ||
      filters.category !== newFilters.category ||
      filters.source !== newFilters.source ||
      filters.sortBy !== newFilters.sortBy;
    setFilters(newFilters);
    if (filtersChanged) {
      setCurrentPage(1);
    }
    // Apply filters
    let results = [...newsArticles];

    // Filter by search term
    if (newFilters.search) {
      const searchTerm = newFilters.search.toLowerCase();
      results = results.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.summary.toLowerCase().includes(searchTerm) ||
        (article.content && article.content.toLowerCase().includes(searchTerm)) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    }

    // Filter by category
    if (newFilters.category && newFilters.category !== 'All Categories') {
      results = results.filter(article => article.category === newFilters.category);
    }

    // Filter by source
    if (newFilters.source && newFilters.source !== 'All Sources') {
      results = results.filter(article => article.source === newFilters.source);
    }

    // Sort articles
    if (newFilters.sortBy === 'newest') {
      results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (newFilters.sortBy === 'oldest') {
      results.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    }
    // For 'relevance', we keep the default order if there's a search term, otherwise sort by newest
    else if (!newFilters.search) {
      results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    // Update filtered articles
    setFilteredArticles(results);
    setTotalPages(Math.ceil(results.length / articlesPerPage));

    // Update featured articles (only if category or source filters are applied)
    if (newFilters.category !== 'All Categories' || newFilters.source !== 'All Sources') {
      setFeaturedArticles(results.filter(a => a.featured));
    } else {
      setFeaturedArticles(newsArticles.filter(a => a.featured));
    }
  };

  // Handle category change from sidebar
  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category };
    handleFilterChange(newFilters);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the news list
    if (typeof window !== 'undefined') {
      document.getElementById('news-list')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get current articles for pagination
  const getCurrentArticles = () => {
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    return filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tonasket News</h1>
          <p className="text-xl max-w-3xl">
            Stay informed with the latest news and updates from Tonasket and the Okanogan Valley.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-6">
        <NewsFilter
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Featured News (only show if on first page and no search filters) */}
        {currentPage === 1 && !filters.search && featuredArticles.length > 0 && (
          <FeaturedNews articles={featuredArticles} />
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-6">
            <NewsCategoryList
              activeCategory={filters.category}
              onCategoryChange={handleCategoryChange}
            />

            <NewsSourcesList compact />
          </div>

          {/* News List */}
          <div id="news-list" className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {filters.category !== 'All Categories'
                  ? filters.category
                  : 'Latest News'}
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
              </div>
            </div>

            <NewsList articles={getCurrentArticles()} />

            {/* Pagination */}
            {filteredArticles.length > articlesPerPage && (
              <NewsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
