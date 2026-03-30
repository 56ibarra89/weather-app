import { useWeather } from '../hooks/useWeather';
import { Card, CardContent, Typography, Box, CircularProgress, Grid } from '@mui/material';
import { Thermostat, WaterDrop } from '@mui/icons-material';

const WeatherDisplay = () => {
  const { weather, loading, error } = useWeather();

  if (loading && !weather) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <CircularProgress size={60} thickness={4} />
    </Box>
  );

  if (error && !weather) return <Typography align="center" sx={{ mt: 4, color: 'error.main' }}>❌ {error}</Typography>;
  if (!weather) return null;

  const forecast = weather.list[0];

  return (
    <Card sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 1 }}>{weather.city.name}</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ textTransform: 'capitalize', mb: 3 }}>
          {forecast.weather[0].description}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
           <Box
            component="img"
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
            alt="icono"
            sx={{ width: 120, height: 120, filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))' }}
          />
          <Typography variant="h2" sx={{ fontWeight: 800, ml: -2 }}>
            {Math.round(forecast.main.temp)}°
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Thermostat fontSize="small" color="primary" />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {Math.round(forecast.main.temp_min)}° / {Math.round(forecast.main.temp_max)}°
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <WaterDrop fontSize="small" color="primary" />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{forecast.main.humidity}% Hum.</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;