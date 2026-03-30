import axios from 'axios';
import { WeatherResponse, CitySuggestion } from './types';

const API_KEY = 'e6798f89c2d993014b351294978d083e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeather = async (city: string, lang: string = 'en'): Promise<WeatherResponse | null> => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          units: 'metric',
          lang,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data', error);
      return null;
    }
  };

export const getCitySuggestions = async (query: string): Promise<CitySuggestion[]> => {
  if (!query || query.length < 3) return [];
  
  try {
    const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching city suggestions', error);
    return [];
  }
};