import React from 'react';
import '../styles/weatherBusiness.css';
import BusinessHeroSection from '../components/WeatherForBusiness/BusinessHeroSection';
import BusinessOverviewSection from '../components/WeatherForBusiness/BusinessOverviewSection';
import BusinessAdvantage from '../components/WeatherForBusiness/BusinessAdvantage';
import BusinessWeatherCards from '../components/WeatherForBusiness/BusinessWeatherCards';
import BusinessWeatherProducts from '../components/WeatherForBusiness/BusinessWeatherProducts';
import BusinessWeatherHowItWorks from '../components/WeatherForBusiness/BusinessWeatherHowItWorks';
import BusinessWeatherIndustries from '../components/WeatherForBusiness/BusinessWeatherIndustries';
import BusinessWeatherForm from '../components/WeatherForBusiness/BusinessWeatherForm';

export default function Business() {
  return (
    <div className="overflow-hidden">
      <BusinessHeroSection />
      <BusinessOverviewSection />
      <BusinessAdvantage />
      <BusinessWeatherCards />
      <BusinessWeatherProducts />
      <BusinessWeatherHowItWorks />
      <BusinessWeatherIndustries />
      <BusinessWeatherForm />
    </div>
  );
}
