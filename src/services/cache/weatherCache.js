/**
 * Weather Cache Service
 * 
 * Simple in-memory cache for weather data to reduce API calls
 */

// Cache storage
const cache = {
  current: null,
  forecast: null,
  hourly: null,
  agricultural: null,
  historical: {}
};

// Cache expiration times (in milliseconds)
const EXPIRATION = {
  current: 30 * 60 * 1000, // 30 minutes
  forecast: 3 * 60 * 60 * 1000, // 3 hours
  hourly: 1 * 60 * 60 * 1000, // 1 hour
  agricultural: 2 * 60 * 60 * 1000, // 2 hours
  historical: 24 * 60 * 60 * 1000 // 24 hours
};

// Cache timestamps
const timestamps = {
  current: 0,
  forecast: 0,
  hourly: 0,
  agricultural: 0,
  historical: {}
};

/**
 * Get cached current weather data if available and not expired
 * @returns {Object|null} Cached data or null if expired/not available
 */
export function getCachedCurrentWeather() {
  const now = Date.now();
  if (cache.current && (now - timestamps.current) < EXPIRATION.current) {
    return cache.current;
  }
  return null;
}

/**
 * Cache current weather data
 * @param {Object} data Weather data to cache
 */
export function cacheCurrentWeather(data) {
  cache.current = data;
  timestamps.current = Date.now();
}

/**
 * Get cached forecast data if available and not expired
 * @returns {Object|null} Cached data or null if expired/not available
 */
export function getCachedForecast() {
  const now = Date.now();
  if (cache.forecast && (now - timestamps.forecast) < EXPIRATION.forecast) {
    return cache.forecast;
  }
  return null;
}

/**
 * Cache forecast data
 * @param {Object} data Forecast data to cache
 */
export function cacheForecast(data) {
  cache.forecast = data;
  timestamps.forecast = Date.now();
}

/**
 * Get cached hourly data if available and not expired
 * @returns {Object|null} Cached data or null if expired/not available
 */
export function getCachedHourlyWeather() {
  const now = Date.now();
  if (cache.hourly && (now - timestamps.hourly) < EXPIRATION.hourly) {
    return cache.hourly;
  }
  return null;
}

/**
 * Cache hourly weather data
 * @param {Object} data Hourly data to cache
 */
export function cacheHourlyWeather(data) {
  cache.hourly = data;
  timestamps.hourly = Date.now();
}

/**
 * Get cached agricultural data if available and not expired
 * @returns {Object|null} Cached data or null if expired/not available
 */
export function getCachedAgriculturalWeather() {
  const now = Date.now();
  if (cache.agricultural && (now - timestamps.agricultural) < EXPIRATION.agricultural) {
    return cache.agricultural;
  }
  return null;
}

/**
 * Cache agricultural weather data
 * @param {Object} data Agricultural data to cache
 */
export function cacheAgriculturalWeather(data) {
  cache.agricultural = data;
  timestamps.agricultural = Date.now();
}

/**
 * Get cached historical data for a specific date range if available and not expired
 * @param {string} startDate Start date in format 'YYYY-MM-DD'
 * @param {string} endDate End date in format 'YYYY-MM-DD'
 * @returns {Object|null} Cached data or null if expired/not available
 */
export function getCachedHistoricalWeather(startDate, endDate) {
  const cacheKey = `${startDate}_${endDate}`;
  const now = Date.now();
  
  if (cache.historical[cacheKey] && 
      timestamps.historical[cacheKey] && 
      (now - timestamps.historical[cacheKey]) < EXPIRATION.historical) {
    return cache.historical[cacheKey];
  }
  return null;
}

/**
 * Cache historical weather data for a specific date range
 * @param {string} startDate Start date in format 'YYYY-MM-DD'
 * @param {string} endDate End date in format 'YYYY-MM-DD'
 * @param {Object} data Historical data to cache
 */
export function cacheHistoricalWeather(startDate, endDate, data) {
  const cacheKey = `${startDate}_${endDate}`;
  cache.historical[cacheKey] = data;
  timestamps.historical[cacheKey] = Date.now();
}

/**
 * Clear all cached weather data
 */
export function clearCache() {
  cache.current = null;
  cache.forecast = null;
  cache.hourly = null;
  cache.agricultural = null;
  cache.historical = {};
  
  timestamps.current = 0;
  timestamps.forecast = 0;
  timestamps.hourly = 0;
  timestamps.agricultural = 0;
  timestamps.historical = {};
}

export default {
  getCachedCurrentWeather,
  cacheCurrentWeather,
  getCachedForecast,
  cacheForecast,
  getCachedHourlyWeather,
  cacheHourlyWeather,
  getCachedAgriculturalWeather,
  cacheAgriculturalWeather,
  getCachedHistoricalWeather,
  cacheHistoricalWeather,
  clearCache
};
