import React from 'react';
import { TfiAngleDown, TfiAngleLeft } from 'react-icons/tfi';
import '../styles/Settings.css';

export default function Settings() {
    return (
      <div className="settings">
        <p className="settings_back">
          <TfiAngleLeft />
          <span>Back</span>
        </p>
        <h3 className="settings_title">Settings</h3>

        <div className="settings_item settings_language">
          <div className="settings_item-heading">
            <h4>Language</h4>
            <div className="settings_dropdown">
              <TfiAngleDown className="settings_dropdown-icon" />
              <div className="settings_dropdown-menu">Dropwdown</div>
            </div>
          </div>
          <p className="settings_item-body">Choose preferred language</p>
        </div>

        <div className="settings_item settings_theme">
          <div className="settings_item-heading">
            <h4>Theme</h4>
            <div className="settings_dropdown">
              <TfiAngleDown className="settings_dropdown-icon" />
              <div className="settings_dropdown-menu">
                <div className="settings_theme-item">
                  <p>Light Mode</p>
                  <span>+</span>
                </div>
                <div className="settings_theme-item">
                  <p>Dark Mode</p>
                  <span>+</span>
                </div>
              </div>
            </div>
          </div>
          <p className="settings_item-body">Select preferred mode</p>
        </div>

        <div className="settings_item settings_notifications">
          <div className="settings_item-heading">
            <h4>Notifications</h4>
            <div className="settings_dropdown settings_notifications-dropdown-box">
              <span>On</span>
              <TfiAngleDown className="settings_dropdown-icon" />
            </div>
          </div>
        </div>

        <div className="settings_item">
          <div className="settings_item-heading">
            <h4>Help</h4>
          </div>
        </div>
      </div>
    );
}
