import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import MobileHeaderToggle from './MobileHeaderToggle';

export default function Header() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = (param) => {
    setToggle(param);
  };

  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-16 lg:gap-10">
      <div>
        <Link to="/">
          <img src="/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="items-center justify-end hidden w-full lg:flex gap-x-4">
        <label
          htmlFor="search"
          className="relative w-full max-w-xl py-4 border-b border-grey-200"
        >
          <input
            type="text"
            id="search"
            placeholder="Search for city"
            className="outline-none px-14"
          />
          <CiSearch className="absolute text-2xl transform -translate-y-1/2 top-1/2 left-4" />
        </label>
        <button
          type="button"
          className="px-4 py-2 text-white rounded-lg bg-primary-btn w-max"
        >
          Get App
        </button>
      </div>
      <MobileHeaderToggle handleToggle={handleToggle} toggle={toggle} />
    </header>
  );
}
