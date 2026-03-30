import { useWeather } from './useWeather';
import { WeatherDataPoint, ProcessedDay } from '../api/types';

export const useDailyForecast = () => {
  const { weather, loading, language } = useWeather();

  const processWeatherData = (list: WeatherDataPoint[]): ProcessedDay[] => {
    const dailyData: Record<string, WeatherDataPoint[]> = {};
    
    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    return Object.keys(dailyData).map((date) => {
      const points = dailyData[date];
      const maxTemp = Math.max(...points.map((p) => p.main.temp_max));
      const minTemp = Math.min(...points.map((p) => p.main.temp_min));
      
      const midDayPoint = points.find((p) => {
          const hour = new Date(p.dt * 1000).getHours();
          return hour >= 12 && hour <= 15;
      }) || points[0];

      const dateObj = new Date(points[0].dt * 1000);
      const dayName = dateObj.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { weekday: 'long' });
      const formattedDate = dateObj.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short' });

      return {
        dayName,
        formattedDate,
        maxTemp,
        minTemp,
        icon: midDayPoint.weather[0].icon,
        description: midDayPoint.weather[0].description,
      };
    }).slice(0, 5);
  };

  const days = weather ? processWeatherData(weather.list) : [];

  return { days, loading, weather };
};
