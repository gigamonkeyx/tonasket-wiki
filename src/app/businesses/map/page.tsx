'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchEnrichedBusinesses } from '@/services/enrichedBusinessService';
import { Business } from '@/data/businesses';
import BusinessMap from '@/components/BusinessMap';
import EnrichedBusinessCard from '@/components/EnrichedBusinessCard';

export default function BusinessMapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for businesses data
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for selected business
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    searchParams.get('id')
  );
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  
  // State for categories
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  
  // Fetch businesses data
  useEffect(() => {
    async function loadBusinesses() {
      setIsLoading(true);
      try {
        const response = await fetchEnrichedBusinesses('98855', 100);
        
        if (response.businesses.length > 0) {
          // Filter businesses with coordinates
          const businessesWithCoords = response.businesses.filter(b => b.coordinates);
          setBusinesses(businessesWithCoords);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(businessesWithCoords.map(b => b.category))
          ).filter(Boolean) as string[];
          
          setCategories(['All', ...uniqueCategories.sort()]);
          
          // Set selected business if ID is provided
          if (selectedBusinessId) {
            const business = businessesWithCoords.find(b => b.id === selectedBusinessId);
            setSelectedBusiness(business || null);
          }
        }
      } catch (error) {
        console.error('Error loading businesses:', error);
        setError('Failed to load business data');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadBusinesses();
  }, [selectedBusinessId]);
  
  // Filter businesses by category
  const filteredBusinesses = selectedCategory === 'All'
    ? businesses
    : businesses.filter(b => b.category === selectedCategory);
  
  // Handle business selection
  const handleBusinessSelect = (businessId: string) => {
    setSelectedBusinessId(businessId);
    const business = businesses.find(b => b.id === businessId);
    setSelectedBusiness(business || null);
    
    // Update URL without refreshing the page
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', businessId);
    router.push(`/businesses/map?${params.toString()}`, { scroll: false });
  };
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedBusinessId(null);
    setSelectedBusiness(null);
    
    // Update URL without refreshing the page
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    params.delete('id');
    router.push(`/businesses/map?${params.toString()}`, { scroll: false });
  };
  
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
              <h1 className="text-3xl md:text-4xl font-bold">Business Map</h1>
              <p className="text-xl max-w-3xl mt-2">
                Explore businesses in Tonasket and the surrounding area.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <BusinessMap 
                  businesses={filteredBusinesses}
                  selectedBusinessId={selectedBusinessId || undefined}
                  onBusinessSelect={handleBusinessSelect}
                  height="600px"
                  zoom={13}
                />
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredBusinesses.length} businesses
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </div>
            </div>
            
            {/* Selected Business or List */}
            <div>
              {selectedBusiness ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <EnrichedBusinessCard 
                    business={selectedBusiness}
                    featured={selectedBusiness.featured}
                  />
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Business List</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Click on a marker on the map to view business details, or browse the list below.
                  </p>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {filteredBusinesses.map(business => (
                      <div 
                        key={business.id}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedBusinessId === business.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleBusinessSelect(business.id)}
                      >
                        <h3 className="font-medium text-gray-900 dark:text-white">{business.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{business.category}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{business.address.split(',')[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
