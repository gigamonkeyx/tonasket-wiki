'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/data/news';
import { formatDate } from '@/utils/dateUtils';
import NewsCard from './NewsCard';

interface FeaturedNewsProps {
  articles: NewsArticle[];
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ articles }) => {
  // Ensure we have at least 4 articles
  if (articles.length < 1) {
    return null;
  }
  
  // Get the main featured article and the rest
  const mainArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Featured Stories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Featured Article */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 md:h-80 bg-gray-200 dark:bg-gray-700">
            {mainArticle.imageUrl ? (
              <Image
                src={mainArticle.imageUrl}
                alt={mainArticle.title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400 dark:text-gray-500 text-6xl">📰</span>
              </div>
            )}
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="text-sm text-white flex items-center mb-2">
                <span>{formatDate(mainArticle.publishedAt)}</span>
                <span className="mx-2">•</span>
                <span>{mainArticle.category}</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {mainArticle.title}
              </h3>
              <p className="text-white/80 mb-4 line-clamp-2">
                {mainArticle.summary}
              </p>
              <Link
                href={`/news/${mainArticle.id}`}
                className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded transition-colors"
              >
                Read Full Story →
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Articles */}
        <div className="space-y-6">
          {secondaryArticles.map((article) => (
            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{formatDate(article.publishedAt)}</span>
                <span className="mx-2">•</span>
                <span>{article.category}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                <Link href={`/news/${article.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                {article.summary}
              </p>
              <Link
                href={`/news/${article.id}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedNews;
