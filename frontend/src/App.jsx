import React, { Suspense } from 'react';
import { ApmRoute } from '@elastic/apm-rum-react';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
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

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <ApmRoute element={<AppLayout />}>
      <ApmRoute path="/" element={<Home />} />
      <ApmRoute path="/about-us" element={<AboutUs />} />
      <ApmRoute path="/contact" element={<ContactUs />} />
      <ApmRoute path="/notification" element={<Notification />} />
      <ApmRoute path="/dashboard" element={<Dashboard />} />
      <ApmRoute path="/air-quality" element={<AirQuality />} />
      <ApmRoute path="/weather-details" element={<FullWeatherDetails />} />
      <ApmRoute path="/landing" element={<LandingPage />} />
      <ApmRoute path="/settings" element={<Settings />} />
      <ApmRoute path="/notification-settings" element={<Notificationsettings />} />
      <ApmRoute path="/notification-feeds" element={<NotificationFeedList />} />
      <ApmRoute path="*" element={<Error404 />} />
    </ApmRoute>
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
