import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/weatherSlice';
import { RootState } from '../redux/store';
import { Button, Box, alpha } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.weather.language);
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, background: (theme: Theme) => alpha(theme.palette.divider, 0.05), p: 0.5, borderRadius: '12px' }}>
      <Button
        size="small"
        onClick={() => handleLanguageChange('en')}
        sx={{
          borderRadius: '10px',
          px: 2,
          bgcolor: language === 'en' ? 'primary.main' : 'transparent',
          color: language === 'en' ? 'primary.contrastText' : 'text.secondary',
          '&:hover': {
            bgcolor: language === 'en' ? 'primary.dark' : alpha('#000', 0.05),
          },
          boxShadow: language === 'en' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
        }}
      >
        EN
      </Button>
      <Button
        size="small"
        onClick={() => handleLanguageChange('es')}
        sx={{
          borderRadius: '10px',
          px: 2,
          bgcolor: language === 'es' ? 'primary.main' : 'transparent',
          color: language === 'es' ? 'primary.contrastText' : 'text.secondary',
          '&:hover': {
            bgcolor: language === 'es' ? 'primary.dark' : alpha('#000', 0.05),
          },
          boxShadow: language === 'es' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
        }}
      >
        ES
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;