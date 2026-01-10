import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import './style.css';
import React from 'react';
import { Provider } from 'react-redux';
import { appStore } from './components/app/app-store';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={appStore} >
      <App />
    </Provider>
  </React.StrictMode>
);