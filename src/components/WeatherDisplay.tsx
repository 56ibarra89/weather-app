import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getWeather } from '../api/weatherService';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import HourlyForecast from './HourlyForecast';

const WeatherDisplay = () => {
  const { city, language } = useSelector((state: RootState) => state.weather);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getWeather(city, language);
      setWeather(data);
      setLoading(false);
    };
    fetchData();
  }, [city, language]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;

  if (!weather) return <Typography align="center">❌ Error al obtener los datos.</Typography>;

  const forecast = weather.list[0];

  return (
    <Box>
      <Card sx={{ maxWidth: 400, mx: 'auto', mt: 3, p: 3, borderRadius: 4, boxShadow: 5, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5">{weather.city.name}</Typography>
          <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="icono" />
          </Box>
          <Typography variant="h6">{forecast.weather[0].description}</Typography>
          <Typography variant="h3" color="primary">🌡 {forecast.main.temp}°C</Typography>
          <Typography variant="body1">🔽 Min: {forecast.main.temp_min}°C | 🔼 Max: {forecast.main.temp_max}°C</Typography>
        </CardContent>
      </Card>

      {/* Pronóstico por horas */}
      <HourlyForecast />
    </Box>
  );
};

export default WeatherDisplay;