/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import PropTypes from 'prop-types';
import '../../styles/Forecast.css';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Forecast({ data }) {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length)
  .concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <div className="forecast_container">
      <h3 className="forecast_heading">Seven Day Forecast:</h3>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img src={`FullWeather/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather[0].description}</label>
                  <label className="min-max">
                    {Math.round(item.main.temp_max)}
                    °C /
                    {Math.round(item.main.temp_min)}
                    °C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>
                    {item.clouds.all}
                    %
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>
                    {item.wind.speed}
                    m/s
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>
                    {item.main.sea_level}
                    m
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>
                    {item.main.feels_like}
                    °C
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
Forecast.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object,
};
