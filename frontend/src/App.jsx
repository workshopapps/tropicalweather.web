/* eslint-disable no-unused-vars */
import { init as initApm } from '@elastic/apm-rum';
import { ApmRoute } from '@elastic/apm-rum-react';

import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import AppLayout from './components/AppLayout';
import Notification from './pages/Notification';
import AirQuality from './pages/AirQuality';
import FullWeatherDetails from './pages/FullWeatherDetails';
import LandingPage from './pages/LandingPage';
import Error404 from './pages/Error404';
import Settings from './pages/Settings';
import NotificationFeedList from './pages/NotificationFeedList';
import Notificationsettings from './pages/Notificationsettings';
import './styles/Theme.css';

const apm = initApm({
  serviceName: 'Tropicalweather',
  serverUrl:
    'https://tropicalweather.hng.tech/',
  environment: 'production'
});

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/air-quality" element={<AirQuality />} />
      <Route path="/weather-details" element={<FullWeatherDetails />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notification-settings" element={<Notificationsettings />} />
      <Route path="/notification-feeds" element={<NotificationFeedList />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
