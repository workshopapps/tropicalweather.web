import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import getWeatherDescriptionCategory, { to12HourFormat } from '../../libs/Home';

export default function Timeline({ weatherForecast }) {
  const forecastContainer = useRef();
  const [lineWidth, setLineWidth] = useState('100%');
  const [currentTime, setCurrentTime] = useState(1);
  const { t } = useTranslation(['home']);

  useEffect(() => {
    const { scrollWidth, offsetWidth } = forecastContainer.current;
    setLineWidth(scrollWidth);
    const t = new Date().getHours() + 1;
    setCurrentTime(t);
    const scroll = (scrollWidth / 24) * t - 50;
    if (forecastContainer.current) {
      forecastContainer.current.scrollTo({
        left: scroll - offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [weatherForecast]);

  return (
    <div className="homepg-weatherfc">
      <ul className="relative pt-10 mt-[10px]" ref={forecastContainer}>
        <div
          className="absolute w-[1000px] bg-white/50 mt-8 top-[-20px]"
          style={{
            width: `${lineWidth - 50}px`,
          }}
        >
          <div
            className="relative bg-[#F7B27A] h-0.5"
            style={{
              width: `${(lineWidth / 24) * currentTime - 50}px`,
              transition: 'all 1s ease-out',
              transitionDelay: '.5s',
            }}
          >
            <span className="absolute top-[-10px] rounded-full right-[-10px] h-5 w-5 bg-[#F7B27A]" />
          </div>
        </div>
        {weatherForecast.map((forecast, index) => {
          const category = getWeatherDescriptionCategory(forecast.main);
          return (
            <li
              key={forecast.datetime}
              className="text-center homepg-heroforecast"
              style={{
                width: '100px',
                flexShrink: 0,
                paddingInline: '15px',
              }}
              id={`fcst-${index + 1}`}
            >
              <p>{to12HourFormat(forecast.datetime)}</p>
              <img
                src={`/assets/NotificationFeedList/${category}`}
                alt=""
              />
              <p>{t(forecast.main.replace(' ', '').toLowerCase())}</p>
            </li>
          );
        })}
        {!weatherForecast.length && (
          <p className="homepg-heroforecast">
            {t('weatherforecastfortheday')}
          </p>
        )}
      </ul>
    </div>
  );
}

Timeline.propTypes = {
  weatherForecast: PropTypes.arrayOf(PropTypes.shape({
    datetime: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    risk: PropTypes.string.isRequired,
  })).isRequired,
};
