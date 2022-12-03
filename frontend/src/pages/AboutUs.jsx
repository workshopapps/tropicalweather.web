import React, { useEffect } from 'react';
import AboutHeroSection from '../components/AboutUsPage/AboutHeroSection';
import AboutWeatherySection from '../components/AboutUsPage/AboutWeatherySection';
import WhyWeatherSection from '../components/AboutUsPage/WhyWeatherSection';
import AboutProductSection from '../components/AboutUsPage/AboutProductSection';

export default function AboutUs() {
 useEffect(() => {
  window.scrollTo(0, 0);
    }, []);

  return (
    <div className="px-4 md:px-16">
      <AboutHeroSection />
      <AboutWeatherySection />
      <WhyWeatherSection />
      <AboutProductSection />
    </div>
  );
}
