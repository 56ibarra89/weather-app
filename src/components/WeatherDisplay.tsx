import { useWeather } from '../hooks/useWeather';
import { Card, CardContent, Typography, Box, CircularProgress, alpha, Stack, Divider } from '@mui/material';
import { Thermostat, WaterDrop, Air } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { keyframes } from '@emotion/react';

// Animación de flotar para el icono
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const WeatherDisplay = () => {
  const { weather, loading, error } = useWeather();
  const { t } = useTranslation();

  if (loading && !weather) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 400 }}>
      <CircularProgress size={60} thickness={4} />
    </Box>
  );

  if (error && !weather) return <Typography align="center" sx={{ mt: 4, color: 'error.main' }}>{t('errorMsg')}</Typography>;
  if (!weather) return null;

  const forecast = weather.list[0];

  return (
    <Card 
      sx={{ 
        p: 0, 
        overflow: 'hidden',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        background: (theme) => theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.1)} 0%, ${alpha('#000', 0.2)} 100%)`,
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
        boxShadow: (theme) => `0 24px 48px ${alpha(theme.palette.primary.main, 0.12)}`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'inherit',
          backdropFilter: 'blur(20px)',
          zIndex: 0
        }
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 1, p: { xs: 3, sm: 4, md: 5 }, flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        {/* Cabecera: Ciudad y Fecha */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-1px', mb: 0.5 }}>
            {weather.city.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ textTransform: 'capitalize', fontWeight: 500, letterSpacing: '0.5px' }}>
            {forecast.weather[0].description}
          </Typography>
        </Box>
        
        {/* Centro: Animación y Temperatura Gigante */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', xl: 'row' }, justifyContent: 'center', alignItems: 'center', gap: { xs: 0, sm: 2, xl: 4 }, flexGrow: 1, my: 2 }}>
           <Box
            component="img"
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
            alt="icono"
            sx={{ 
              width: { xs: 140, sm: 180, md: 200 }, 
              height: { xs: 140, sm: 180, md: 200 }, 
              filter: (theme) => `drop-shadow(0 12px 24px ${alpha(theme.palette.primary.main, 0.3)})`,
              animation: `${floatAnimation} 4s ease-in-out infinite`
            }}
          />
          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '5rem', sm: '7rem', md: '8rem' }, lineHeight: 1, color: 'primary.main', textShadow: (theme) => `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`, ml: { xs: 0, xl: -4 } }}>
            {Math.round(forecast.main.temp)}°
          </Typography>
        </Box>

        {/* Info Extra: Pastillas de Vidrio */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' }, borderColor: (theme) => alpha(theme.palette.primary.main, 0.2) }} />}
          sx={{ 
            background: (theme) => theme.palette.mode === 'light' ? alpha('#fff', 0.6) : alpha('#000', 0.4), 
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            borderRadius: 4, 
            p: 2.5,
            mt: 2
          }}
        >
          {/* Viento */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flex: 1, minWidth: '100px' }}>
            <Air color="primary" fontSize="large" sx={{ opacity: 0.8 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('wind')}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 800 }}>{Math.round(forecast.wind.speed)} {t('ms')}</Typography>
            </Box>
          </Box>
          
          {/* Sensación Térmica */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flex: 1, minWidth: '100px' }}>
            <Thermostat color="primary" fontSize="large" sx={{ opacity: 0.8 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('feelsLike')}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 800 }}>{Math.round(forecast.main.feels_like)}°</Typography>
            </Box>
          </Box>
          
          {/* Humedad */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flex: 1, minWidth: '100px' }}>
            <WaterDrop color="primary" fontSize="large" sx={{ opacity: 0.8 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('humidity')}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 800 }}>{forecast.main.humidity}%</Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;