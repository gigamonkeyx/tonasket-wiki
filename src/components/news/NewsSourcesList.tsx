'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { newsSources } from '@/data/news';

interface NewsSourcesListProps {
  compact?: boolean;
}

const NewsSourcesList: React.FC<NewsSourcesListProps> = ({ compact = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">News Sources</h3>
      
      <div className="space-y-4">
        {newsSources.map((source) => (
          <div key={source.id} className="flex items-center">
            {source.logo && !compact ? (
              <div className="flex-shrink-0 w-12 h-12 mr-4 relative">
                <Image
                  src={source.logo}
                  alt={source.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-opacity duration-300"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {source.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-grow">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {source.name}
              </a>
              
              {!compact && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {source.type.charAt(0).toUpperCase() + source.type.slice(1)} News
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {!compact && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            These news sources are regularly monitored to provide you with the latest news and information about Tonasket and the surrounding area.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsSourcesList;
