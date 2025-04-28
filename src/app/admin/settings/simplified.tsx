'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SimplifiedSettingsPage() {
  // Mock API keys
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'SOCRATA_APP_TOKEN',
      value: 'soc_••••••••••••••••',
      service: 'Washington State Business Lookup',
      status: 'active'
    },
    {
      id: '2',
      name: 'GOOGLE_PLACES_API_KEY',
      value: 'AIza••••••••••••••••••••••••••••••••',
      service: 'Google Maps & Places',
      status: 'active'
    },
    {
      id: '3',
      name: 'YELP_API_KEY',
      value: 'yelp_••••••••••••••••••••••••••••••',
      service: 'Yelp Business Data',
      status: 'active'
    }
  ]);

  // Mock environment variables
  const [envVars, setEnvVars] = useState([
    {
      id: '1',
      name: 'DATABASE_URL',
      value: '••••••••••••••••••••••••••••••••',
      category: 'database',
      isSecret: true
    },
    {
      id: '2',
      name: 'NEXT_PUBLIC_APP_URL',
      value: 'http://localhost:3000',
      category: 'app',
      isSecret: false
    },
    {
      id: '3',
      name: 'NODE_ENV',
      value: 'development',
      category: 'app',
      isSecret: false
    }
  ]);

  // State for editing
  const [editingKey, setEditingKey] = useState(null);
  const [editingVar, setEditingVar] = useState(null);
  const [newValue, setNewValue] = useState('');

  // Handle edit key
  const handleEditKey = (key) => {
    setEditingKey(key);
    setNewValue('');
  };

  // Handle edit variable
  const handleEditVar = (variable) => {
    setEditingVar(variable);
    setNewValue('');
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditingVar(null);
    setNewValue('');
  };

  // Handle update key
  const handleUpdateKey = () => {
    if (!editingKey || !newValue.trim()) {
      return;
    }

    setApiKeys(prevKeys => 
      prevKeys.map(key => 
        key.id === editingKey.id
          ? {
              ...key,
              value: key.value.charAt(0) + '•'.repeat(key.value.length - 1)
            }
          : key
      )
    );

    setEditingKey(null);
    setNewValue('');
  };

  // Handle update variable
  const handleUpdateVar = () => {
    if (!editingVar || !newValue.trim()) {
      return;
    }

    setEnvVars(prevVars => 
      prevVars.map(variable => 
        variable.id === editingVar.id
          ? {
              ...variable,
              value: variable.isSecret 
                ? '•'.repeat(newValue.length) 
                : newValue
            }
          : variable
      )
    );

    setEditingVar(null);
    setNewValue('');
  };

  // Get category badge color
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'api':
        return 'bg-blue-100 text-blue-800';
      case 'database':
        return 'bg-green-100 text-green-800';
      case 'app':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Settings (Simplified)</h1>
      <p className="mb-4">This is a simplified version of the settings page that doesn't rely on the API.</p>
      
      {/* API Keys */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                  <button 
                    onClick={() => handleEditKey(key)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
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
      
      {/* Environment Variables */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {envVars.map((variable) => (
              <tr key={variable.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{variable.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono text-gray-900">{variable.value}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeColor(variable.category)}`}>
                    {variable.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleEditVar(variable)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Edit Key Modal */}
      {editingKey && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Update API Key</h3>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <div className="text-sm text-gray-900">{editingKey.name}</div>
                <div className="text-sm text-gray-600">{editingKey.service}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="newKeyValue" className="block text-sm font-medium text-gray-700 mb-1">
                  New API Key
                </label>
                <input
                  type="text"
                  id="newKeyValue"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new API key"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={!newValue.trim()}
              >
                Update Key
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Variable Modal */}
      {editingVar && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Update Environment Variable</h3>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <label htmlFor="varName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="text-sm font-mono text-gray-900">{editingVar.name}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="newVarValue" className="block text-sm font-medium text-gray-700 mb-1">
                  New Value
                </label>
                <input
                  type={editingVar.isSecret ? 'password' : 'text'}
                  id="newVarValue"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter new value for ${editingVar.name}`}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateVar}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={!newValue.trim()}
              >
                Update Variable
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
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
