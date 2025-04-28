'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Business } from '@/data/businesses';
import EnrichedBusinessCard from './EnrichedBusinessCard';

interface BusinessListProps {
  businesses: Business[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BusinessList: React.FC<BusinessListProps> = ({
  businesses,
  currentPage,
  totalPages,
  onPageChange
}) => {
  // State for view mode (list or card)
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, businesses.length);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
        <div className="flex-1">
          {viewMode === 'list' && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5 font-medium text-gray-900 dark:text-white">Business Name & Location</div>
              <div className="col-span-3 font-medium text-gray-900 dark:text-white">Category & Status</div>
              <div className="col-span-4 font-medium text-gray-900 dark:text-white">Contact Information</div>
            </div>
          )}
          {viewMode === 'card' && (
            <div className="font-medium text-gray-900 dark:text-white">
              Showing {startIndex + 1}-{endIndex} of {businesses.length} businesses
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">View:</span>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label="List view"
            title="List view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`p-2 rounded ${
              viewMode === 'card'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label="Card view"
            title="Card view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {businesses.length > 0 ? (
            businesses.slice(startIndex, endIndex).map((business) => (
              <div key={business.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-l-4 border-transparent hover:border-blue-500">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 text-gray-900 dark:text-white font-medium">
                    <div className="flex items-center">
                      {business.featured && (
                        <span className="inline-flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full mr-2">
                          Featured
                        </span>
                      )}
                      <Link href={`/businesses/${business.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {business.name}
                      </Link>
                    </div>
                    {business.address && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {business.address.split(',')[0]}
                      </div>
                    )}
                  </div>
                  <div className="col-span-3 text-gray-700 dark:text-gray-300">
                    <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                      {business.category}
                    </span>
                    {business.subcategory && (
                      <span className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded ml-1 mt-1">
                        {business.subcategory}
                      </span>
                    )}
                    {business.availability && (
                      <div className="mt-1 text-xs">
                        <span className="font-medium">Availability:</span> {business.availability}
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 text-gray-700 dark:text-gray-300">
                    {business.phone && (
                      <div className="mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {business.phone}
                      </div>
                    )}
                    <div className="flex space-x-3">
                      {business.website && (
                        <a
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Website
                        </a>
                      )}
                      {business.email && (
                        <a
                          href={`mailto:${business.email}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No businesses found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="p-6">
          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.slice(startIndex, endIndex).map((business) => (
                <EnrichedBusinessCard
                  key={business.id}
                  business={business}
                  featured={business.featured}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No businesses found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* Legend for availability indicators */}
      {viewMode === 'list' && businesses.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-600 dark:text-gray-400 flex flex-wrap gap-4">
            <span className="flex items-center">
              <span className="inline-block w-5 h-5 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded mr-1">A</span>
              <span>Available</span>
            </span>
            <span className="flex items-center">
              <span className="inline-block w-5 h-5 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded mr-1">The</span>
              <span>By Appointment</span>
            </span>
            <span className="flex items-center">
              <span className="inline-block w-5 h-5 bg-yellow-600 text-white text-xs font-bold flex items-center justify-center rounded-full mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </span>
              <span>Featured Business</span>
            </span>
          </div>
        </div>
      )}

      {/* Pagination */}
      {businesses.length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 md:mb-0">
            Showing {startIndex + 1}-{endIndex} of {businesses.length} businesses
          </div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 border border-gray-300 dark:border-gray-600 rounded ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className={`px-3 py-1 border border-gray-300 dark:border-gray-600 rounded ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessList;
