'use client';

import React from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDashboardPage() {
  // Mock statistics
  const stats = [
    { name: 'Total Businesses', value: '124', change: '+12%', changeType: 'increase' },
    { name: 'Pending Submissions', value: '8', change: '+3', changeType: 'increase' },
    { name: 'Pending Claims', value: '5', change: '-2', changeType: 'decrease' },
    { name: 'Last Enrichment', value: '3 days ago', change: '', changeType: 'neutral' }
  ];

  // Mock recent activity
  const recentActivity = [
    { id: 1, type: 'submission', business: 'Mountain View Bakery', status: 'pending', date: '2023-06-15T14:30:00Z' },
    { id: 2, type: 'claim', business: 'Okanogan Valley Farm Supply', status: 'approved', date: '2023-06-12T11:20:00Z' },
    { id: 3, type: 'enrichment', business: '', status: 'completed', date: '2023-06-10T09:00:00Z' },
    { id: 4, type: 'submission', business: 'Riverside Wellness Center', status: 'needs_info', date: '2023-06-16T10:30:00Z' },
    { id: 5, type: 'claim', business: 'North Country Auto Repair', status: 'rejected', date: '2023-06-11T09:45:00Z' }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'needs_info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AdminLayout
      title="Dashboard"
      description="Overview of the Tonasket Wiki administration"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
              {stat.change && (
                <div className={`ml-2 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' :
                  stat.changeType === 'decrease' ? 'text-red-600 dark:text-red-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {stat.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/businesses"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Manage Businesses
          </Link>
          <Link
            href="/admin/news"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Manage News
          </Link>
          <Link
            href="/admin/economic-data"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Economic Data
          </Link>
          <Link
            href="/admin/api-keys"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Manage API Keys
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(activity.status)}`}>
                      {activity.status.replace('_', ' ')}
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      {activity.type === 'submission' ? 'New Submission' :
                       activity.type === 'claim' ? 'Business Claim' :
                       'Data Enrichment'}
                    </span>
                  </div>
                  {activity.business && (
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {activity.business}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(activity.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <Link
            href="/admin/activity"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            View all activity
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
