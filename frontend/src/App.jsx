import React from 'react';
import {
  createBrowserRouter, RouterProvider, Route, createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Faqs from './pages/Faqs';
import WeatherNews from './pages/WeatherNews';
import Career from './pages/Career';
import Business from './pages/Business';
import Features from './pages/Features';
import AppLayout from './components/AppLayout';
import Culture from './pages/Culture';
import LandingpageAfrica from './pages/Landing-page-Africa';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/business" element={<Business />} />
      <Route path="/careers" element={<Career />} />
      <Route path="/weather-news" element={<WeatherNews />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/features" element={<Features />} />
      <Route path="/culture" element={<Culture />} />
      <Route path="/landingpageafrica" element={<LandingpageAfrica />} />

    </Route>,
  ),
);
export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
