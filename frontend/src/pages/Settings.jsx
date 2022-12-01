import React, { useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { TfiAngleDown, TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import '../styles/Settings.css';

export default function Settings() {
    const [languageIsActive, setLanguageIsActive] = useState(false);
    const [themeIsActive, setThemeIsActive] = useState(false);

    return (
      <div className="settings">
        <Link to="/dashboard" className="settings_back">
          <TfiAngleLeft />
          <span>Back</span>
        </Link>
        <h3 className="settings_title">Settings</h3>

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
              <h4>Language</h4>
              {languageIsActive ? (
                <TfiAngleDown className="settings_dropdown-icon" />
              ) : (
                <TfiAngleRight className="settings_dropdown-icon" />
              )}
            </button>
            <p className="settings_dropdown-body">Choose preferred language</p>
            {languageIsActive && (
              <div className="settings_dropdown-content">
                <div className="settings_dropdown-item">English, US</div>
                <div className="settings_dropdown-item">Francais, FR</div>
              </div>
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
              <h4>Theme</h4>
              {themeIsActive ? (
                <TfiAngleDown className="settings_dropdown-icon" />
              ) : (
                <TfiAngleRight className="settings_dropdown-icon" />
                )}
            </button>
            <p className="settings_dropdown-body">Select preferred theme</p>
            {themeIsActive && (
              <div className="settings_dropdown-content theme_dropdown-content">
                <div className="settings_dropdown-item">
                  Light Mode
                  <BsFillSunFill />
                </div>
                <div className="settings_dropdown-item">
                  Dark Mode
                  <BsFillMoonFill />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="settings_item settings_notifications">
          <div className="settings_item-heading">
            <Link to="/notification">
              <h4>Notifications</h4>
            </Link>
          </div>
        </div>

        <div className="settings_item">
          <div className="settings_item-heading">
            <Link to="/help">
              <h4>Help</h4>
            </Link>
          </div>
        </div>
      </div>
    );
}
