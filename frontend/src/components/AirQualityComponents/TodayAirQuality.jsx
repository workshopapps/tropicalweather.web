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
          <div>
            <h1 className="text-2xl">Test</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TodayAirQuality;
