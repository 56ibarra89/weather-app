import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/weatherSlice';
import { RootState } from '../redux/store';
import { Button, ButtonGroup } from '@mui/material';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.weather.language);

  return (
    <ButtonGroup variant="contained">
      <Button
        onClick={() => dispatch(setLanguage('en'))}
        color={language === 'en' ? 'primary' : 'secondary'}
      >
        English
      </Button>
      <Button
        onClick={() => dispatch(setLanguage('es'))}
        color={language === 'es' ? 'primary' : 'secondary'}
      >
        Español
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;