'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/data/news';
import { formatDate } from '@/utils/dateUtils';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
  compact?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  article, 
  featured = false,
  compact = false
}) => {
  const {
    id,
    title,
    summary,
    source,
    sourceUrl,
    imageUrl,
    publishedAt,
    category,
    author
  } = article;
  
  // Format the date
  const formattedDate = formatDate(publishedAt);
  
  // Determine image height based on card type
  const imageHeight = featured ? 'h-64' : compact ? 'h-32' : 'h-48';
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'h-full' : ''}`}>
      <div className={`relative ${imageHeight} bg-gray-200 dark:bg-gray-700`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-opacity duration-300"
            sizes={featured ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 dark:text-gray-500 text-4xl">📰</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-xs text-white flex items-center">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{category}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2`}>
          {title}
        </h3>
        
        {!compact && (
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {summary}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {source}
            {author && ` • ${author}`}
          </div>
          
          <Link
            href={`/news/${id}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
