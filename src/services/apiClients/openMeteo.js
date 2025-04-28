/**
 * Open-Meteo API Client
 * 
 * This module provides functions to interact with the Open-Meteo Weather API
 * for retrieving weather data for Tonasket, WA.
 * 
 * API Documentation: https://open-meteo.com/en/docs
 */

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1';

// Coordinates for Tonasket, WA
const TONASKET_COORDINATES = {
  latitude: 48.7049,
  longitude: -119.4365,
  timezone: 'America/Los_Angeles'
};

/**
 * Fetch current weather conditions for Tonasket
 * @returns {Promise<Object>} Current weather data
 */
export async function getCurrentWeather() {
  try {
    const url = new URL(`${OPEN_METEO_BASE_URL}/forecast`);
    
    // Add query parameters
    const params = {
      latitude: TONASKET_COORDINATES.latitude,
      longitude: TONASKET_COORDINATES.longitude,
      timezone: TONASKET_COORDINATES.timezone,
      current_weather: true,
      temperature_unit: 'fahrenheit',
      windspeed_unit: 'mph',
      precipitation_unit: 'inch'
    };
    
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
}

/**
 * Fetch weather forecast for Tonasket
 * @param {number} days Number of days to forecast (1-16)
 * @returns {Promise<Object>} Forecast data
 */
export async function getWeatherForecast(days = 7) {
  try {
    const url = new URL(`${OPEN_METEO_BASE_URL}/forecast`);
    
    // Add query parameters
    const params = {
      latitude: TONASKET_COORDINATES.latitude,
      longitude: TONASKET_COORDINATES.longitude,
      timezone: TONASKET_COORDINATES.timezone,
      forecast_days: days,
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,windspeed_10m_max,weathercode',
      temperature_unit: 'fahrenheit',
      windspeed_unit: 'mph',
      precipitation_unit: 'inch'
    };
    
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}

/**
 * Fetch hourly weather data for Tonasket
 * @param {number} hours Number of hours to forecast (1-168)
 * @returns {Promise<Object>} Hourly weather data
 */
export async function getHourlyWeather(hours = 24) {
  try {
    const url = new URL(`${OPEN_METEO_BASE_URL}/forecast`);
    
    // Add query parameters
    const params = {
      latitude: TONASKET_COORDINATES.latitude,
      longitude: TONASKET_COORDINATES.longitude,
      timezone: TONASKET_COORDINATES.timezone,
      forecast_hours: hours,
      hourly: 'temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m,winddirection_10m',
      temperature_unit: 'fahrenheit',
      windspeed_unit: 'mph',
      precipitation_unit: 'inch'
    };
    
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hourly weather:', error);
    throw error;
  }
}

/**
 * Fetch agricultural weather data for Tonasket
 * Includes specialized metrics for farming
 * @returns {Promise<Object>} Agricultural weather data
 */
export async function getAgriculturalWeather() {
  try {
    const url = new URL(`${OPEN_METEO_BASE_URL}/forecast`);
    
    // Add query parameters with agricultural metrics
    const params = {
      latitude: TONASKET_COORDINATES.latitude,
      longitude: TONASKET_COORDINATES.longitude,
      timezone: TONASKET_COORDINATES.timezone,
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,et0_fao_evapotranspiration',
      hourly: 'temperature_2m,relativehumidity_2m,precipitation,soil_temperature_0cm,soil_temperature_6cm,soil_moisture_0_1cm,soil_moisture_1_3cm,windspeed_10m',
      temperature_unit: 'fahrenheit',
      windspeed_unit: 'mph',
      precipitation_unit: 'inch'
    };
    
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching agricultural weather:', error);
    throw error;
  }
}

/**
 * Fetch historical weather data for Tonasket
 * @param {string} startDate Start date in format 'YYYY-MM-DD'
 * @param {string} endDate End date in format 'YYYY-MM-DD'
 * @returns {Promise<Object>} Historical weather data
 */
export async function getHistoricalWeather(startDate, endDate) {
  try {
    const url = new URL(`${OPEN_METEO_BASE_URL}/forecast`);
    
    // Add query parameters
    const params = {
      latitude: TONASKET_COORDINATES.latitude,
      longitude: TONASKET_COORDINATES.longitude,
      timezone: TONASKET_COORDINATES.timezone,
      start_date: startDate,
      end_date: endDate,
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode',
      temperature_unit: 'fahrenheit',
      windspeed_unit: 'mph',
      precipitation_unit: 'inch'
    };
    
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
}

export default {
  getCurrentWeather,
  getWeatherForecast,
  getHourlyWeather,
  getAgriculturalWeather,
  getHistoricalWeather
};
