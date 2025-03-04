import axios from 'axios';

const API_KEY = 'e6798f89c2d993014b351294978d083e'; // 🔴 Reemplaza con tu clave de OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeather = async (city: string, lang: string = 'en') => {
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