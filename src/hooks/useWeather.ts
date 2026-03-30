import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getWeather } from "../api/weatherService";
import { WeatherResponse } from "../api/types";

export const useWeather = () => {
  const { city, language } = useSelector((state: RootState) => state.weather);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = `weather-${city}-${language}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData) as WeatherResponse;
          setWeather(parsedData);
          setLoading(false);
        } catch (e) {
          console.error("Error parsing cached weather data", e);
        }
      }

      try {
        const data = await getWeather(city, language);
        if (data) {
          setWeather(data);
          localStorage.setItem(cacheKey, JSON.stringify(data));
        } else {
          if (!cachedData)
            setError("No se pudo obtener la información del clima.");
        }
      } catch {
        if (!cachedData)
          setError("Error de conexión con el servicio de clima.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, language]);

  return { weather, loading, error, city, language };
};
