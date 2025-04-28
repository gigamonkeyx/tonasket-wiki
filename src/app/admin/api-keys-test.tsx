'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ApiKeysTestPage() {
  // Mock API keys
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Socrata App Token',
      value: 'soc_••••••••••••••••',
      service: 'Washington State Business Lookup',
      status: 'active'
    },
    {
      id: '2',
      name: 'Google Places API Key',
      value: 'AIza••••••••••••••••••••••••••••••••',
      service: 'Google Maps & Places',
      status: 'active'
    },
    {
      id: '3',
      name: 'Yelp Fusion API Key',
      value: 'yelp_••••••••••••••••••••••••••••••',
      service: 'Yelp Business Data',
      status: 'active'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">API Keys Management Test Page</h1>
      <p className="mb-4">This is a simplified test page to check if the API key management works.</p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">API Keys</h2>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                API Key
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {apiKeys.map((key) => (
              <tr key={key.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{key.name}</div>
                  <div className="text-sm text-gray-500">{key.service}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono text-gray-900">{key.value}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {key.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    Edit
                  </button>
                  <button className="text-green-600 hover:text-green-900 mr-4">
                    Refresh
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Test
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/admin" className="text-blue-600 hover:underline">
              Back to Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/test-page" className="text-blue-600 hover:underline">
              Test Page
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
