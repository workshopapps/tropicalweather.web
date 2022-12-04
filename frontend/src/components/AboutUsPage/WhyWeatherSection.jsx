import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function WhyWeatherSection() {
  const { t } = useTranslation(['about']);
  return (
    <div className="container flex flex-col-reverse items-center mx-0 md:mx-auto lg:flex-row md:gap-12 mt-14 lg:mt-28 font-Outfit">
      <div className="flex flex-col items-center flex-1 lg:items-start">
        <p className="mb-6 text-2xl font-bold leading-5 tracking-wide text-center md:text-3xl md:text-start">{t('whytropicalweather')}</p>
        <p className="text-[#EF6820] font-bold text-[18px] md:text-2xl mb-4 text-start">{t('weensure')}</p>
        <p className="text-[#82808F] text-sm md:text-lg font-normal mb-4 text-start">{t('weensurebody')}</p>
        {/* --content- */}
        <div className="flex justify-between gap-8">
          <div>
            <p className="text-[#2B2A30] font-bold text-2xl md:text-4xl">100+</p>
            <p className="text-[#82808F] text-xs md:text-base">{t('forecastmodels')}</p>
          </div>
          <div>
            <p className="text-[#2B2A30] font-bold text-2xl md:text-4xl">500K+</p>
            <p className="text-[#82808F] text-xs md:text-base">{t('locations')}</p>
          </div>
          <div>
            <p className="text-[#2B2A30] font-bold text-2xl md:text-4xl">10K+</p>
            <p className="text-[#82808F] text-xs md:text-base">{t('satisfiedusers')}</p>
          </div>
        </div>
        <div className="pt-5">
          <Link to="/dashboard" className="font-normal py-3 px-5 bg-[#EF6820] text-white text-lg rounded-lg" type="button">{t('getstarted')}</Link>
        </div>
      </div>
      {/* --image- */}
      <div className="flex justify-center flex-1 overflow-hidden">
        <img
          src="AboutAsset/Frame 33860.png"
          alt=""
          className="hidden w-5/6 md:block h-5/6 sm:h-3/4 md:w-full md:h-full lg:h-full lg:w-full"
        />
      </div>

    </div>
  );
}

export default WhyWeatherSection;
