import React from 'react';
import AboutHeroSection from '../components/AboutUsPage/AboutHeroSection';
import AboutTropicalWeatherSection from '../components/AboutUsPage/AboutTropicalWeatherSection';
import WhyWeatherSection from '../components/AboutUsPage/WhyWeatherSection';
import AboutProductSection from '../components/AboutUsPage/AboutProductSection';

export default function AboutUs() {
  return (
    <div className="px-4 md:px-16">
      <AboutHeroSection />
      <AboutTropicalWeatherSection />
      <WhyWeatherSection />
      <AboutProductSection />
    </div>
  );
}
