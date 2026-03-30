import { Box, Typography, Card, CardContent, alpha, Grid } from '@mui/material';
import { useDailyForecast } from '../hooks/useDailyForecast';
import { ProcessedDay } from '../api/types';

const DailyCard = ({ day }: { day: ProcessedDay }) => (
  <Card 
    sx={{ 
      textAlign: 'center', 
      height: '100%',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.1)}`
      }
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
        {day.dayName}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        {day.formattedDate}
      </Typography>
      
      <Box
        component="img"
        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
        alt="clima"
        sx={{ width: 64, height: 64, mx: 'auto' }}
      />
      
      <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', my: 1 }}>
        {Math.round(day.maxTemp)}°
        <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 400 }}>
          {Math.round(day.minTemp)}°
        </Typography>
      </Typography>
      
      <Typography variant="caption" sx={{ textTransform: 'capitalize', fontWeight: 500, display: 'block' }}>
        {day.description}
      </Typography>
    </CardContent>
  </Card>
);

const DailyForecast = () => {
  const { days, loading, weather } = useDailyForecast();

  if (loading && !weather) return null;
  if (!weather) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
         Pronóstico de 5 Días
      </Typography>
      
      <Grid container spacing={2}>
        {days.map((day, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <DailyCard day={day} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DailyForecast;
