'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import SubmissionsList from '@/components/admin/businesses/SubmissionsList';
import ClaimsList from '@/components/admin/businesses/ClaimsList';
import EnrichmentPanel from '@/components/admin/businesses/EnrichmentPanel';

export default function BusinessAdminPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'submissions' | 'claims' | 'enrichment'>('submissions');
  
  return (
    <AdminLayout
      title="Business Directory Administration"
      description="Manage business submissions, claims, and data enrichment"
    >
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`inline-block py-4 px-4 text-sm font-medium ${
                activeTab === 'submissions'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Submissions
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('claims')}
              className={`inline-block py-4 px-4 text-sm font-medium ${
                activeTab === 'claims'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Claims
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('enrichment')}
              className={`inline-block py-4 px-4 text-sm font-medium ${
                activeTab === 'enrichment'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Data Enrichment
            </button>
          </li>
        </ul>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {activeTab === 'submissions' && <SubmissionsList />}
        {activeTab === 'claims' && <ClaimsList />}
        {activeTab === 'enrichment' && <EnrichmentPanel />}
      </div>
    </AdminLayout>
  );
}
