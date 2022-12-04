import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function AboutWeatherySection() {
  const { t } = useTranslation(['about']);
  return (
    <div className="container mx-auto font-Outfit">
      <h2 className="text-[#2B2A30] font-bold text-2xl md:text-6xl text-center py-10">{t('abouttropicalweather')}</h2>
      <p className="text-[#82808F] font-normal text-base md:text-2xl">{t('abouttropicalweatherbody')}</p>

      <div className="flex justify-center py-10">
        <Link to="/dashboard" className="font-normal py-3 px-5 bg-[#EF6820] text-white text-lg rounded-lg" type="button">{t('getstarted')}</Link>
      </div>
    </div>
  );
}

export default AboutWeatherySection;
