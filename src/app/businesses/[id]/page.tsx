'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { businesses } from '@/data/businesses';
import { fetchEnrichedBusinessById } from '@/services/enrichedBusinessService';
import { Business } from '@/data/businesses';
import BusinessMap from '@/components/BusinessMap';

export default function BusinessDetailPage() {
  const params = useParams();
  const router = useRouter();
  const businessId = params.id as string;

  // State for business data
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedBusinesses, setRelatedBusinesses] = useState<Business[]>([]);

  // Fetch business data
  useEffect(() => {
    async function loadBusinessData() {
      setIsLoading(true);
      try {
        // Try to get enriched business data
        const enrichedBusiness = await fetchEnrichedBusinessById(businessId);

        if (enrichedBusiness) {
          setBusiness(enrichedBusiness);

          // Fetch related businesses
          const { businesses: allBusinesses } = await import('@/data/businesses');
          const related = allBusinesses
            .filter(b => b.id !== businessId && b.category === enrichedBusiness.category)
            .slice(0, 3);

          setRelatedBusinesses(related);
        } else {
          // Fallback to static data
          const staticBusiness = businesses.find(b => b.id === businessId);

          if (staticBusiness) {
            setBusiness(staticBusiness);

            // Set related businesses
            const related = businesses
              .filter(b => b.id !== businessId && b.category === staticBusiness.category)
              .slice(0, 3);

            setRelatedBusinesses(related);
          } else {
            setError('Business not found');
          }
        }
      } catch (err) {
        console.error('Error loading business data:', err);
        setError('Failed to load business data');
      } finally {
        setIsLoading(false);
      }
    }

    loadBusinessData();
  }, [businessId]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error || !business) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Business Not Found</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {error || 'The business you are looking for does not exist or has been removed.'}
          </p>
          <Link
            href="/businesses"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Business Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Link
                href="/businesses"
                className="inline-flex items-center text-blue-200 hover:text-white mb-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Directory
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{business.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-block bg-blue-700 text-blue-100 text-xs px-2 py-1 rounded">
                  {business.category}
                </span>
                {business.subcategory && (
                  <span className="inline-block bg-blue-600 text-blue-100 text-xs px-2 py-1 rounded">
                    {business.subcategory}
                  </span>
                )}
              </div>
            </div>
            {business.featured && (
              <div className="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full mt-4 md:mt-0">
                Featured Business
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Business Info */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
              {/* Business Image */}
              <div className="relative h-64 md:h-96 bg-gray-200 dark:bg-gray-700">
                {business.image ? (
                  <Image
                    src={business.image}
                    alt={business.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400 dark:text-gray-500 text-6xl">📷</span>
                  </div>
                )}
              </div>

              {/* Business Description */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">About</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
                  {business.description}
                </p>

                {/* Services & Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {business.services && business.services.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Services</h3>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                        {business.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {business.products && business.products.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Products</h3>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                        {business.products.map((product, index) => (
                          <li key={index}>{product}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {business.tags && business.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {business.tags.map((tag, index) => (
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
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                  <p className="text-gray-900 dark:text-white">{business.address}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                  <p className="text-gray-900 dark:text-white">{business.phone}</p>
                </div>

                {business.email && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {business.email}
                    </a>
                  </div>
                )}

                {business.website && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h3>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {business.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}

                {business.hours && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Hours</h3>
                    <p className="text-gray-900 dark:text-white whitespace-pre-line">{business.hours}</p>
                  </div>
                )}
              </div>

              {/* Social Media */}
              {business.socialMedia && Object.values(business.socialMedia).some(Boolean) && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Social Media</h3>
                  <div className="flex space-x-4">
                    {business.socialMedia.facebook && (
                      <a
                        href={business.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        aria-label="Facebook"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                    )}

                    {business.socialMedia.instagram && (
                      <a
                        href={business.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300"
                        aria-label="Instagram"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.218-1.79.465-2.428.247-.667.642-1.272 1.153-1.772a4.91 4.91 0 011.772-1.153c.637-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.469a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                        </svg>
                      </a>
                    )}

                    {business.socialMedia.twitter && (
                      <a
                        href={business.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200"
                        aria-label="Twitter"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                      </a>
                    )}

                    {business.socialMedia.linkedin && (
                      <a
                        href={business.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-400"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Business Details */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Business Details</h3>

                <div className="space-y-3">
                  {business.founded && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Founded</span>
                      <span className="text-gray-900 dark:text-white">{business.founded}</span>
                    </div>
                  )}

                  {business.employees && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Employees</span>
                      <span className="text-gray-900 dark:text-white">{business.employees}</span>
                    </div>
                  )}

                  {/* License Information */}
                  {(business.licenseNumber || business.licenseType || business.licenseStatus) && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                        <h4 className="text-md font-medium mb-3 text-gray-900 dark:text-white">License Information</h4>

                        {business.licenseNumber && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500 dark:text-gray-400">License Number</span>
                            <span className="text-gray-900 dark:text-white">{business.licenseNumber}</span>
                          </div>
                        )}

                        {business.licenseType && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500 dark:text-gray-400">License Type</span>
                            <span className="text-gray-900 dark:text-white">{business.licenseType}</span>
                          </div>
                        )}

                        {business.licenseStatus && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500 dark:text-gray-400">Status</span>
                            <span className={`font-medium ${
                              business.licenseStatus.toLowerCase() === 'active'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {business.licenseStatus}
                            </span>
                          </div>
                        )}

                        {business.firstIssueDate && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500 dark:text-gray-400">First Issued</span>
                            <span className="text-gray-900 dark:text-white">{business.firstIssueDate}</span>
                          </div>
                        )}

                        {/* Link to WA Business Lookup */}
                        {business.licenseNumber && (
                          <div className="mt-3">
                            <a
                              href={`https://secure.dor.wa.gov/gteunauth/_/#/results?searchBy=ubi&searchCriteria=${encodeURIComponent(business.licenseNumber)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              View on WA Business Lookup
                            </a>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Map */}
            {business.coordinates && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <BusinessMap
                  businesses={[business]}
                  selectedBusinessId={business.id}
                  height="300px"
                  zoom={15}
                  center={business.coordinates}
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Location</h3>
                  <p className="text-gray-700 dark:text-gray-300">{business.address}</p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mt-2 text-sm"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Get Directions
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Businesses */}
        {relatedBusinesses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Similar Businesses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBusinesses.map(relatedBusiness => (
                <div
                  key={relatedBusiness.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  {relatedBusiness.image && (
                    <div className="relative h-40 bg-gray-200 dark:bg-gray-700">
                      <Image
                        src={relatedBusiness.image}
                        alt={relatedBusiness.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{relatedBusiness.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                      {relatedBusiness.description}
                    </p>
                    <Link
                      href={`/businesses/${relatedBusiness.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
