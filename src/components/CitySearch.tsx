import { useDispatch } from 'react-redux';
import { setCity } from '../redux/weatherSlice';
import { TextField, Autocomplete, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

const cities = ['Diriamba', 'Toronto', 'Singapore', 'New York', 'Madrid', 'Tokyo'];

const CitySearch = () => {
  const dispatch = useDispatch();

  return (
    <Autocomplete
      freeSolo
      options={cities}
      onChange={(_, value) => dispatch(setCity(value || 'London'))}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar ciudad"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Box display="flex" alignItems="center" mr={1}>
                <Search />
              </Box>
            ),
          }}
        />
      )}
    />
  );
};

export default CitySearch;