import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import getWeatherDescriptionCategory, { to12HourFormat } from '../../libs/Home';

export default function Timeline({ weatherForecast, immediateWeather }) {
  const forecastContainer = useRef();
  const [lineWidth, setLineWidth] = useState('100%');
  const [currentTime, setCurrentTime] = useState(1);
  const [riskTimeFrame, setRiskTimeFrame] = useState({ transform: 0, width: 0 });
  const [weatherNotice, setWeatherNotice] = useState('');
  const { t } = useTranslation(['home']);

  useEffect(() => {
    if (immediateWeather !== null) {
      const { scrollWidth, offsetWidth } = forecastContainer.current;
      setLineWidth(scrollWidth);
      const t = new Date().getHours() + 1;
      setCurrentTime(t);
      const scroll = 120 * t - 60 - offsetWidth / 2;

      const startTime = new Date(immediateWeather.datetime).getHours();
      const endTime = new Date(immediateWeather.end_datetime).getHours();
      setRiskTimeFrame({
        transform: (scrollWidth / 24) * startTime + 60,
        width: (endTime - startTime) * 120,
      });

      if (forecastContainer.current) {
        let rangeScroll = (120 * startTime);
        const diff = offsetWidth - ((endTime - startTime) * 120);
        if (diff > 1) {
          rangeScroll -= diff / 2;
        }
        forecastContainer.current.scrollTo({
          left: getWeatherDescriptionCategory(immediateWeather.main) === 'clear.png' ?
            scroll :
            rangeScroll,
          behavior: 'smooth',
        });
      }

      switch (getWeatherDescriptionCategory(immediateWeather.main)) {
        case 'rain.svg':
          setWeatherNotice('#95B6F6D4');
          break;
        case 'sun.svg':
          setWeatherNotice('#FF8746D4');
          break;
        case 'clouds.svg':
          setWeatherNotice('#B2D4F7D4');
          break;
        default:
          setWeatherNotice('');
      }
    }
  }, [immediateWeather]);

  return (
    <div
      className="w-full mb-32 lg:mb-0"
    >
      <div
        className="relative lg:pt-20 mt-[10px] max-w-full w-full overflow-x-scroll webkit-w"
        ref={forecastContainer}
      >
        <div
          className="absolute w-[1000px] bg-[var(--accents-2)] lg:mt-8 lg:top-[20px]"
          style={{
            width: `${lineWidth - 60}px`,
            overflowY: 'visible'
          }}
        >
          <div
            className="relative h-0.5"
            style={{
              width: `${(120) * currentTime - 60}px`,
              transition: 'all 1s ease-out',
              transitionDelay: '.5s',
            }}
          >
            <img
              src="/Home/polygon.png"
              className="absolute top-[0] right-[-10px]"
              style={{ border: 'transparent', color: 'red' }}
              alt="pointer"
            />
          </div>
          {
            weatherNotice !== '' && (
              <div
                className="mt-[-2px] relative flex justify-center"
                style={{
                  borderBottom: `5px solid ${weatherNotice}`,
                  overflowY: 'scroll',
                  width: `${riskTimeFrame.width}px`,
                  transform: `translateX(${riskTimeFrame.transform}px)`
                }}
              >
                <p
                  className="absolute text-[18px] uppercase font-bold"
                  style={{ transform: 'translateY(calc(-100%))' }}
                >
                  {immediateWeather.main}
                </p>
              </div>
            )
          }
        </div>
        <ul className="flex max-w-full mt-7">
          {weatherForecast.map((forecast, index) => {
            const category = getWeatherDescriptionCategory(forecast.main);
            return (
              <li
                key={forecast.datetime}
                className="text-center homepg-heroforecast"
                style={{
                  width: '120px',
                  flexShrink: 0,
                  paddingInline: '15px',
                }}
                id={`fcst-${index + 1}`}
              >
                <p>{to12HourFormat(forecast.datetime)}</p>
                <img
                  style={{ width: '60px' }}
                  src={`/assets/NotificationFeedList/${category}`}
                  alt=""
                />
                <p className="text-sm font-light uppercase">
                  RISK:
                  {forecast.risk ? ` ${forecast.risk}` : ' NONE'}
                </p>
                <p className="font-bold">{t(forecast.main?.replace(' ', '')?.toLowerCase())}</p>
              </li>
            );
          })}
        </ul>
        {!weatherForecast.length && (
          <p className="homepg-heroforecast">
            {t('weatherforecastfortheday')}
          </p>
        )}
      </div>
    </div>
  );
}

Timeline.propTypes = {
  weatherForecast: PropTypes.arrayOf(PropTypes.shape({
    datetime: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    risk: PropTypes.string.isRequired,
  })).isRequired,
  immediateWeather: PropTypes.shape({
    datetime: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    end_datetime: PropTypes.string.isRequired,
  }),
};
