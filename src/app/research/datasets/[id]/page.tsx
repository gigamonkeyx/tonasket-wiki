'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Define Dataset interface
interface Dataset {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  url: string;
  format: string[];
  lastUpdated: string;
  relevance: string;
}

export default function DatasetDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/research/datasets/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Dataset not found');
          }
          throw new Error('Failed to fetch dataset');
        }

        const data = await response.json();
        setDataset(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dataset:', err);
        setError(err.message || 'Failed to load dataset');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDataset();
    }
  }, [id]);

  // Function to get badge color based on relevance
  const getRelevanceBadgeColor = (relevance: string | undefined): string => {
    if (!relevance) return 'bg-blue-100 text-blue-800';
    if (relevance.startsWith('High')) return 'bg-green-100 text-green-800';
    if (relevance.startsWith('Medium')) return 'bg-yellow-100 text-yellow-800';
    if (relevance.startsWith('Low')) return 'bg-gray-100 text-gray-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/research" className="text-white hover:text-blue-200">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Research
              </span>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {loading ? 'Loading Dataset...' : dataset ? dataset.title : 'Dataset Not Found'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <Link href="/research" className="text-red-700 font-medium hover:text-red-800 mt-2 inline-block">
              Return to Research Page
            </Link>
          </div>
        ) : dataset ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">About This Dataset</h2>
                <p className="text-gray-700 mb-6">{dataset.description}</p>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">Relevance to Tonasket</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getRelevanceBadgeColor(dataset.relevance)}`}>
                    {dataset.relevance.split(' - ')[0]}
                  </div>
                  <p className="text-gray-700">{dataset.relevance.split(' - ')[1] || 'No additional relevance information available.'}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-4">How to Use This Data</h2>
                <p className="text-gray-700 mb-4">
                  This dataset is provided by {dataset.source} and is available in the following formats: {dataset.format.join(', ')}.
                </p>
                <p className="text-gray-700 mb-6">
                  To access and use this data, visit the source website by clicking the button below.
                  You may need to follow specific instructions on the source website to download or query the data.
                </p>

                <div className="flex justify-center">
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Access Dataset at Source
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Dataset Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="mt-1">{dataset.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Source</h3>
                    <p className="mt-1">{dataset.source}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Available Formats</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {dataset.format.map((fmt, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                    <p className="mt-1">{dataset.lastUpdated}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dataset ID</h3>
                    <p className="mt-1 text-sm text-gray-500">{dataset.id}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Related Datasets</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Explore other datasets in the same category:
                </p>
                <div className="space-y-2">
                  <Link
                    href={`/research?category=${encodeURIComponent(dataset.category)}`}
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    View all {dataset.category} datasets
                  </Link>
                  <Link
                    href={`/research?source=${encodeURIComponent(dataset.source)}`}
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    View all datasets from {dataset.source}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <p>Dataset not found. It may have been removed or the ID is incorrect.</p>
            <Link href="/research" className="text-yellow-700 font-medium hover:text-yellow-800 mt-2 inline-block">
              Return to Research Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
