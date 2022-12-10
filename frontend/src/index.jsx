import React from 'react';
import ReactDOM from 'react-dom/client';

import { init as initApm } from '@elastic/apm-rum';

import './index.css';
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';

const apm = initApm({

  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'Tropicalweather',

  // Set the service environment
  environment: 'production'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
