import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Faqs from './pages/Faqs';
import WeatherNews from './pages/WeatherNews';
import Career from './pages/Career';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/contact-us',
    component: <ContactUs />,
  },
  {
    path: '/about-us',
    component: <AboutUs />,
  },
  {
    path: '/faqs',
    component: <Faqs />,
  },
  {
    path: '/weather-news',
    component: <WeatherNews />,
  },
  {
    path: '/career',
    component: <Career />,
  }
])
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
