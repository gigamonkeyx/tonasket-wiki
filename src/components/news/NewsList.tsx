'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/data/news';
import { formatDate } from '@/utils/dateUtils';

interface NewsListProps {
  articles: NewsArticle[];
  showImage?: boolean;
  showCategory?: boolean;
  showSource?: boolean;
  maxItems?: number;
}

const NewsList: React.FC<NewsListProps> = ({
  articles,
  showImage = true,
  showCategory = true,
  showSource = true,
  maxItems
}) => {
  // Limit the number of articles if maxItems is provided
  const displayArticles = maxItems ? articles.slice(0, maxItems) : articles;
  
  return (
    <div className="space-y-6">
      {displayArticles.map((article) => (
        <div 
          key={article.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            {showImage && (
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="relative h-48 md:h-32 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-opacity duration-300"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400 dark:text-gray-500 text-4xl">📰</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className={showImage ? "md:w-3/4 md:pl-6" : "w-full"}>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{formatDate(article.publishedAt)}</span>
                
                {showCategory && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </>
                )}
                
                {showSource && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{article.source}</span>
                  </>
                )}
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
          </div>
        </div>
      ))}
      
      {displayArticles.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300">No news articles found.</p>
        </div>
      )}
    </div>
  );
};

export default NewsList;
