import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import MobileHeaderToggle from './MobileHeaderToggle';

export default function Header() {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <header className="flex items-center justify-between px-4 py-4 lg:justify-start md:px-16 lg:gap-10">
      <div>
        <img src="logo.png" alt="logo" />
      </div>
      <div className="items-center hidden w-full grid-cols-[1fr_1fr_auto] lg:grid gap-x-4">
        <ul className="flex gap-10">
          <li>
            <a href="/about-us" className="link link-hover">About Us</a>
          </li>
          <li>
            <a href="/careers" className="link link-hover">Features</a>
          </li>
          <li>
            <a href="/business" className="link link-hover">For Business</a>
          </li>
        </ul>
        <label htmlFor="search" className="relative w-full py-4 border-b justify-self-end border-grey-200">
          <input type="text" id="search" placeholder="Search for city" className="outline-none px-14" />
          <CiSearch className="absolute text-2xl transform -translate-y-1/2 top-1/2 left-4" />
        </label>
        <button type="button" className="px-6 py-4 text-white rounded-lg justify-self-end bg-primary-btn w-max">Sign up</button>
      </div>
      <MobileHeaderToggle handleToggle={handleToggle} />
    </header>
  );
}
