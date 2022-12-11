import React from 'react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { init as initApm } from '@elastic/apm-rum';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';

Sentry.init({
  dsn: 'https://52edcc950001481187778f3b918cc666@o4504281393201152.ingest.sentry.io/4504308726956032',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
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
