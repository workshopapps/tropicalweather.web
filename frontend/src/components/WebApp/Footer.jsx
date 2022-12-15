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
    <div className="fixed w-full items-center bottom-0 flex justify-between lg:w-[calc(100%-80px)] gap-2 px-2 lg:py-3 border-t border-t-[var(--accents-5)] md:px-16 bg-[var(--background)] right-0">
      <p className="text-[9px] md:order-first md:text-lg">{t('allrights')}</p>
      <div className="relative flex items-center gap-6 lg:gap-6">
        <span className="items-center hidden lg:flex footer-select footer-select_dash">
          <BsGlobe />
          <select value={language} onChange={handleLanguageChange}>
            {languageData?.map(({ title, langVal }) => (
              <option value={langVal} key={langVal}>
                {title}
              </option>
            ))}
          </select>
        </span>
        <span className="flex items-center h-auto gap-2 w-max lg:w-auto">
          <img src={`/icons/${language}-flag.png`} alt={`${language} flag`} />
        </span>
        <span className="pt-1 h-max">
          <ReactThemeToggleButton />
        </span>
      </div>
    </div>
  );
}
