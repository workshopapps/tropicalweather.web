import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../styles/Error404.css';

export default function Error404() {
  const { t } = useTranslation(['error']);
    return (
      <div className="error-container">
        <div className="error-col1">
          <h1 className="error-head">{t('something went wrong')}</h1>
          <p className="error-para">{t('this i sawkward')}</p>
          <div className="error-buttons">
            <Link to="/" className="Error-button">{t('back to homepage')}</Link>
          </div>
        </div>
        <div className="error-col2">
          <img src="/Error404/Illustration.png" alt="oops!!Error" className="Error-ill" />
          <img src="/Error404/illustration2.png" alt="oops!!Error" className="Error-ill2" />
          <p className="error-para2">{t('This is awkward! Our site is under the weather or you are lost in the clouds. Either way, our site is still a delightful means for weather forecast.')}</p>
          <div className="error-buttons2">
            <Link to="/" className="Error-button">{t('back to homepage')}</Link>
          </div>
        </div>
      </div>
    );
    }
