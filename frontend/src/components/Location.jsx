/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Location.css';
import marker from '../resources/marker-pin-01.png';
import trash from '../resources/trash-icon.png';

export default function Location(props) {
  return (
    <div className="saved_locations-container">
      <div className="location_city">
        <div className="city">
          <img src={marker} alt="" />
          {props.city}
        </div>
        <img src={trash} alt="" />
      </div>
      <div className="location_weather">{props.weather}</div>
      <div className="location_description">
        {props.description}
        {props.time}
      </div>
      <Link href="\" className="location_view-more">View more info</Link>
    </div>
  );
}
