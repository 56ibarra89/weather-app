import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { getWeather } from '../api/weatherService';

const HourlyForecast = () => {
  const { city, language } = useSelector((state: RootState) => state.weather);
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeather(city, language);
      if (data) {
        setForecast(data.list.slice(0, 6)); // Mostramos las próximas 6 horas
      }
    };
    fetchData();
  }, [city, language]);

  if (forecast.length === 0)
    return <Typography textAlign="center" sx={{ mt: 2 }}>⌛ Cargando pronóstico...</Typography>;

  return (
    <Box mt={3} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        ⏳ Pronóstico por horas en {city}
      </Typography>

      {/* Contenedor de las tarjetas */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          p: 2,
          overflowX: 'auto',
          maxWidth: '100%',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-thumb': { background: '#1976d2', borderRadius: 4 }
        }}
      >
        {forecast.map((hour, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 140,
              textAlign: 'center',
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: 'background.paper',
              scrollSnapAlign: 'center',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt="icono"
                style={{ width: 50, height: 50 }}
              />
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                {hour.main.temp}°C
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🌡️ Sensación térmica: {hour.main.feels_like}°C
              </Typography>
              <Typography variant="body2" color="text.secondary">
                💧 Humedad: {hour.main.humidity}%
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {hour.weather[0].description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HourlyForecast;