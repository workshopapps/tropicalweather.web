import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../styles/Error404.css';

export default function Error404() {
  const { t } = useTranslation(['error']);
    return (
      <div className="error-container">
        <div className="error-col1">
          <h1 className="error-head">{t('somethingwentwrong')}</h1>
          <p className="error-para">{t('thisisawkward')}</p>
          <div className="error-buttons">
            <Link to="/" className="Error-button">{t('backtohomepage')}</Link>
          </div>
        </div>
        <div className="error-col2">
          <img src="/Error404/illustration.png" alt="oops!!Error" className="Error-ill" />
          <img src="/Error404/illustration (2).png" alt="oops!!Error" className="Error-ill2" />
          <p className="error-para2">{t('thisisawkward')}</p>
          <div className="error-buttons2">
            <Link to="/" className="Error-button">{t('backtohomepage')}</Link>
          </div>
        </div>
      </div>
    );
    }
