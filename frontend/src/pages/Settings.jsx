import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { TfiAngleDown, TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import '../styles/Settings.css';
import i18next from 'i18next';

export default function Settings() {
  const [languageIsActive, setLanguageIsActive] = useState(false);
  const [themeIsActive, setThemeIsActive] = useState(false);
  const [language, setLanguage] = useState('');
  const { i18n, t } = useTranslation(['settings']);

  const languageData = [
    {
      title: `${t('nenglish')}`,
      subtitle: `${t('english')}`,
      value: 'en',
    },
    {
      title: `${t('nspanish')}`,
      subtitle: `${t('spanish')}`,
      value: 'es',
    },
    {
      title: `${t('nfrench')}`,
      subtitle: `${t('french')}`,
      value: 'fr',
    },
    {
      title: `${t('narabic')}`,
      subtitle: `${t('arabic')}`,
      value: 'ar',
    },
    {
      title: `${t('npolish')}`,
      subtitle: `${t('polish')}`,
      value: 'po',
    },
    {
      title: `${t('nchinese')}`,
      subtitle: `${t('chinese')}`,
      value: 'ch',
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
    <div className="settings">
      <Link to="/dashboard" className="settings_back">
        <TfiAngleLeft />
        <span>{t('back')}</span>
      </Link>
      <h3 className="settings_title">{t('title')}</h3>

      <div className="settings_item settings_language">
        <div className="settings_dropdown">
          <button
            type="button"
            className="settings_dropdown-btn"
            onClick={() => {
              setThemeIsActive(false);
              setLanguage(language);
              setLanguageIsActive(!languageIsActive);
            }}
          >
            <h4>{t('lang')}</h4>
            {languageIsActive ? (
              <TfiAngleDown className="settings_dropdown-icon" />
            ) : (
              <TfiAngleRight className="settings_dropdown-icon" />
            )}
          </button>
          <p className="settings_dropdown-body">{t('langText')}</p>
          {languageIsActive && (
            <section className="settings_dropdown-content">
              {languageData.map(({ title, value, subtitle }) => (
                <div className="settings_dropdown-item" key={title}>
                  <input
                    type="radio"
                    value={value}
                    name={language}
                    onChange={handleLanguageChange}
                  />
                  <div className="settings_dropdown-item-text">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <div className="settings_item settings_theme">
        <div className="settings_dropdown">
          <button
            type="button"
            className="settings_dropdown-btn"
            onClick={() => {
              setLanguageIsActive(false);
              setThemeIsActive(!themeIsActive);
            }}
          >
            <h4>{t('theme')}</h4>
            {themeIsActive ? (
              <TfiAngleDown className="settings_dropdown-icon" />
            ) : (
              <TfiAngleRight className="settings_dropdown-icon" />
            )}
          </button>
          <p className="settings_dropdown-body">{t('themeText')}</p>
          {themeIsActive && (
            <div className="settings_dropdown-content theme_dropdown-content">
              <div className="settings_dropdown-item">
                {t('lightmode')}
                <BsFillSunFill />
              </div>
              <div className="settings_dropdown-item">
                {t('darkmode')}
                <BsFillMoonFill />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="settings_item settings_notifications">
        <div className="settings_item-heading">
          <Link to="/notification-settings">
            <h4>{t('noti')}</h4>
          </Link>
        </div>
      </div>

      <div className="settings_item">
        <div className="settings_item-heading">
          <Link to="/help">
            <h4>{t('help')}</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
