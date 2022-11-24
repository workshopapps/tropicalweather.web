import React from 'react';
import {
  createBrowserRouter, RouterProvider, Route, createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import AppLayout from './components/AppLayout';
import Notification from './pages/Notification';
import AirQuality from './pages/AirQuality';
import Promotions from './pages/Promotions';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/air-quality" element={<AirQuality />} />
      <Route path="/promotions" element={<Promotions />} />
    </Route>,
  ),
);
export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
