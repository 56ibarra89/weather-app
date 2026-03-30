import { useWeather } from '../hooks/useWeather';
import { Box, Typography, Card, CardContent, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';

const HourlyForecast = () => {
  const { weather, loading } = useWeather();
  const { t } = useTranslation();
  const forecast = weather ? weather.list.slice(0, 6) : [];

  if (loading && !weather)
    return <Typography textAlign="center" sx={{ mt: { xs: 4, md: 10 } }}>{t('loadingForecast')}</Typography>;

  if (!weather) return null;

  return (
    <Box sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Card sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, pt: 2 }}>
          {t('hourlyForecastTitle')}
        </Typography>

      {/* Contenedor de las tarjetas */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          p: 2,
          pb: 4,
          overflowX: 'auto',
          maxWidth: '100%',
          scrollSnapType: 'x mandatory',
          cursor: 'grab',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-track': { 
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': { 
            background: (theme) => alpha(theme.palette.primary.main, 0.2), 
            borderRadius: 10,
            '&:hover': {
              background: (theme) => alpha(theme.palette.primary.main, 0.4),
            }
          }
        }}
      >
        {forecast.map((hour, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 160,
              p: 1,
              scrollSnapAlign: 'start',
            }}
          >
            <CardContent sx={{ p: '16px !important' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
              
              <Box
                component="img"
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt="icono"
                sx={{ width: 60, height: 60, mx: 'auto', filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.05))' }}
              />
              
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', my: 1 }}>
                {Math.round(hour.main.temp)}°
              </Typography>
              
              <Typography variant="caption" sx={{ display: 'block', mb: 1, textTransform: 'capitalize', fontWeight: 500 }}>
                {hour.weather[0].description}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, borderTop: 1, borderColor: 'divider', pt: 1, mt: 1 }}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">{t('feelsLike')}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{Math.round(hour.main.feels_like)}°</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">{t('humidity')}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{hour.main.humidity}%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
        </Box>
      </Card>
    </Box>
  );
};

export default HourlyForecast;