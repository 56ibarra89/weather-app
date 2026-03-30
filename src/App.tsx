import LanguageSwitcher from './components/LanguageSwitcher';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import { Container, AppBar, Toolbar, Typography, IconButton, Box, Grid } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';

const App = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: themeContext.isDarkMode
          ? 'linear-gradient(135deg, #020617 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: { xs: 2, sm: 4 },
        transition: 'background 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        {/* Barra de navegación */}
        <AppBar position="sticky" sx={{ mb: 4 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, py: { xs: 1, sm: 0 } }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', minWidth: 'fit-content' }}>
              Weather<span style={{ opacity: 0.7 }}>App</span>
            </Typography>
            
            <CitySearch />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
              <LanguageSwitcher />
              <IconButton onClick={themeContext.toggleTheme} color="inherit">
                {themeContext.isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Contenido principal */}
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={4}>
            <WeatherDisplay />
          </Grid>
          <Grid item xs={12} md={8}>
            <DailyForecast />
          </Grid>
          <Grid item xs={12}>
            <HourlyForecast />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;