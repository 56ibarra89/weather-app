import LanguageSwitcher from './components/LanguageSwitcher';
import CitySearch from './components/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import { Container, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';

const App = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  return (
    
    <Container>
      {/* Barra de navegación */}
      <AppBar position="static" color="primary" sx={{ borderRadius: 2, mt: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Weather App</Typography>
          <LanguageSwitcher />
          <IconButton onClick={themeContext.toggleTheme} color="inherit">
            {themeContext.isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Container sx={{ mt: 4 }}>
        
        <CitySearch />
        <WeatherDisplay />
      </Container>
    </Container>
  );
};

export default App;