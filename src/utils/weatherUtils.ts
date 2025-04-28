/**
 * Convert temperature from Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

/**
 * Convert temperature from Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9;
}

/**
 * Format temperature with unit
 */
export function formatTemperature(temp: number, unit: 'C' | 'F' = 'F'): string {
  return `${Math.round(temp)}°${unit}`;
}

/**
 * Format wind speed with unit
 */
export function formatWindSpeed(speed: number, unit: 'mph' | 'km/h' = 'mph'): string {
  return `${Math.round(speed)} ${unit}`;
}

/**
 * Get wind direction as a cardinal direction
 */
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Format date from Unix timestamp
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format time from Unix timestamp
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Get weather icon URL based on icon code
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `/images/weather/${iconCode}.png`;
}

/**
 * Get weather condition description based on Open-Meteo weather code
 */
export function getWeatherCondition(code: number): { main: string; description: string; icon: string } {
  // Weather condition mapping based on WMO codes
  // https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
  const conditions: Record<number, { main: string; description: string; icon: string }> = {
    0: { main: 'Clear', description: 'Clear sky', icon: '01d' },
    1: { main: 'Clear', description: 'Mainly clear', icon: '01d' },
    2: { main: 'Clouds', description: 'Partly cloudy', icon: '02d' },
    3: { main: 'Clouds', description: 'Overcast', icon: '03d' },
    45: { main: 'Fog', description: 'Fog', icon: '50d' },
    48: { main: 'Fog', description: 'Depositing rime fog', icon: '50d' },
    51: { main: 'Drizzle', description: 'Light drizzle', icon: '09d' },
    53: { main: 'Drizzle', description: 'Moderate drizzle', icon: '09d' },
    55: { main: 'Drizzle', description: 'Dense drizzle', icon: '09d' },
    56: { main: 'Drizzle', description: 'Light freezing drizzle', icon: '09d' },
    57: { main: 'Drizzle', description: 'Dense freezing drizzle', icon: '09d' },
    61: { main: 'Rain', description: 'Slight rain', icon: '10d' },
    63: { main: 'Rain', description: 'Moderate rain', icon: '10d' },
    65: { main: 'Rain', description: 'Heavy rain', icon: '10d' },
    66: { main: 'Rain', description: 'Light freezing rain', icon: '13d' },
    67: { main: 'Rain', description: 'Heavy freezing rain', icon: '13d' },
    71: { main: 'Snow', description: 'Slight snow fall', icon: '13d' },
    73: { main: 'Snow', description: 'Moderate snow fall', icon: '13d' },
    75: { main: 'Snow', description: 'Heavy snow fall', icon: '13d' },
    77: { main: 'Snow', description: 'Snow grains', icon: '13d' },
    80: { main: 'Rain', description: 'Slight rain showers', icon: '09d' },
    81: { main: 'Rain', description: 'Moderate rain showers', icon: '09d' },
    82: { main: 'Rain', description: 'Violent rain showers', icon: '09d' },
    85: { main: 'Snow', description: 'Slight snow showers', icon: '13d' },
    86: { main: 'Snow', description: 'Heavy snow showers', icon: '13d' },
    95: { main: 'Thunderstorm', description: 'Thunderstorm', icon: '11d' },
    96: { main: 'Thunderstorm', description: 'Thunderstorm with slight hail', icon: '11d' },
    99: { main: 'Thunderstorm', description: 'Thunderstorm with heavy hail', icon: '11d' }
  };
  
  return conditions[code] || { main: 'Unknown', description: 'Unknown weather condition', icon: '50d' };
}

/**
 * Calculate UV index risk level
 */
export function getUVIndexRisk(uvIndex: number): { level: string; color: string } {
  if (uvIndex < 3) {
    return { level: 'Low', color: 'green' };
  } else if (uvIndex < 6) {
    return { level: 'Moderate', color: 'yellow' };
  } else if (uvIndex < 8) {
    return { level: 'High', color: 'orange' };
  } else if (uvIndex < 11) {
    return { level: 'Very High', color: 'red' };
  } else {
    return { level: 'Extreme', color: 'purple' };
  }
}

/**
 * Calculate growing degree days
 */
export function calculateGrowingDegreeDays(maxTemp: number, minTemp: number, baseTemp: number = 50): number {
  const avgTemp = (maxTemp + minTemp) / 2;
  return Math.max(0, avgTemp - baseTemp);
}

/**
 * Get frost risk based on temperature
 */
export function getFrostRisk(minTemp: number): 'none' | 'low' | 'medium' | 'high' {
  if (minTemp > 36) {
    return 'none';
  } else if (minTemp > 32) {
    return 'low';
  } else if (minTemp > 28) {
    return 'medium';
  } else {
    return 'high';
  }
}
