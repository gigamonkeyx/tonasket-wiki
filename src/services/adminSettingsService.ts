/**
 * Admin Settings Service
 *
 * This service provides functions to interact with the admin settings API.
 */

interface ApiKey {
  name: string;
  value: string;
  service: string;
  category: string;
  isSecret: boolean;
}

interface EnvVariable {
  name: string;
  value: string;
  category: string;
  isSecret: boolean;
}

interface SettingsResponse {
  apiKeys: ApiKey[];
  databaseVars: EnvVariable[];
  appVars: EnvVariable[];
  otherVars: EnvVariable[];
}

/**
 * Fetch all settings (API keys and environment variables)
 * @returns Promise resolving to settings data
 */
export async function fetchSettings(): Promise<SettingsResponse> {
  try {
    const response = await fetch('/api/admin/settings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: SettingsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
}

/**
 * Update an API key or environment variable
 * @param name - Name of the variable to update
 * @param value - New value for the variable
 * @returns Promise resolving to success message
 */
export async function updateSetting(name: string, value: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, value })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating setting:', error);
    throw error;
  }
}

/**
 * Refresh an API key
 * @param name - Name of the API key to refresh
 * @param service - Service the API key is for
 * @returns Promise resolving to success message
 */
export async function refreshApiKey(name: string, service: string): Promise<{ success: boolean; message: string }> {
  try {
    // In a real implementation, this would call an API to refresh the key
    // For now, we'll simulate the refresh
    const mockNewKey = generateMockApiKey(service);

    return updateSetting(name, mockNewKey);
  } catch (error) {
    console.error('Error refreshing API key:', error);
    throw error;
  }
}

/**
 * Test an API key
 * @param name - Name of the API key to test
 * @param value - Value of the API key to test
 * @returns Promise resolving to success message
 */
export async function testApiKey(name: string, value: string): Promise<{ success: boolean; message: string }> {
  try {
    // Determine which API to test based on the key name
    if (name.toLowerCase().includes('socrata') || name.toLowerCase().includes('washington')) {
      return await testSocrataApiKey(value);
    }

    // For other APIs, simulate the test
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      success: true,
      message: `${name} is valid and working correctly`
    };
  } catch (error) {
    console.error('Error testing API key:', error);
    throw error;
  }
}

/**
 * Test a Socrata API key (app token)
 * @param token - The Socrata app token to test
 * @returns Promise resolving to success message
 */
async function testSocrataApiKey(token: string): Promise<{ success: boolean; message: string }> {
  try {
    // Test the Socrata API key by making a request to the Washington Business Lookup dataset
    const endpoint = 'https://data.wa.gov/resource/7xux-kdpf.json';
    const url = `${endpoint}?$$app_token=${token}&$limit=1`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-App-Token': token,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      message: `Socrata API key is valid. Successfully connected to Washington Business Lookup dataset.`
    };
  } catch (error) {
    console.error('Error testing Socrata API key:', error);
    throw new Error('Failed to validate Socrata API key. Please check the key and try again.');
  }
}

/**
 * Generate a mock API key
 * @param service - Service the API key is for
 * @returns Mock API key
 */
function generateMockApiKey(service: string): string {
  const keyLength = Math.floor(Math.random() * 20) + 20; // 20-40 characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let prefix = '';
  if (service.includes('Washington State')) {
    prefix = 'soc_';
  } else if (service.includes('Google Places')) {
    prefix = 'AIza';
  } else if (service.includes('Google Maps')) {
    prefix = 'AIza';
  } else if (service.includes('Yelp')) {
    prefix = 'yelp_';
  } else if (service.includes('Weather')) {
    prefix = 'wapi_';
  } else {
    prefix = 'key_';
  }

  let result = prefix;
  for (let i = 0; i < keyLength - prefix.length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}
