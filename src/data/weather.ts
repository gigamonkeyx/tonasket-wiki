export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  dt: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  conditions: WeatherCondition[];
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}

export interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  pop: number;
  rain?: { '1h': number };
  snow?: { '1h': number };
}

export interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: WeatherAlert[];
}

export interface AgriculturalWeatherData {
  soil_temperature: number;
  soil_moisture: number;
  evapotranspiration: number;
  growing_degree_days: number;
  frost_risk: 'none' | 'low' | 'medium' | 'high';
  precipitation_forecast: number[];
}

// Tonasket coordinates
export const TONASKET_COORDINATES = {
  lat: 48.7049,
  lon: -119.4414
};

// Sample weather data for development
export const sampleWeatherData: WeatherData = {
  lat: 48.7049,
  lon: -119.4414,
  timezone: "America/Los_Angeles",
  timezone_offset: -25200,
  current: {
    temp: 18.5,
    feels_like: 17.8,
    temp_min: 16.2,
    temp_max: 21.3,
    pressure: 1015,
    humidity: 45,
    visibility: 10000,
    wind_speed: 3.6,
    wind_deg: 230,
    clouds: 20,
    dt: 1682876400, // Unix timestamp
    sunrise: 1682854800,
    sunset: 1682906400,
    timezone: -25200,
    conditions: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02d"
      }
    ]
  },
  hourly: Array(24).fill(null).map((_, i) => ({
    dt: 1682876400 + (i * 3600),
    temp: 18.5 + (Math.random() * 4 - 2),
    feels_like: 17.8 + (Math.random() * 4 - 2),
    pressure: 1015,
    humidity: 45 + (Math.random() * 10 - 5),
    dew_point: 6.5,
    uvi: i < 12 ? 5.2 : 0,
    clouds: 20 + (Math.random() * 40 - 20),
    visibility: 10000,
    wind_speed: 3.6 + (Math.random() * 2 - 1),
    wind_deg: 230 + (Math.random() * 20 - 10),
    weather: [
      {
        id: 801,
        main: i < 6 ? "Clouds" : i < 12 ? "Clear" : i < 18 ? "Clouds" : "Clear",
        description: i < 6 ? "few clouds" : i < 12 ? "clear sky" : i < 18 ? "scattered clouds" : "clear sky",
        icon: i < 6 ? "02d" : i < 12 ? "01d" : i < 18 ? "03d" : "01n"
      }
    ],
    pop: Math.random() * 0.2
  })),
  daily: Array(7).fill(null).map((_, i) => ({
    dt: 1682876400 + (i * 86400),
    sunrise: 1682854800 + (i * 86400),
    sunset: 1682906400 + (i * 86400),
    temp: {
      day: 18.5 + (Math.random() * 6 - 3),
      min: 10.2 + (Math.random() * 4 - 2),
      max: 21.3 + (Math.random() * 4 - 2),
      night: 12.8 + (Math.random() * 4 - 2),
      eve: 17.5 + (Math.random() * 4 - 2),
      morn: 11.2 + (Math.random() * 4 - 2)
    },
    feels_like: {
      day: 17.8 + (Math.random() * 4 - 2),
      night: 11.5 + (Math.random() * 4 - 2),
      eve: 16.8 + (Math.random() * 4 - 2),
      morn: 10.5 + (Math.random() * 4 - 2)
    },
    pressure: 1015,
    humidity: 45 + (Math.random() * 10 - 5),
    wind_speed: 3.6 + (Math.random() * 2 - 1),
    wind_deg: 230 + (Math.random() * 20 - 10),
    weather: [
      {
        id: 800 + Math.floor(Math.random() * 3),
        main: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)],
        description: ["clear sky", "few clouds", "scattered clouds", "light rain"][Math.floor(Math.random() * 4)],
        icon: ["01d", "02d", "03d", "10d"][Math.floor(Math.random() * 4)]
      }
    ],
    clouds: 20 + (Math.random() * 40 - 20),
    pop: Math.random() * 0.4,
    uvi: 5.2 + (Math.random() * 2 - 1)
  })),
  alerts: [
    {
      sender_name: "NWS Spokane",
      event: "Fire Weather Watch",
      start: 1682876400,
      end: 1682962800,
      description: "The National Weather Service in Spokane has issued a Fire Weather Watch for low humidity and gusty winds, which is in effect from Saturday afternoon through Saturday evening.",
      tags: ["Fire", "Wind", "Heat"]
    }
  ]
};

// Sample agricultural weather data
export const sampleAgriculturalData: AgriculturalWeatherData = {
  soil_temperature: 12.4,
  soil_moisture: 28.5,
  evapotranspiration: 4.2,
  growing_degree_days: 145,
  frost_risk: 'low',
  precipitation_forecast: [0, 0, 0.5, 2.1, 0.8, 0, 0]
};
