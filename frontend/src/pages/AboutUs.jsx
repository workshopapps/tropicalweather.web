import React from 'react';
import AboutHeroSection from '../components/AboutUsPage/AboutHeroSection';
import AboutWeatherySection from '../components/AboutUsPage/AboutWeatherySection';
import WhyWeatherSection from '../components/AboutUsPage/WhyWeatherSection';
import AboutProductSection from '../components/AboutUsPage/AboutProductSection';

export default function AboutUs() {
  return (
    <div>
      <AboutHeroSection />
      <AboutWeatherySection />
      <WhyWeatherSection />
      <AboutProductSection />
    </div>
  );
}
