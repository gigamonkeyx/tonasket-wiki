'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BusinessSubmissionForm from '@/components/BusinessSubmissionForm';
import { Business } from '@/data/businesses';

export default function SubmitBusinessPage() {
  const router = useRouter();
  
  // Handle form submission
  const handleSubmit = async (businessData: Partial<Business>) => {
    try {
      const response = await fetch('/api/businesses/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(businessData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit business');
      }
      
      // Wait for 2 seconds to show success message before redirecting
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to the businesses page
      router.push('/businesses?submitted=true');
    } catch (error) {
      console.error('Error submitting business:', error);
      throw error;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
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
              <h1 className="text-3xl md:text-4xl font-bold">Submit Your Business</h1>
              <p className="text-xl max-w-3xl mt-2">
                Add your business to the Tonasket Business Directory to increase visibility and connect with the community.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About the Business Directory</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Tonasket Business Directory is a comprehensive resource for finding local businesses, services, and organizations in the Tonasket area.
              By submitting your business, you'll be included in our directory, making it easier for residents and visitors to find you.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All submissions are reviewed by our team before being published to ensure accuracy and relevance.
              This process typically takes 1-2 business days.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Information</h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                    <p>Fields marked with an asterisk (*) are required. The more information you provide, the better your business listing will be.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <BusinessSubmissionForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
