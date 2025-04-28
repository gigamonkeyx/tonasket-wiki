'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Business } from '@/data/businesses';

interface BusinessCardProps {
  business: Business;
  featured?: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, featured = false }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Format phone number for better accessibility
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/[^\d]/g, '');
  };

  // Toggle description expansion
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-transparent hover:border-blue-300 dark:hover:border-blue-700 ${
        featured ? 'hover:shadow-xl' : 'hover:shadow-md'
      }`}
      aria-labelledby={`business-name-${business.id}`}
    >
      {/* Business Image */}
      <div className="relative h-52 bg-gray-200 dark:bg-gray-700">
        {business.image ? (
          <Image
            src={business.image}
            alt={`${business.name} - ${business.category} in Tonasket`}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 dark:text-gray-500 text-4xl" aria-hidden="true">📷</span>
            <span className="sr-only">No image available for {business.name}</span>
          </div>
        )}

        {/* Featured Badge */}
        {business.featured && (
          <div className="absolute top-2 right-2 bg-yellow-600 dark:bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
          <span className="inline-block bg-blue-600 dark:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
            {business.category}
          </span>
        </div>
      </div>

      {/* Business Information */}
      <div className="p-6">
        <h3
          id={`business-name-${business.id}`}
          className="text-xl font-semibold mb-2 text-gray-900 dark:text-white"
        >
          {business.name}
        </h3>

        {/* Description with expand/collapse functionality */}
        <div className="mb-4">
          <div
            className={`text-gray-700 dark:text-gray-300 ${isDescriptionExpanded ? '' : 'line-clamp-3'} overflow-y-auto max-h-[${isDescriptionExpanded ? '200px' : 'none'}]`}
            style={{ maxHeight: isDescriptionExpanded ? '200px' : 'none' }}
          >
            {business.description}
          </div>
          {business.description.length > 150 && (
            <button
              onClick={toggleDescription}
              className="text-blue-600 dark:text-blue-400 text-sm mt-1 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
              aria-expanded={isDescriptionExpanded}
            >
              {isDescriptionExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Tags and Subcategory */}
        <div className="flex flex-wrap gap-2 mb-4">
          {business.subcategory && (
            <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
              {business.subcategory}
            </span>
          )}
          {business.tags && business.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700">
              {tag}
            </span>
          ))}
        </div>

        {/* Contact Information and Details Link */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {business.address.split(',')[0]}
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a
              href={`tel:${formatPhoneNumber(business.phone)}`}
              className="hover:text-blue-600 dark:hover:text-blue-400"
              aria-label={`Call ${business.name} at ${business.phone}`}
            >
              {business.phone}
            </a>
          </div>

          <div className="flex justify-between items-center mt-4">
            {business.website && (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center"
                aria-label={`Visit ${business.name} website (opens in new tab)`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Website
              </a>
            )}

            <Link
              href={`/businesses/${business.id}`}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium text-sm px-4 py-2 rounded-md transition-colors"
              aria-label={`View details for ${business.name}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
