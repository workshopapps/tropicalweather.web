import React from 'react';
import { Link } from 'react-router-dom';

function AboutWeatherySection() {
  return (
    <div className="container mx-auto font-Outfit">
      <h2 className="text-[#2B2A30] font-bold text-2xl md:text-6xl text-center py-10">About Tropical Weather</h2>
      <p className="text-[#82808F] font-normal text-base md:text-2xl">Since our inception, Weathery has challenged the conventional method of retrieving weather information for the general public. We are extremely proud of the unique products developed by our community and experts to improve people &apos;s access to meaningful weather data in Nigeria. We are always looking for new data sets and technologies that will allow us to share more data with more people.</p>

      <div className="flex justify-center py-10">
        <Link to="/dashboard" className="font-normal py-3 px-5 bg-[#EF6820] text-white text-lg rounded-lg" type="button"> Get started → </Link>
      </div>
    </div>
  );
}

export default AboutWeatherySection;
