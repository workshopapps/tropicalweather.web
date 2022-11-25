import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import { IoMdRainy, IoMdCloudy } from 'react-icons/io';
import { MdWbSunny } from 'react-icons/md';
import { BsCloudSnowFill } from 'react-icons/bs';
import { RiSunFoggyFill } from 'react-icons/ri';
import '../styles/Header.css';
import MobileHeaderToggle from './MobileHeaderToggle';

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleToggleNotification = () => {
    setToggleNotification(!toggleNotification);
  };

  const SidebarData = [
    {
      weather: 'Rainy',
      icon: <IoMdRainy />,
      day: 'Today',
    },
    {
      weather: 'Sunny',
      icon: <MdWbSunny />,
      day: 'Tomorrow',
    },
    {
      weather: 'Cloudy',
      icon: <IoMdCloudy />,
      day: 'Wednesday',
    },
    {
      weather: 'Snowwy',
      icon: <BsCloudSnowFill />,
      day: 'Thursday',
    },
    {
      weather: 'Foggy',
      icon: <RiSunFoggyFill />,
      day: 'Friday',
    },
  ];
  return (
    <header className="flex items-center justify-between px-4 py-4 lg:justify-start md:px-16 lg:gap-10">
      <div>
        <img src="logo.png" alt="logo" />
      </div>
      <div className="items-center hidden w-full grid-cols-[1fr_1fr_auto] lg:grid gap-x-4">
        <ul className="flex gap-10">
          <li>
            <Link to="/about-us" className="link link-hover">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/features" className="link link-hover">
              Features
            </Link>
          </li>
          <li>
            <Link to="/business" className="link link-hover">
              For Business
            </Link>
          </li>
          <button
            type="button"
            className="icon-button"
            onClick={handleToggleNotification}
          >
            <span className="material-icons">
              <FiBell />
            </span>
            <span className="icon-button__badge">{SidebarData.length}</span>
          </button>
        </ul>
        <label
          htmlFor="search"
          className="relative w-full py-4 border-b justify-self-end border-grey-200"
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
          className="px-6 py-4 text-white rounded-lg justify-self-end bg-primary-btn w-max"
        >
          Sign up
        </button>
      </div>
      <MobileHeaderToggle handleToggle={handleToggle} />

      <nav className={toggleNotification ? 'nav-menu active' : 'nav-menu'}>
        <p>
          <span>Notification</span>
          <span>{SidebarData.length}</span>
        </p>
        <ul className="nav-menu-items">
          {SidebarData.map((item) => (
            <li key={item.day} className="nav-text">
              <div className="nav-menu__icon-wrapper">
                {item.icon}
              </div>
              <div className="nav-text-right">
                <span>{item.weather}</span>
                <span>{item.day}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
