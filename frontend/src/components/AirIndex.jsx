import React from 'react';

export function AirIndex(props) {
    const classs = props.handleShow ? 'grid grid-cols-2 w-[40rem] bg-[#FEF2F2] p-[2rem] mb-[2rem]' : 'hidden';
  return (
    <div className={classs}>
      <div className="grid">
        <h1 className="font-bold">Levels</h1>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[green] w-[10px] h-[10px] rounded-full" />
          <p>Good</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[yellow] w-[10px] h-[10px] rounded-full" />
          <p>Moderate</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[orange] w-[10px] h-[10px] rounded-full" />
          <p>Unhealthy for sensitive groups</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[red] w-[10px] h-[10px] rounded-full" />
          <p>Unhealthy</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[green] w-[10px] h-[10px] rounded-full" />
          <p>Very unhealthy</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[green] w-[10px] h-[10px] rounded-full" />
          <p>Hazardious</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold">Sources</h1>
          <img src="close.png" alt="" className="cursor-pointer" onClick={props.changeVal} />
        </div>
        <p>
          Contains Copernicus Atmosphere Monitoring Service information 2022 and/or modified Copernicus Atmosphere Monitoring Service information 2022
          Neither the European Commission nor ECMWF is responsible for any use of this information
        </p>

      </div>

    </div>
  );
}
