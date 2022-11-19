import React from 'react';
import { TfiAngleLeft } from 'react-icons/tfi';
import { BsShare } from 'react-icons/bs';
import { FiAlertCircle } from 'react-icons/fi';
import WeatherForecast from '../components/WeatherForecast';

export default function Dashboard() {
  const time = new Date().toLocaleTimeString();
  return (
    <div className="px-4 md:px-16">
      <div className="pt-6">
        <span className="flex items-center">
          <TfiAngleLeft className="mr-2 text-2xl" />
          <span className="text-2xl">Back</span>
        </span>
        <div className="">
          <div className="w-full max-w-3xl pt-10">
            <h1 className="mb-5 text-5xl font-bold">Lagos, Nigeria</h1>
            <WeatherForecast />
            <div
              className="pt-6 text-white rounded-md hero h-[549px] flex flex-col justify-between"
              style={{
                background: `url('${process.env.PUBLIC_URL}/dashboard/weather.png')`,
              }}
            >
              <div className="flex justify-between px-6">
                <span>{`Today . ${time} `}</span>
                <button type="button" aria-label="share"><BsShare /></button>
              </div>
              <div className="px-6">
                <img src="/dashboard/rain-icon.png" alt="rain" />
                <p>RAINY</p>

                <div className="w-full max-w-[500px]">
                  <span className="text-4xl font-bold">
                    Expect rain and scattered thunderstorms by
                    <br />
                    {' '}
                    12:00pm.
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 bg-black/50">
                <span className="flex items-center">
                  Flooding risk
                  <FiAlertCircle className="ml-2 text-sm" />
                </span>
                <p>Very High</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
