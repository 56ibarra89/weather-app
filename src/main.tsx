import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProviderWrapper } from './context/ThemeContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProviderWrapper>
      <App />
      </ThemeProviderWrapper> 
    </Provider>
  </React.StrictMode>
);
