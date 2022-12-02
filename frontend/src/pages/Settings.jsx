/* eslint-disable quotes */
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
    const { i18n, t } = useTranslation(['settings']);

    useEffect(() => {
      if (localStorage.getItem('i18nextLang')?.length > 2) {
        i18next.changeLanguage('en');
      }
    });

    const handleLanguageChange = (e) => {
      i18n.changeLanguage(e.target.value);
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
              <select className="settings_dropdown-content" onChange={handleLanguageChange} value={localStorage.getItem('i18nextLng')}>
                <option value="en">English, US</option>
                <option value="fr">Francais, FR</option>
                <option value="es">Espanol, ES</option>
              </select>
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
            <Link to="/notification">
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
