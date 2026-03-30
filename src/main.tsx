import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProviderWrapper } from './context/ThemeProvider';
import './i18n/config'; // Init i18n


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProviderWrapper>
      <App />
      </ThemeProviderWrapper> 
    </Provider>
  </React.StrictMode>
);
