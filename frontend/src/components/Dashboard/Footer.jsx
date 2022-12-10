import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsGlobe } from 'react-icons/bs';
import ReactThemeToggleButton from '../Settings/ToggleTheme';

export default function Footer() {
  const { t } = useTranslation(['common']);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-between w-full gap-4 px-4 py-5 bg-white border-t border-t-white md:flex-row md:px-16 bg-[var(--d-bg)]">
      <p className="text-sm md:order-first md:text-lg">
        {t('allrights')}
      </p>
      <div className="flex gap-6 items-center">
        <span className="flex items-center gap-2">
          <BsGlobe />
          <span className="hidden md:block">English</span>
        </span>
        <span className="flex items-center gap-2">
          <img src="/icons/naija-flag.png" alt="Nigeria flag" />
          <span className="hidden md:block">Nigeria</span>
        </span>
        <span className="h-max pt-1">
          <ReactThemeToggleButton />
        </span>
      </div>
    </div>
  );
}
