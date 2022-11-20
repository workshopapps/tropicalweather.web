import React from 'react';

function WhyWeatherSection() {
  return (
    <div className="container mx-4 md:mx-auto flex flex-col-reverse lg:flex-row items-center md:gap-12 mt-14 lg:mt-28 font-Outfit">
      {/* --content- */}
      <div className="flex flex-1 flex-col items-center lg:items-start">
        <h1 className="font-bold leading-5 text-2xl md:text-3xl tracking-wide text-center md:text-start mb-6">Why Weathery?</h1>
        <h2 className="text-[#EF6820] font-bold text-xl md:text-2xl mb-4 text-start">We ensure that quality weather information is available to everyone.</h2>
        <p className="text-[#82808F] text-sm md:text-lg font-normal mb-4 text-start">We provide you with relevant local weather data no matter where you live. We guarantee provision of weather data to underserved communities.</p>
        {/* --content- */}
        <div className="flex justify-between gap-8">
          <div>
            <h1 className="text-[#2B2A30] font-bold text-2xl md:text-4xl">100+</h1>
            <p className="text-[#82808F] text-xs md:text-base">Forecast models</p>
          </div>
          <div>
            <h1 className="text-[#2B2A30] font-bold text-2xl md:text-4xl">500K+</h1>
            <p className="text-[#82808F] text-xs md:text-base">Locations</p>
          </div>
          <div>
            <h1 className="text-[#2B2A30] font-bold text-2xl md:text-4xl">10K+</h1>
            <p className="text-[#82808F] text-xs md:text-base">Satisfied users</p>
          </div>
        </div>
        <div className="pt-5">
          <button className="font-normal py-3 px-5 bg-[#EF6820] text-white text-lg rounded-lg" type="button">
            Get Started →
          </button>
        </div>
      </div>
      {/* --image- */}
      <div className="flex justify-center flex-1 overflow-hidden">
        <img
          src="AboutAsset/Frame 33860.png"
          alt=""
          className="hidden md:block w-5/6 h-5/6 sm:h-3/4 md:w-full md:h-full lg:h-full lg:w-full"
        />
      </div>

    </div>
  );
}

export default WhyWeatherSection;
