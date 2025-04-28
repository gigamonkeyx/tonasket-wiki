'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { newsArticles } from '@/data/news';
import { formatDate } from '@/utils/dateUtils';
import NewsCard from '@/components/news/NewsCard';

export default function NewsArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;
  
  // Find the article by ID
  const article = newsArticles.find(a => a.id === articleId);
  
  // If article not found, show error
  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Article Not Found</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link 
            href="/news"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to News
          </Link>
        </div>
      </div>
    );
  }
  
  // Get related articles (same category, excluding current article)
  const relatedArticles = newsArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Link 
                href="/news"
                className="inline-flex items-center text-blue-200 hover:text-white mb-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to News
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>
              <div className="flex flex-wrap items-center mt-2 text-sm">
                <span>{formatDate(article.publishedAt)}</span>
                <span className="mx-2">•</span>
                <span className="inline-block bg-blue-700 text-blue-100 text-xs px-2 py-1 rounded">
                  {article.category}
                </span>
                {article.author && (
                  <>
                    <span className="mx-2">•</span>
                    <span>By {article.author}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
              {/* Article Image */}
              {article.imageUrl && (
                <div className="relative h-64 md:h-96 bg-gray-200 dark:bg-gray-700">
                  <Image 
                    src={article.imageUrl} 
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority
                  />
                </div>
              )}
              
              {/* Article Content */}
              <div className="p-6">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">
                    {article.summary}
                  </p>
                  
                  {article.content ? (
                    <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                      {article.content}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Full article content not available.
                    </p>
                  )}
                </div>
                
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Source */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Source: {' '}
                    <a 
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {article.source}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Share and Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Share This Article</h3>
                  <div className="flex space-x-4">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </button>
                    <button className="text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </button>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 110-3.096 1.548 1.548 0 010 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
                      </svg>
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div>
                  <Link 
                    href={`/news/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    More {article.category} News
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Related Articles */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Related Articles</h3>
              
              {relatedArticles.length > 0 ? (
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <div key={relatedArticle.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                      <Link 
                        href={`/news/${relatedArticle.id}`}
                        className="block hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 p-2 rounded transition-colors"
                      >
                        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(relatedArticle.publishedAt)}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No related articles found.
                </p>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/news"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  View All News →
                </Link>
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">News Categories</h3>
              
              <div className="space-y-2">
                <Link 
                  href="/news"
                  className="block text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md transition-colors"
                >
                  All Categories
                </Link>
                
                {['Local News', 'Business', 'Agriculture', 'Community', 'Education'].map((category) => (
                  <Link 
                    key={category}
                    href={`/news/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      category === article.category
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
