import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { BsGlobe } from 'react-icons/bs';
import ReactThemeToggleButton from '../Settings/ToggleTheme';

export default function Footer() {
  function getLanguageValues() {
    const storedLanguageValue = localStorage.getItem('i18nextLng');
    if (!storedLanguageValue) return '';
    return storedLanguageValue;
  }
  const { i18n, t } = useTranslation(['common']);
  const [language, setLanguage] = useState(getLanguageValues);

  useEffect(() => {
    localStorage.setItem('i18nextLng', language);
  }, [language]);

  const languageData = [
    {
      title: `${t('narabic')}`,
      langVal: 'ar',
    },
    {
      title: `${t('nenglish')}`,
      langVal: 'en',
    },
    {
      title: `${t('nfrench')}`,
      langVal: 'fr',
    },
    {
      title: `${t('nspanish')}`,
      langVal: 'es',
    },
  ];

  useEffect(() => {
    if (localStorage.getItem('i18nextLang')?.length > 2) {
      i18next.changeLanguage('en');
    }
  });

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setLanguage(e.currentTarget.value);
  };
  return (
    <div className="md:text-sm text-xs fixed bottom-0 left-0 right-0 flex flex-col justify-between w-full md:gap-4 px-4 py-2 md:py-5 bg-white border-t border-t-white md:flex-row md:px-16 bg-[var(--d-bg)] gap-2">
      <p className="md:order-first md:text-lg">
        {t('allrights')}
      </p>
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2">
          <BsGlobe />
          <select value={language} onChange={handleLanguageChange} className="outline-none focus:outline-none">
            {languageData?.map(({ title, langVal }) => (
              <option
                value={langVal}
                key={langVal}
              >
                {title}
              </option>
            ))}
          </select>
        </span>
        <span className="flex items-center gap-2">
          <img src={`/icons/${language}-flag.png`} alt={`${language} flag`} />
        </span>
        <span className="pt-1 h-max">
          <ReactThemeToggleButton />
        </span>
      </div>
    </div>
  );
}
