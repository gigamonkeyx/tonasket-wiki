'use client';

import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSetting } from '@/services/adminSettingsService';

interface EnvVariable {
  id: string;
  name: string;
  value: string;
  description: string;
  isSecret: boolean;
  category: 'api' | 'database' | 'app' | 'other';
}

const EnvironmentSettings: React.FC = () => {
  // State for environment variables
  const [envVariables, setEnvVariables] = useState<EnvVariable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for editing variables
  const [editingVar, setEditingVar] = useState<EnvVariable | null>(null);
  const [newVarValue, setNewVarValue] = useState('');

  // State for variable operations
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // State for filter
  const [categoryFilter, setCategoryFilter] = useState<EnvVariable['category'] | 'all'>('all');

  // Fetch environment variables
  useEffect(() => {
    const fetchEnvVariablesData = async () => {
      setIsLoading(true);
      try {
        const settings = await fetchSettings();

        // Combine all environment variables
        const allVars = [
          ...settings.apiKeys,
          ...settings.databaseVars,
          ...settings.appVars,
          ...settings.otherVars
        ];

        // Transform environment variables to match our component's format
        const formattedEnvVariables: EnvVariable[] = allVars.map((variable, index) => ({
          id: (index + 1).toString(),
          name: variable.name,
          value: variable.value,
          description: getVariableDescription(variable.name, variable.category),
          isSecret: variable.isSecret,
          category: variable.category as EnvVariable['category']
        }));

        setEnvVariables(formattedEnvVariables);
      } catch (err) {
        setError('Failed to fetch environment variables');
        console.error('Error fetching environment variables:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnvVariablesData();
  }, []);

  // Filter variables by category
  const filteredVariables = categoryFilter === 'all'
    ? envVariables
    : envVariables.filter(variable => variable.category === categoryFilter);

  // Handle edit variable
  const handleEditVariable = (variable: EnvVariable) => {
    setEditingVar(variable);
    setNewVarValue('');
    setUpdateSuccess(null);
    setUpdateError(null);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingVar(null);
    setNewVarValue('');
  };

  // Handle update variable
  const handleUpdateVariable = async () => {
    if (!editingVar || !newVarValue.trim()) {
      setUpdateError('Please enter a valid value');
      return;
    }

    setIsUpdating(true);
    setUpdateError(null);

    try {
      // Call the service to update the variable
      const result = await updateSetting(editingVar.name, newVarValue);

      // Update the variable in the local state
      setEnvVariables(prevVars =>
        prevVars.map(variable =>
          variable.id === editingVar.id
            ? {
                ...variable,
                value: variable.isSecret ? '••••••••••••••••••••••••••••••••' : newVarValue
              }
            : variable
        )
      );

      setUpdateSuccess(result.message || `${editingVar.name} updated successfully`);

      // Close the edit form after a delay
      setTimeout(() => {
        setEditingVar(null);
        setNewVarValue('');
        setUpdateSuccess(null);
      }, 3000);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'Failed to update environment variable');
      console.error('Error updating environment variable:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Get variable description
  const getVariableDescription = (name: string, category: string): string => {
    // API keys
    if (name === 'SOCRATA_APP_TOKEN') {
      return 'App token for Washington State Business Lookup API';
    } else if (name === 'GOOGLE_PLACES_API_KEY') {
      return 'API key for Google Places API';
    } else if (name === 'YELP_API_KEY') {
      return 'API key for Yelp Fusion API';
    } else if (name === 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY') {
      return 'Public API key for Google Maps JavaScript API';
    }
    // Database
    else if (name === 'DATABASE_URL') {
      return 'PostgreSQL database connection string';
    }
    // App settings
    else if (name === 'NEXT_PUBLIC_APP_URL') {
      return 'Public URL of the application';
    } else if (name === 'NODE_ENV') {
      return 'Node environment (development, production, test)';
    }
    // Default descriptions based on category
    else if (category === 'api') {
      return 'API key for external service';
    } else if (category === 'database') {
      return 'Database configuration';
    } else if (category === 'app') {
      return 'Application configuration';
    } else {
      return 'Environment variable';
    }
  };

  // Get category badge color
  const getCategoryBadgeColor = (category: EnvVariable['category']) => {
    switch (category) {
      case 'api':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'database':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'app':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'other':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Environment Variables</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage environment variables used by the application.
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

      {/* Category Filter */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              categoryFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategoryFilter('api')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              categoryFilter === 'api'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            API Keys
          </button>
          <button
            onClick={() => setCategoryFilter('database')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              categoryFilter === 'database'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Database
          </button>
          <button
            onClick={() => setCategoryFilter('app')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              categoryFilter === 'app'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Application
          </button>
        </div>
      </div>

      {/* Environment Variables Table */}
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
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Value
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredVariables.map((variable) => (
                  <tr key={variable.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{variable.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{variable.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900 dark:text-white">{variable.value}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeColor(variable.category)}`}>
                        {variable.category.charAt(0).toUpperCase() + variable.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditVariable(variable)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        disabled={isUpdating}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Variable Modal */}
      {editingVar && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Update Environment Variable</h3>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <label htmlFor="varName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <div className="text-sm font-mono text-gray-900 dark:text-white">{editingVar.name}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="varDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <div className="text-sm text-gray-900 dark:text-white">{editingVar.description}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="newVarValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Value
                </label>
                <input
                  type={editingVar.isSecret ? 'password' : 'text'}
                  id="newVarValue"
                  value={newVarValue}
                  onChange={(e) => setNewVarValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={`Enter new value for ${editingVar.name}`}
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
                onClick={handleUpdateVariable}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUpdating || !newVarValue.trim()}
              >
                {isUpdating ? 'Updating...' : 'Update Variable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentSettings;
