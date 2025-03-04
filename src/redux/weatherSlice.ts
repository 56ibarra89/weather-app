import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  city: 'London',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setLanguage, setCity } = weatherSlice.actions;
export default weatherSlice.reducer;