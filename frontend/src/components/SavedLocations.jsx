import React from 'react';
import '../styles/SavedLocations.css';
import mapLogo from '../resources/map-01.png';
import Location from './Location';

export default function SavedLocations() {
    const locationData = [
      {
        id: '1',
        city: 'Lagos, Nigeria',
        weather: 'Cloudy',
        description: 'Expect rain and scattered thunderstorms by ',
        date: '12 Nov, 2022',
        time: '12:00pm',
      },
      {
        id: '2',
        city: 'Port Harcourt',
        weather: 'Sunny',
        description: 'Expect rain and scattered thunderstorms by ',
        date: '12 Nov, 2022',
        time: '12:00pm',
      },
      {
        id: '3',
        city: 'Kano',
        weather: 'Sunny',
        description: 'Expect rain and scattered thunderstorms by ',
        date: '12 Nov, 2022',
        time: '12:00pm',
      },
    ];
    return (
      <div className="dashboard_savedLocations">
        <div className="dashboard_savedLocations-header">
          <h3>Saved Locations</h3>
          <button type="submit" className="addcity_btn">
            <span>+</span>
            Add city
          </button>
        </div>

        {
          (
            <div className="dashboard_savedLocations-body-empty">
              <div className="savedLocations_body-logo">
                <img src={mapLogo} alt="" />
              </div>
              <h4>No location saved yet</h4>
              <p>You can save a location to view the details later</p>
            </div>
          )
                &&
          (
          <div className="dashboard_savedLocations-body">
            {locationData.map((location) => (
              <Location
                key={location.id}
                weather={location.weather}
                time={location.time}
                city={location.city}
                description={location.description}
                date={location.date}
              />
            ))}
          </div>
          )
        }
      </div>
    );
}
