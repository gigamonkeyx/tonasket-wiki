/**
 * Weather Data Transformer
 * 
 * This module transforms raw Open-Meteo API responses into
 * standardized formats for the application.
 */

/**
 * WMO Weather Codes mapped to descriptions and icons
 * Based on https://open-meteo.com/en/docs
 */
const WEATHER_CODES = {
  0: { description: 'Clear sky', icon: 'sun' },
  1: { description: 'Mainly clear', icon: 'sun' },
  2: { description: 'Partly cloudy', icon: 'cloud-sun' },
  3: { description: 'Overcast', icon: 'cloud' },
  45: { description: 'Fog', icon: 'fog' },
  48: { description: 'Depositing rime fog', icon: 'fog' },
  51: { description: 'Light drizzle', icon: 'cloud-drizzle' },
  53: { description: 'Moderate drizzle', icon: 'cloud-drizzle' },
  55: { description: 'Dense drizzle', icon: 'cloud-drizzle' },
  56: { description: 'Light freezing drizzle', icon: 'cloud-sleet' },
  57: { description: 'Dense freezing drizzle', icon: 'cloud-sleet' },
  61: { description: 'Slight rain', icon: 'cloud-rain' },
  63: { description: 'Moderate rain', icon: 'cloud-rain' },
  65: { description: 'Heavy rain', icon: 'cloud-rain' },
  66: { description: 'Light freezing rain', icon: 'cloud-sleet' },
  67: { description: 'Heavy freezing rain', icon: 'cloud-sleet' },
  71: { description: 'Slight snow fall', icon: 'cloud-snow' },
  73: { description: 'Moderate snow fall', icon: 'cloud-snow' },
  75: { description: 'Heavy snow fall', icon: 'cloud-snow' },
  77: { description: 'Snow grains', icon: 'cloud-snow' },
  80: { description: 'Slight rain showers', icon: 'cloud-rain' },
  81: { description: 'Moderate rain showers', icon: 'cloud-rain' },
  82: { description: 'Violent rain showers', icon: 'cloud-rain' },
  85: { description: 'Slight snow showers', icon: 'cloud-snow' },
  86: { description: 'Heavy snow showers', icon: 'cloud-snow' },
  95: { description: 'Thunderstorm', icon: 'cloud-lightning' },
  96: { description: 'Thunderstorm with slight hail', icon: 'cloud-lightning' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'cloud-lightning' }
};

/**
 * Transform current weather data from Open-Meteo API
 * @param {Object} data Raw API response
 * @returns {Object} Transformed current weather data
 */
export function transformCurrentWeather(data) {
  if (!data || !data.current_weather) {
    throw new Error('Invalid current weather data');
  }
  
  const current = data.current_weather;
  const weatherCode = current.weathercode;
  const weather = WEATHER_CODES[weatherCode] || { 
    description: 'Unknown', 
    icon: 'question' 
  };
  
  return {
    temperature: Math.round(current.temperature),
    windSpeed: Math.round(current.windspeed),
    windDirection: current.winddirection,
    weatherCode: current.weathercode,
    weatherDescription: weather.description,
    weatherIcon: weather.icon,
    isDay: current.is_day === 1,
    time: new Date(current.time).toLocaleString(),
    location: 'Tonasket, WA'
  };
}

/**
 * Transform daily forecast data from Open-Meteo API
 * @param {Object} data Raw API response
 * @returns {Array} Transformed daily forecast data
 */
export function transformDailyForecast(data) {
  if (!data || !data.daily) {
    throw new Error('Invalid forecast data');
  }
  
  const daily = data.daily;
  const days = daily.time.length;
  
  const forecast = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(daily.time[i]);
    const weatherCode = daily.weathercode[i];
    const weather = WEATHER_CODES[weatherCode] || { 
      description: 'Unknown', 
      icon: 'question' 
    };
    
    forecast.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      dateISO: daily.time[i],
      tempHigh: Math.round(daily.temperature_2m_max[i]),
      tempLow: Math.round(daily.temperature_2m_min[i]),
      precipitation: daily.precipitation_sum[i],
      precipitationHours: daily.precipitation_hours[i],
      windSpeed: Math.round(daily.windspeed_10m_max[i]),
      weatherCode: weatherCode,
      weatherDescription: weather.description,
      weatherIcon: weather.icon
    });
  }
  
  return forecast;
}

/**
 * Transform hourly weather data from Open-Meteo API
 * @param {Object} data Raw API response
 * @returns {Array} Transformed hourly weather data
 */
