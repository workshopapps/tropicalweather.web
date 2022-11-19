import React from 'react';

export function AllPolutants(props) {
  return (
    <div className="flex gap-[3rem] items-start">
      <img src={props.src} alt="" />
      <div className="grid gap-[1.5rem]">
        <p>{props.name}</p>
        <p className="font-bold">{props.quantity}</p>
        <p>{props.amount}</p>
      </div>
    </div>
  );
}
