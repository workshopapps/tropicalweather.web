import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import AppLayout from './components/AppLayout';
import Notification from './pages/Notification';
import AirQuality from './pages/AirQuality';
import FullWeatherDetails from './pages/FullWeatherDetails';
import LandingPage from './pages/LandingPage';
import Notificationsettings from './pages/Notificationsettings';


// import Promotions from './pages/Promotions';

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/air-quality" element={<AirQuality />} />
      <Route path="/weather-details" element={<FullWeatherDetails />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/notificationsettings" element={<Notificationsettings />} />

      {/* <Route path="/promotions" element={<Promotions />} /> */}
    </Route>
  )
);
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