export function transformHourlyWeather(data) {
  if (!data || !data.hourly) {
    throw new Error('Invalid hourly data');
  }
  
  const hourly = data.hourly;
  const hours = hourly.time.length;
  
  const hourlyData = [];
  
  for (let i = 0; i < hours; i++) {
    const time = new Date(hourly.time[i]);
    const weatherCode = hourly.weathercode[i];
    const weather = WEATHER_CODES[weatherCode] || { 
      description: 'Unknown', 
      icon: 'question' 
    };
    
    hourlyData.push({
      time: time.toLocaleTimeString('en-US', { hour: 'numeric' }),
      timeISO: hourly.time[i],
      temperature: Math.round(hourly.temperature_2m[i]),
      humidity: hourly.relativehumidity_2m[i],
      precipitation: hourly.precipitation[i],
      windSpeed: Math.round(hourly.windspeed_10m[i]),
      windDirection: hourly.winddirection_10m[i],
      weatherCode: weatherCode,
      weatherDescription: weather.description,
      weatherIcon: weather.icon
    });
  }
  
  return hourlyData;
}

/**
 * Transform agricultural weather data from Open-Meteo API
 * @param {Object} data Raw API response
 * @returns {Object} Transformed agricultural weather data
 */
export function transformAgriculturalWeather(data) {
  if (!data || !data.daily || !data.hourly) {
    throw new Error('Invalid agricultural weather data');
  }
  
  const daily = data.daily;
  const hourly = data.hourly;
  
  // Get the latest soil data
  const latestIndex = hourly.time.length > 0 ? 0 : null;
  
  return {
    evapotranspiration: daily.et0_fao_evapotranspiration[0],
    soilTemperature: {
      surface: hourly.soil_temperature_0cm[latestIndex],
      depth6cm: hourly.soil_temperature_6cm[latestIndex]
    },
    soilMoisture: {
      surface: hourly.soil_moisture_0_1cm[latestIndex],
      depth1to3cm: hourly.soil_moisture_1_3cm[latestIndex]
    },
    forecast: {
      today: {
        tempHigh: Math.round(daily.temperature_2m_max[0]),
        tempLow: Math.round(daily.temperature_2m_min[0]),
        precipitation: daily.precipitation_sum[0]
      },
      tomorrow: {
        tempHigh: Math.round(daily.temperature_2m_max[1]),
        tempLow: Math.round(daily.temperature_2m_min[1]),
        precipitation: daily.precipitation_sum[1]
      }
    },
    growingConditions: determineGrowingConditions(data)
  };
}

/**
 * Determine growing conditions based on weather data
 * @param {Object} data Weather data
 * @returns {Object} Growing conditions assessment
 */
function determineGrowingConditions(data) {
  const hourly = data.hourly;
  const daily = data.daily;
  
  // Calculate average temperature
  const temps = hourly.temperature_2m.slice(0, 24);
  const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
  
  // Calculate total precipitation
  const precipitation = daily.precipitation_sum[0];
  
  // Determine frost risk
  const minTemp = Math.min(...temps);
  const frostRisk = minTemp < 32 ? 'High' : minTemp < 38 ? 'Moderate' : 'Low';
  
  // Determine drought risk
  const droughtRisk = precipitation < 0.1 ? 'High' : precipitation < 0.5 ? 'Moderate' : 'Low';
  
  // Determine overall growing conditions
  let overallConditions;
  if (avgTemp < 40) {
    overallConditions = 'Poor - Too Cold';
  } else if (avgTemp > 90) {
    overallConditions = 'Poor - Too Hot';
  } else if (precipitation > 2) {
    overallConditions = 'Poor - Too Wet';
  } else if (precipitation < 0.1 && hourly.soil_moisture_0_1cm[0] < 0.1) {
    overallConditions = 'Poor - Too Dry';
  } else if (avgTemp >= 60 && avgTemp <= 85 && precipitation >= 0.1 && precipitation <= 1) {
    overallConditions = 'Excellent';
  } else {
    overallConditions = 'Fair';
  }
  
  return {
    overallConditions,
    frostRisk,
    droughtRisk,
    averageTemperature: Math.round(avgTemp)
  };
}

/**
 * Transform historical weather data from Open-Meteo API
 * @param {Object} data Raw API response
 * @returns {Array} Transformed historical weather data
 */
export function transformHistoricalWeather(data) {
  if (!data || !data.daily) {
    throw new Error('Invalid historical data');
  }
  
  // Use the same transformation as daily forecast
  return transformDailyForecast(data);
}

export default {
  transformCurrentWeather,
  transformDailyForecast,
  transformHourlyWeather,
  transformAgriculturalWeather,
  transformHistoricalWeather
};
