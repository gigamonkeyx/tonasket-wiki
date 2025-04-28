import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import dotenv from 'dotenv';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * GET /api/admin/settings
 * 
 * Fetches API keys and environment variables.
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication (in a real implementation)
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    // Read .env file
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    
    try {
      envContent = await readFile(envPath, 'utf8');
    } catch (err) {
      console.error('Error reading .env file:', err);
      return NextResponse.json(
        { error: 'Failed to read environment variables' },
        { status: 500 }
      );
    }
    
    // Parse .env file
    const envVars = dotenv.parse(envContent);
    
    // Categorize variables
    const apiKeys = [];
    const databaseVars = [];
    const appVars = [];
    const otherVars = [];
    
    for (const [key, value] of Object.entries(envVars)) {
      const isSecret = key.includes('KEY') || key.includes('TOKEN') || key.includes('SECRET') || key.includes('PASSWORD') || key.includes('URL');
      const maskedValue = isSecret ? maskValue(value) : value;
      
      const variable = {
        name: key,
        value: maskedValue,
        isSecret
      };
      
      if (key.includes('API_KEY') || key.includes('TOKEN') || key.includes('SECRET')) {
        apiKeys.push({
          ...variable,
          category: 'api',
          service: getServiceName(key)
        });
      } else if (key.includes('DATABASE') || key.includes('DB_')) {
        databaseVars.push({
          ...variable,
          category: 'database'
        });
      } else if (key.includes('APP_') || key.includes('NEXT_') || key.includes('NODE_')) {
        appVars.push({
          ...variable,
          category: 'app'
        });
      } else {
        otherVars.push({
          ...variable,
          category: 'other'
        });
      }
    }
    
    return NextResponse.json({
      apiKeys,
      databaseVars,
      appVars,
      otherVars
    });
    
  } catch (error) {
    console.error('Error in settings API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/settings
 * 
 * Updates an API key or environment variable.
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication (in a real implementation)
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    // Parse request body
    const { name, value } = await request.json();
    
    if (!name || !value) {
      return NextResponse.json(
        { error: 'Name and value are required' },
        { status: 400 }
      );
    }
    
    // Read .env file
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    
    try {
      envContent = await readFile(envPath, 'utf8');
    } catch (err) {
      console.error('Error reading .env file:', err);
      return NextResponse.json(
        { error: 'Failed to read environment variables' },
        { status: 500 }
      );
    }
    
    // Parse .env file
    const envVars = dotenv.parse(envContent);
    
    // Check if variable exists
    if (!(name in envVars)) {
      return NextResponse.json(
        { error: 'Environment variable not found' },
        { status: 404 }
      );
    }
    
    // Update variable
    envVars[name] = value;
    
    // Convert back to .env format
    const newEnvContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    // Write back to .env file
    try {
      await writeFile(envPath, newEnvContent);
    } catch (err) {
      console.error('Error writing .env file:', err);
      return NextResponse.json(
        { error: 'Failed to update environment variables' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `${name} updated successfully`
    });
    
  } catch (error) {
    console.error('Error in settings API:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

/**
 * Mask sensitive values
 */
function maskValue(value: string): string {
  if (!value || value.length <= 8) {
    return '••••••••';
  }
  
  const prefix = value.substring(0, 4);
  const masked = '•'.repeat(value.length - 4);
  
  return prefix + masked;
}

/**
 * Get service name from key name
 */
function getServiceName(key: string): string {
  if (key.includes('SOCRATA')) {
    return 'Washington State Business Lookup';
  } else if (key.includes('GOOGLE_PLACES')) {
    return 'Google Places API';
  } else if (key.includes('GOOGLE_MAPS')) {
    return 'Google Maps API';
  } else if (key.includes('YELP')) {
    return 'Yelp Fusion API';
  } else if (key.includes('WEATHER')) {
    return 'Weather API';
  } else {
    return 'API Service';
  }
}
