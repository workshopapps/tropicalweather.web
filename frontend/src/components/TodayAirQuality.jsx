import React from 'react';

function TodayAirQuality() {
  return (
    <div className="bg-[#FEF2F2] p-[2rem] rounded-md ">
      <h1 className="mb-[2rem]">
        <span className="text-2xl font-bold"> Today&apos;s Air Quality</span>
        - Yaba, Lagos, Nigeria
      </h1>
      <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-none gap-[1rem]">
        <div className="row-span-2 md:row-span-1 md:col-span-2 flex items-start gap-[15px]">
          <img src="95big.png" alt="" className="w-[97px] h-[97px]" />
          <div>
            <h1 className="text-2xl">Moderate</h1>
            <p>
              Air quality is acceptable; however,
              for some pollutants there may be a moderate health concern
              for a very small number of people who are unusually sensitive to air pollution.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start px-[2rem] ">
          <h1 className="font-bold">Primary Pollutant</h1>
          <p>PM2.5 (Particulate matter less than 2.5 microns)</p>
        </div>
      </div>
    </div>
  );
}
export default TodayAirQuality;
