import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { BsGlobe } from 'react-icons/bs';
import ReactThemeToggleButton from '../Settings/ToggleTheme';
import '../../styles/Footer.css';

function getLanguageValues() {
  const storedLanguageValue = localStorage.getItem('i18nextLng');
  if (!storedLanguageValue) return '';
  return storedLanguageValue;
}

export default function Footer() {
  const { i18n, t } = useTranslation(['common']);
  const [language, setLanguage] = useState(getLanguageValues);

  useEffect(() => {
    localStorage.setItem('i18nextLng', language);
  }, [language]);

  useEffect(() => {
    setInterval(() => {
      setLanguage(localStorage.getItem('i18nextLng'));
    }, 2000);
  }, []);

  const languageData = [
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
    {
      title: `${t('narabic')}`,
      langVal: 'ar',
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
    <div className="fixed bottom-0 right-0 flex flex-col justify-between w-full gap-4 px-2 py-5 bg-white border-t border-t-white md:flex-row md:px-16 bg-[var(--d-bg)] left-0 border">
      <p className="text-sm md:order-first md:text-lg">{t('allrights')}</p>
      <div className="flex items-center gap-6">
        <span className="flex items-center footer-select footer-select_dash">
          <BsGlobe />
          <select value={language} onChange={handleLanguageChange}>
            {languageData?.map(({ title, langVal }) => (
              <option value={langVal} key={langVal}>
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
