import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Faqs from './pages/Faqs';
import WeatherNews from './pages/WeatherNews';
import Career from './pages/Career';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/contact-us',
    element: <ContactUs />,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
  },
  {
    path: '/faqs',
    element: <Faqs />,
  },
  {
    path: '/weather-news',
    element: <WeatherNews />,
  },
  {
    path: '/career',
    element: <Career />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
