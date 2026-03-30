export interface WeatherCondition {
  description: string;
  icon: string;
  main: string;
}

export interface WeatherDataPoint {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherResponse {
  city: {
    name: string;
    country: string;
    population: number;
    timezone: number;
  };
  list: WeatherDataPoint[];
}

export interface ProcessedDay {
  dayName: string;
  formattedDate: string;
  maxTemp: number;
  minTemp: number;
  icon: string;
  description: string;
}

export interface CitySuggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
