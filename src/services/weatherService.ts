/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  WeatherData, 
  TONASKET_COORDINATES, 
  AgriculturalWeatherData,
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
  WeatherCondition,
  WeatherAlert // Assuming alerts might be added later or needed by WeatherData
} from '@/data/weather'; 

// Define a type for the historical data structure
interface HistoricalWeatherData {
  dates: string[];
  temperatures: {
    max: number[] | null;
    min: number[] | null;
  };
  precipitation: number[] | null;
}

// Basic interface for Open-Meteo API response structure
interface OpenMeteoApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset_seconds: number; 
  // Use any for API responses to avoid excessive type assertions
  current?: Record<string, any>; 
  hourly?: Record<string, any[]>; 
  daily?: Record<string, any[]>; 
}


/**
 * Service for fetching and processing weather data from Open-Meteo
 */
class WeatherService {
  private apiBaseUrl = 'https://api.open-meteo.com/v1';
  private useRealApi = false; // Keep default as false for development

  /**
   * Get current weather, hourly and daily forecast for Tonasket
   */
  async getWeatherData(): Promise<WeatherData> {
    if (!this.useRealApi) {
      // Simulate API delay and return sample data matching WeatherData structure
      return this.simulateApiDelay(this.getSampleWeatherData());
    }

    try {
      const { lat, lon } = TONASKET_COORDINATES;
      
      // API call including current, hourly, and daily data
      const params: Record<string, string> = { // Ensure values are strings
        latitude: String(lat),
        longitude: String(lon),
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility,cloud_cover', 
        hourly: 'temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,evapotranspiration,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index', 
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max,precipitation_probability_max', // Added precipitation_probability_max
        temperature_unit: 'fahrenheit',
        wind_speed_unit: 'mph',
        precipitation_unit: 'inch',
        timezone: 'America/Los_Angeles',
        forecast_days: String(7) 
      };
      const queryString = new URLSearchParams(params).toString(); // No cast needed now
      
      const response = await fetch(`${this.apiBaseUrl}/forecast?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform the API response to the WeatherData structure
      return this.transformOpenMeteoData(data);

    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Fallback to sample data generation if API call fails
      return this.getSampleWeatherData();
    }
  }
  
  /**
   * Get agricultural weather data for Tonasket
   */
  async getAgriculturalWeatherData(): Promise<AgriculturalWeatherData> {
     if (!this.useRealApi) {
      // Simulate API delay and return sample data
      return this.simulateApiDelay(this.getSampleAgriculturalWeather());
    }
    
    try {
      const { lat, lon } = TONASKET_COORDINATES;
      
      // Open-Meteo API call for soil & evapotranspiration data
       const params: Record<string, string> = { // Ensure values are strings
        latitude: String(lat),
        longitude: String(lon),
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,et0_fao_evapotranspiration,growing_degree_days_base_50f_limit_86f', 
        hourly: 'soil_temperature_0cm,soil_temperature_6cm,soil_moisture_0_1cm,soil_moisture_1_3cm',
        temperature_unit: 'fahrenheit',
        precipitation_unit: 'inch',
        timezone: 'America/Los_Angeles',
        forecast_days: String(7) // Fetch 7 days for precipitation forecast
      };
      const queryString = new URLSearchParams(params).toString(); // No cast needed now
      
      const response = await fetch(`${this.apiBaseUrl}/forecast?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`Agricultural weather API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform Open-Meteo data to our format
      return this.transformAgriculturalWeather(data);
    } catch (error) {
      console.error('Error fetching agricultural weather data:', error);
      // Return sample data if API call fails
      return this.getSampleAgriculturalWeather();
    }
  }
  
  /**
   * Get historical weather data for Tonasket
   */
  async getHistoricalWeatherData(startDate: string, endDate: string): Promise<HistoricalWeatherData> { 
     if (!this.useRealApi) {
      // Simulate API delay and return sample historical data
      return this.simulateApiDelay(this.getSampleHistoricalWeather(startDate, endDate));
    }
    
    try {
      const { lat, lon } = TONASKET_COORDINATES;
      
      // Open-Meteo historical API call
      const params: Record<string, string> = { // Ensure values are strings
        latitude: String(lat),
        longitude: String(lon),
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
        start_date: startDate,
        end_date: endDate,
        temperature_unit: 'fahrenheit',
        precipitation_unit: 'inch',
        timezone: 'America/Los_Angeles'
      };
      const queryString = new URLSearchParams(params).toString(); // No cast needed now

      const response = await fetch(`${this.apiBaseUrl}/archive?${queryString}`); // Use /archive endpoint
      
      if (!response.ok) {
        throw new Error(`Historical weather API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform Open-Meteo data to our format
      return this.transformHistoricalWeather(data);
    } catch (error) {
      console.error('Error fetching historical weather data:', error);
      // Return sample data if API call fails
      return this.getSampleHistoricalWeather(startDate, endDate);
    }
  }

  // --- Transformation Methods ---

  /**
   * Transforms the full Open-Meteo forecast response into our WeatherData structure.
   */
  private transformOpenMeteoData(data: OpenMeteoApiResponse): WeatherData { // Use interface
    return {
      lat: data.latitude,
      lon: data.longitude,
      timezone: data.timezone,
      timezone_offset: data.utc_offset_seconds, // Use correct field name
      current: this.transformCurrentWeather(data.current, data.utc_offset_seconds, data.daily), // Pass daily for sunrise/sunset & use correct offset field
      hourly: this.transformHourlyForecast(data.hourly),
      daily: this.transformDailyForecast(data.daily),
      alerts: [] // Open-Meteo doesn't provide alerts, initialize as empty
    };
  }

  /**
   * Transforms Open-Meteo current weather data to our CurrentWeather format.
   */
  private transformCurrentWeather(
    current: Record<string, any> | undefined, 
    timezoneOffset: number, 
    daily: Record<string, any[]> | undefined
  ): CurrentWeather { 
    if (!current) {
      // Handle case where current data might be missing
      return this.getSampleCurrentWeather(); // Or throw error / return default
    }
    const condition = this.getWeatherCondition(current.weather_code);
    const dt = new Date(current.time as string).getTime() / 1000; // Assert time as string
    
    // Find matching daily entry to get sunrise/sunset for the current day
    const todayStr = (current.time as string).substring(0, 10); // Assert time as string
    const dailyIndex = daily?.time?.findIndex((day: string) => day === todayStr) ?? -1;
    const sunrise = dailyIndex !== -1 && daily?.sunrise?.[dailyIndex] ? new Date(daily.sunrise[dailyIndex]).getTime() / 1000 : NaN; // Add check for existence
    const sunset = dailyIndex !== -1 && daily?.sunset?.[dailyIndex] ? new Date(daily.sunset[dailyIndex]).getTime() / 1000 : NaN; // Add check for existence

    return {
      temp: current.temperature_2m as number, // Assert type
      feels_like: current.apparent_temperature as number, // Assert type
      // Use daily min/max for the current day if available
      temp_min: dailyIndex !== -1 ? daily?.temperature_2m_min?.[dailyIndex] as number : NaN, // Assert type
      temp_max: dailyIndex !== -1 ? daily?.temperature_2m_max?.[dailyIndex] as number : NaN, // Assert type
      pressure: current.pressure_msl as number, // Assert type
      humidity: current.relative_humidity_2m as number, // Assert type
      visibility: current.visibility as number, // Assert type
      wind_speed: current.wind_speed_10m as number, // Assert type
      wind_deg: current.wind_direction_10m as number, // Assert type
      clouds: current.cloud_cover as number, // Assert type
      dt: dt,
      sunrise: sunrise, 
      sunset: sunset,
      timezone: timezoneOffset,
      conditions: [condition] 
    };
  }
  
  /**
   * Transforms Open-Meteo hourly forecast data to our HourlyForecast[] format.
   */
  private transformHourlyForecast(hourly: Record<string, any[]> | undefined): HourlyForecast[] { 
    const forecast: HourlyForecast[] = [];
    const times = hourly?.time ?? [];

    for (let i = 0; i < times.length; i++) {
      const condition = this.getWeatherCondition(hourly?.weather_code?.[i]); // Add optional chaining
      const dt = new Date(times[i]).getTime() / 1000;

      const precip = hourly?.precipitation?.[i] as number | undefined; // Assert type

      forecast.push({
        dt: dt,
        temp: hourly?.temperature_2m?.[i], // Add optional chaining
        feels_like: hourly?.apparent_temperature?.[i], // Add optional chaining
        pressure: hourly?.pressure_msl?.[i], // Add optional chaining
        humidity: hourly?.relative_humidity_2m?.[i], // Add optional chaining
        dew_point: hourly?.dew_point_2m?.[i], // Add optional chaining
        uvi: hourly?.uv_index?.[i], // Add optional chaining
        clouds: hourly?.cloud_cover?.[i], // Add optional chaining
        visibility: hourly?.visibility?.[i], // Add optional chaining
        wind_speed: hourly?.wind_speed_10m?.[i], // Add optional chaining
        wind_deg: hourly?.wind_direction_10m?.[i], // Add optional chaining
        wind_gust: hourly?.wind_gusts_10m?.[i], // Add optional chaining
        weather: [condition], 
        pop: (hourly?.precipitation_probability?.[i] ?? 0) / 100, // Add optional chaining
        rain: precip !== undefined && precip > 0 ? { '1h': precip } : undefined, 
        snow: undefined 
      });
    }
    return forecast;
  }

  /**
   * Transforms Open-Meteo daily forecast data to our DailyForecast[] format.
   */
  private transformDailyForecast(daily: Record<string, any[]> | undefined): DailyForecast[] { 
    const forecast: DailyForecast[] = [];
    const times = daily?.time ?? [];

    for (let i = 0; i < times.length; i++) {
      const condition = this.getWeatherCondition(daily?.weather_code?.[i]); // Add optional chaining
      // Use noon time for daily timestamp to avoid timezone issues with just date string
      const dt = new Date(times[i] + 'T12:00:00').getTime() / 1000; 
      const sunrise = daily?.sunrise?.[i] ? new Date(daily.sunrise[i]).getTime() / 1000 : NaN; // Add check and optional chaining
      const sunset = daily?.sunset?.[i] ? new Date(daily.sunset[i]).getTime() / 1000 : NaN; // Add check and optional chaining

      forecast.push({
        dt: dt,
        sunrise: sunrise,
        sunset: sunset,
        temp: {
          day: NaN, // Open-Meteo daily doesn't provide 'day' temp directly, maybe avg max/min?
          min: daily?.temperature_2m_min?.[i], // Add optional chaining
          max: daily?.temperature_2m_max?.[i], // Add optional chaining
          night: NaN, 
          eve: NaN,   
          morn: NaN   
        },
        feels_like: { // Not directly available in Open-Meteo daily
          day: NaN,
          night: NaN,
          eve: NaN,
          morn: NaN
        },
        pressure: NaN, 
        humidity: NaN, 
        wind_speed: daily?.wind_speed_10m_max?.[i], // Add optional chaining
        wind_deg: daily?.wind_direction_10m_dominant?.[i], // Add optional chaining
        weather: [condition], 
        clouds: NaN, // Not typically in daily summary
        pop: (daily?.precipitation_probability_max?.[i] ?? 0) / 100, // Add optional chaining
        rain: daily?.precipitation_sum?.[i], // Add optional chaining
        snow: undefined, 
        uvi: daily?.uv_index_max?.[i] // Add optional chaining
      });
    }
    return forecast;
  }
  
  /**
   * Transforms Open-Meteo agricultural weather data to our AgriculturalWeatherData format.
   */
  private transformAgriculturalWeather(data: OpenMeteoApiResponse): AgriculturalWeatherData { 
    const soilTemp0cm = data.hourly?.soil_temperature_0cm?.slice(0, 24) ?? [];
    const soilMoisture0_1cm = data.hourly?.soil_moisture_0_1cm?.slice(0, 24) ?? [];
    
    // Fix reduce type issue by ensuring initial value is provided and types match
    const avgSoilTemp0cm = soilTemp0cm.length > 0 ? soilTemp0cm.reduce((sum: number, temp: number | null) => sum + (temp ?? 0), 0) / soilTemp0cm.length : NaN;
    const avgSoilMoisture0_1cm = soilMoisture0_1cm.length > 0 ? soilMoisture0_1cm.reduce((sum: number, moisture: number | null) => sum + (moisture ?? 0), 0) / soilMoisture0_1cm.length : NaN;
    
    const todayTempLow = data.daily?.temperature_2m_min?.[0] as number | undefined; // Assert type
    const tomorrowTempLow = data.daily?.temperature_2m_min?.[1] as number | undefined; 
    
    let frostRisk: 'none' | 'low' | 'medium' | 'high' = 'none';
    // Check if temps are defined before comparing
    if ((todayTempLow !== undefined && todayTempLow < 32) || (tomorrowTempLow !== undefined && tomorrowTempLow < 32)) {
      frostRisk = 'high';
    } else if ((todayTempLow !== undefined && todayTempLow < 36) || (tomorrowTempLow !== undefined && tomorrowTempLow < 36)) {
      frostRisk = 'medium'; 
    } else if ((todayTempLow !== undefined && todayTempLow < 40) || (tomorrowTempLow !== undefined && tomorrowTempLow < 40)) { 
       frostRisk = 'low';
    }
    
    return {
      soil_temperature: avgSoilTemp0cm, 
      soil_moisture: avgSoilMoisture0_1cm, 
      evapotranspiration: data.daily?.et0_fao_evapotranspiration?.[0] ?? NaN,
      growing_degree_days: data.daily?.growing_degree_days_base_50f_limit_86f?.[0] ?? NaN,
      frost_risk: frostRisk,
      precipitation_forecast: data.daily?.precipitation_sum ?? [] 
    };
  }
  
  /**
   * Transforms Open-Meteo historical weather data to our HistoricalWeatherData format.
   */
  private transformHistoricalWeather(data: OpenMeteoApiResponse): HistoricalWeatherData { 
    return {
      dates: (data.daily?.time as string[]) ?? [], // Assert type
      temperatures: {
        max: (data.daily?.temperature_2m_max as number[] | undefined) ?? null, // Assert type
        min: (data.daily?.temperature_2m_min as number[] | undefined) ?? null // Assert type
      },
      precipitation: (data.daily?.precipitation_sum as number[] | undefined) ?? null // Assert type and fixed syntax
    };
  }

  /**
   * Gets weather condition object based on Open-Meteo weather code.
   */
  private getWeatherCondition(code: number | null | undefined): WeatherCondition {
    // Weather condition mapping based on WMO codes
    const conditions: Record<number, { main: string; description: string; icon: string }> = {
      0: { main: 'Clear', description: 'Clear sky', icon: '01d' }, // Map to OWM like icons if needed
      1: { main: 'Clear', description: 'Mainly clear', icon: '01d' },
      2: { main: 'Clouds', description: 'Partly cloudy', icon: '02d' },
      3: { main: 'Clouds', description: 'Overcast', icon: '04d' },
      45: { main: 'Fog', description: 'Fog', icon: '50d' },
      48: { main: 'Fog', description: 'Depositing rime fog', icon: '50d' },
      51: { main: 'Drizzle', description: 'Light drizzle', icon: '09d' },
      53: { main: 'Drizzle', description: 'Moderate drizzle', icon: '09d' },
      55: { main: 'Drizzle', description: 'Dense drizzle', icon: '09d' },
      56: { main: 'Drizzle', description: 'Light freezing drizzle', icon: '09d' }, // Consider specific icon?
      57: { main: 'Drizzle', description: 'Dense freezing drizzle', icon: '09d' }, // Consider specific icon?
      61: { main: 'Rain', description: 'Slight rain', icon: '10d' },
      63: { main: 'Rain', description: 'Moderate rain', icon: '10d' },
      65: { main: 'Rain', description: 'Heavy rain', icon: '10d' },
      66: { main: 'Rain', description: 'Light freezing rain', icon: '13d' }, // Map to snow/mix icon?
      67: { main: 'Rain', description: 'Heavy freezing rain', icon: '13d' }, // Map to snow/mix icon?
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
    
    const result = conditions[code ?? -1] || { main: 'Unknown', description: 'Unknown weather condition', icon: 'unknown' };
    
    // Return structure matching WeatherCondition interface
    return {
        id: code ?? -1, // Use code as ID, or -1 if null/undefined
        main: result.main,
        description: result.description,
        icon: result.icon
    };
  }

  // --- Sample Data Generation Methods ---

  /**
   * Generates sample WeatherData for development.
   */
   private getSampleWeatherData(): WeatherData {
    const current = this.getSampleCurrentWeather();
    const hourly = this.getSampleHourlyForecast(24);
    const daily = this.getSampleDailyForecast(7);
    
    // Add sunrise/sunset from the first daily entry to current weather
    current.sunrise = daily[0]?.sunrise ?? NaN;
    current.sunset = daily[0]?.sunset ?? NaN;
    current.temp_min = daily[0]?.temp?.min ?? NaN;
    current.temp_max = daily[0]?.temp?.max ?? NaN;


    return {
      lat: TONASKET_COORDINATES.lat,
      lon: TONASKET_COORDINATES.lon,
      timezone: "America/Los_Angeles",
      timezone_offset: -25200,
      current: current,
      hourly: hourly,
      daily: daily,
      alerts: [this.getSampleWeatherAlert()] // Include sample alert
    };
  }

  /**
   * Generates sample CurrentWeather data for development.
   */
  private getSampleCurrentWeather(): CurrentWeather {
    const condition = this.getWeatherCondition(1); // Sample code for 'Mainly clear'
    return {
      temp: 68.5,
      feels_like: 67.8,
      temp_min: NaN, // Will be filled by getSampleWeatherData
      temp_max: NaN, // Will be filled by getSampleWeatherData
      pressure: 1015,
      humidity: 45,
      visibility: 10000,
      wind_speed: 3.6,
      wind_deg: 230,
      clouds: 20,
      dt: Math.floor(Date.now() / 1000), 
      sunrise: NaN, // Will be filled by getSampleWeatherData
      sunset: NaN, // Will be filled by getSampleWeatherData
      timezone: -25200,
      conditions: [condition]
    };
  }
  
  /**
   * Generates sample HourlyForecast data for development.
   */
  private getSampleHourlyForecast(hours: number): HourlyForecast[] {
    const forecast: HourlyForecast[] = [];
    const now = Math.floor(Date.now() / 1000);
    
    for (let i = 0; i < hours; i++) {
      const dt = now + (i * 3600);
      const conditionCode = [0, 1, 2, 3, 61, 71][Math.floor(Math.random() * 6)]; // Random condition code
      const condition = this.getWeatherCondition(conditionCode);
      const pop = Math.random() * 0.4;
      const precip = pop > 0.1 ? Math.random() * 0.1 : 0;

      forecast.push({
        dt: dt,
        temp: 65 + Math.sin(i / 6) * 10 + (Math.random() * 4 - 2),
        feels_like: 64 + Math.sin(i / 6) * 10 + (Math.random() * 4 - 2),
        pressure: 1010 + Math.random() * 10,
        humidity: 50 + Math.random() * 20,
        dew_point: 45 + Math.random() * 5,
        uvi: Math.max(0, 5 + Math.cos(i / 4) * 5),
        clouds: Math.random() * 100,
        visibility: 10000 - Math.random() * 2000,
        wind_speed: 5 + Math.random() * 10,
        wind_deg: Math.random() * 360,
        wind_gust: 15 + Math.random() * 10,
        weather: [condition],
        pop: pop,
        rain: precip > 0 && condition.main === 'Rain' ? { '1h': precip } : undefined,
        snow: precip > 0 && condition.main === 'Snow' ? { '1h': precip } : undefined
      });
    }
    return forecast;
  }

  /**
   * Generates sample DailyForecast data for development.
   */
  private getSampleDailyForecast(days: number): DailyForecast[] {
    const forecast: DailyForecast[] = [];
    const today = new Date();
    today.setHours(12, 0, 0, 0); // Use noon for consistent daily timestamp

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dt = Math.floor(date.getTime() / 1000);
      
      const sunrise = new Date(date);
      sunrise.setHours(6, 30, 0, 0);
      const sunset = new Date(date);
      sunset.setHours(19, 45, 0, 0);

      const conditionCode = [0, 1, 2, 3, 61, 71][Math.floor(Math.random() * 6)];
      const condition = this.getWeatherCondition(conditionCode);
      const pop = Math.random() * 0.5;
      const precip = pop > 0.2 ? Math.random() * 0.5 : 0;
      const tempMax = 70 + Math.sin(i / 3) * 10 + (Math.random() * 6 - 3);
      const tempMin = tempMax - 15 - Math.random() * 5;

      forecast.push({
        dt: dt,
        sunrise: Math.floor(sunrise.getTime() / 1000),
        sunset: Math.floor(sunset.getTime() / 1000),
        temp: {
          day: (tempMax + tempMin) / 2 + (Math.random() * 4 - 2), // Approximate day temp
          min: tempMin,
          max: tempMax,
          night: tempMin + (Math.random() * 4 - 2),
          eve: tempMax - (Math.random() * 4 - 2),
          morn: tempMin + (Math.random() * 6 - 3)
        },
        feels_like: { // Approximate feels_like
          day: (tempMax + tempMin) / 2 + (Math.random() * 4 - 2) - 2,
          night: tempMin + (Math.random() * 4 - 2) - 1,
          eve: tempMax - (Math.random() * 4 - 2) - 3,
          morn: tempMin + (Math.random() * 6 - 3) - 2
        },
        pressure: 1012 + Math.random() * 6,
        humidity: 55 + Math.random() * 15,
        wind_speed: 8 + Math.random() * 7,
        wind_deg: Math.random() * 360,
        weather: [condition],
        clouds: Math.random() * 75,
        pop: pop,
        rain: precip > 0 && condition.main === 'Rain' ? precip : undefined,
        snow: precip > 0 && condition.main === 'Snow' ? precip : undefined,
        uvi: Math.max(0, 6 + Math.cos(i / 2) * 3)
      });
    }
    return forecast;
  }
  
  /**
   * Generates sample AgriculturalWeatherData for development.
   */
  private getSampleAgriculturalWeather(): AgriculturalWeatherData {
    const risks: ('none' | 'low' | 'medium' | 'high')[] = ['none', 'low', 'medium', 'high'];
    return {
      soil_temperature: 60 + Math.random() * 15,
      soil_moisture: 25 + Math.random() * 10,
      evapotranspiration: 3 + Math.random() * 3,
      growing_degree_days: 150 + Math.random() * 50,
      frost_risk: risks[Math.floor(Math.random() * risks.length)],
      precipitation_forecast: Array(7).fill(0).map(() => Math.random() > 0.6 ? Math.random() * 0.5 : 0)
    };
  }
  
  /**
   * Generates sample HistoricalWeatherData for development.
   */
  private getSampleHistoricalWeather(startDate: string, endDate: string): HistoricalWeatherData {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const dates: string[] = [];
    const maxTemps: number[] = [];
    const minTemps: number[] = [];
    const precipitation: number[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
      
      const baseTemp = 60 + Math.sin(i / 7 * Math.PI) * 15; 
      maxTemps.push(Math.round(baseTemp + Math.random() * 10));
      minTemps.push(Math.round(baseTemp - 15 - Math.random() * 5));
      precipitation.push(Math.random() > 0.7 ? Math.random() * 0.5 : 0);
    }
    
    return {
      dates,
      temperatures: {
        max: maxTemps,
        min: minTemps
      },
      precipitation
    };
  }

  /**
   * Generates a sample WeatherAlert.
   */
  private getSampleWeatherAlert(): WeatherAlert {
      return {
          sender_name: "NWS Sample",
          event: "Sample Weather Advisory",
          start: Math.floor(Date.now() / 1000),
          end: Math.floor(Date.now() / 1000) + 3600 * 6, // 6 hours from now
          description: "This is a sample weather alert description for testing purposes.",
          tags: ["Sample", "Test"]
      };
  }

  /**
   * Simulate API delay for development.
   */
  private simulateApiDelay<T>(data: T): Promise<T> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 300); // Reduced delay
    });
  }
}

// Create a named instance before exporting to fix the anonymous default export warning
const weatherService = new WeatherService();
export default weatherService;
