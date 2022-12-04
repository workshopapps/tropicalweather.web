import React from 'react';
import { useTranslation } from 'react-i18next';

function AboutHeroSection() {
  const { t } = useTranslation(['about']);
  return (
    <div className="">
      <div className="space-y-6 font-Outfit">
        <h1 className="font-bold text-2xl md:text-6xl text-center text-[#2B2A30] md:pt-20 py-10">{t('aboutheadingtext')}</h1>
      </div>
      <div className="">
        <img
          src="AboutAsset/Frame 33849.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default AboutHeroSection;
