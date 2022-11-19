import React from 'react';

export function WeatherCard(props) {
  return (
    <div className="flex flex-col items-center justify-between h-[8rem] p-[.7rem] border rounded-md">
      <p>{props.weather}</p>
      <img src={props.src} alt="" />
      <p>{props.time}</p>
    </div>
  );
}
