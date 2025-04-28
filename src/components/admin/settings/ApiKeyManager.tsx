'use client';

import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSetting, refreshApiKey, testApiKey } from '@/services/adminSettingsService';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  service: string;
  lastUpdated: string;
  status: 'active' | 'expired' | 'invalid';
  expiresAt?: string;
}

const ApiKeyManager: React.FC = () => {
  // State for API keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for editing keys
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [newKeyValue, setNewKeyValue] = useState('');

  // State for key operations
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Fetch API keys
  useEffect(() => {
    const fetchApiKeysData = async () => {
      setIsLoading(true);
      try {
        const settings = await fetchSettings();

        // Transform API keys to match our component's format
        const formattedApiKeys: ApiKey[] = settings.apiKeys.map((key, index) => ({
          id: (index + 1).toString(),
          name: key.name,
          key: key.value,
          service: key.service,
          lastUpdated: new Date().toISOString(), // We don't have this info from the API
          status: 'active' // We don't have this info from the API
        }));

        setApiKeys(formattedApiKeys);
      } catch (err) {
        setError('Failed to fetch API keys');
        console.error('Error fetching API keys:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKeysData();
  }, []);

  // Handle edit key
  const handleEditKey = (key: ApiKey) => {
    setEditingKey(key);
    setNewKeyValue('');
    setUpdateSuccess(null);
    setUpdateError(null);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingKey(null);
    setNewKeyValue('');
  };

  // Handle update key
  const handleUpdateKey = async () => {
    if (!editingKey || !newKeyValue.trim()) {
      setUpdateError('Please enter a valid API key');
      return;
    }

    setIsUpdating(true);
    setUpdateError(null);

    try {
      // Call the service to update the key
      const result = await updateSetting(editingKey.name, newKeyValue);

      // Update the key in the local state
      setApiKeys(prevKeys =>
        prevKeys.map(key =>
          key.id === editingKey.id
            ? {
                ...key,
                key: maskApiKey(newKeyValue),
                lastUpdated: new Date().toISOString(),
                status: 'active',
                expiresAt: key.expiresAt
                  ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                  : undefined
              }
            : key
        )
      );

      setUpdateSuccess(result.message || `${editingKey.name} updated successfully`);

      // Close the edit form after a delay
      setTimeout(() => {
        setEditingKey(null);
        setNewKeyValue('');
        setUpdateSuccess(null);
      }, 3000);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'Failed to update API key');
      console.error('Error updating API key:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle refresh key
  const handleRefreshKey = async (key: ApiKey) => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      // Call the service to refresh the key
      const result = await refreshApiKey(key.name, key.service);

      // Update the key in the local state
      setApiKeys(prevKeys =>
        prevKeys.map(k =>
          k.id === key.id
            ? {
                ...k,
                key: k.key, // The actual key is masked in the UI
                lastUpdated: new Date().toISOString(),
                status: 'active',
                expiresAt: k.expiresAt
                  ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                  : undefined
              }
            : k
        )
      );

      setUpdateSuccess(result.message || `${key.name} refreshed successfully`);

      // Clear the success message after a delay
      setTimeout(() => {
        setUpdateSuccess(null);
      }, 3000);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'Failed to refresh API key');
      console.error('Error refreshing API key:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle test key
  const handleTestKey = async (key: ApiKey) => {
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      // Call the service to test the key
      const result = await testApiKey(key.name, key.key);

      setUpdateSuccess(result.message || `${key.name} is valid and working correctly`);

      // Clear the success message after a delay
      setTimeout(() => {
        setUpdateSuccess(null);
      }, 3000);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'Failed to test API key');
      console.error('Error testing API key:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Mask API key for display
  const maskApiKey = (key: string) => {
    if (key.length <= 8) {
      return '••••••••';
    }

    const prefix = key.substring(0, 4);
    const masked = '•'.repeat(key.length - 4);

    return prefix + masked;
  };

  // Generate a mock API key
  const generateMockApiKey = (service: string) => {
    const keyLength = Math.floor(Math.random() * 20) + 20; // 20-40 characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let prefix = '';
    switch (service) {
      case 'Washington State Business Lookup':
        prefix = 'soc_';
        break;
      case 'Google Maps & Places':
        prefix = 'AIza';
        break;
      case 'Yelp Business Data':
        prefix = 'yelp_';
        break;
      case 'Weather Data':
        prefix = 'wapi_';
        break;
      default:
        prefix = 'key_';
    }

    let result = prefix;
    for (let i = 0; i < keyLength - prefix.length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  };

  // Get status badge color
  const getStatusBadgeColor = (status: ApiKey['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'invalid':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">API Key Management</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage API keys for external services used by the application.
        </p>
      </div>

      {/* Success/Error Messages */}
      {updateSuccess && (
        <div className="mx-6 mt-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">{updateSuccess}</p>
            </div>
          </div>
        </div>
      )}

      {updateError && (
        <div className="mx-6 mt-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">{updateError}</p>
            </div>
          </div>
        </div>
      )}

      {/* API Keys Table */}
      <div className="px-6 py-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    API Key
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{key.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{key.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900 dark:text-white">{key.key}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(key.status)}`}>
                        {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                      </span>
                      {key.expiresAt && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {new Date(key.expiresAt) > new Date()
                            ? `Expires: ${formatDate(key.expiresAt)}`
                            : `Expired: ${formatDate(key.expiresAt)}`
                          }
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(key.lastUpdated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditKey(key)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-4"
                        disabled={isUpdating}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRefreshKey(key)}
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-4"
                        disabled={isUpdating}
                      >
                        Refresh
                      </button>
                      <button
                        onClick={() => handleTestKey(key)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                        disabled={isUpdating}
                      >
                        Test
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Key Modal */}
      {editingKey && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Update API Key</h3>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service
                </label>
                <div className="text-sm text-gray-900 dark:text-white">{editingKey.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{editingKey.service}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="newKeyValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New API Key
                </label>
                <input
                  type="text"
                  id="newKeyValue"
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter new API key"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUpdating || !newKeyValue.trim()}
              >
                {isUpdating ? 'Updating...' : 'Update Key'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyManager;
