import axios from 'axios';
import React, { useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import MobileHeaderToggle from './MobileHeaderToggle';
import '../styles/Header.css';

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('false');
   const handleSearch = () => {
    if (search === 'false') {
           setSearch('true');
    } else {
      setSearch('false');
    }
   };
      const closeSearch = (e) => {
      setQuery(e.target.value);
      };
  const handleToggle = (param) => {
    setToggle(param);
  };
  const gotoDashboard = (city) => {
    setQuery('');
    searchRef.current.blur();
    navigate(`/dashboard?city=${city}`);
      setSearch('false');
  };

  const { data, isLoading } = useQuery(
    ['search', { param: query }],
    () => axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`),
    {
      staleTime: Infinity,
      enabled: query.length > 2,
    }
  );
  const searchResults =
    data?.data.results?.map((res) => `${res.name}, ${res.country}`) || [];

  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-16 lg:gap-10">
      <div className="header_logo">
        <Link to="/">
          <img src="/tropiclogo.png" alt="logo" />
        </Link>
      </div>
      <ul className="header_nav-links-list">
        <li className="header_nav-link">
          <Link to="/about-us">About us</Link>
        </li>
        <li className="header_nav-link">
          <Link to="/contact">Contact us</Link>
        </li>
        <li className="header_nav-link">
          <Link to="/">FAQs</Link>
        </li>
      </ul>
      <div className="items-center justify-end  hidden w-full m lg:flex gap-x-4">
        <label
          htmlFor="search"
          className="relative border-b justify-self-end border-grey-200 header_searcbox"
        >
          <input
            type="text"
            id="search"
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for city"
            className="outline-none px-12  py-4"
          />
          <CiSearch className="absolute text-2xl transform -translate-y-1/2 top-1/2 left-4" />
          {query.length > 0 && (
            <ul className="absolute z-10 w-full shadow bg-white py-4 max-h-96 overflow-y-auto">
              {query.length < 3 ? (
                <p className="text-gray-500 text-center">
                  Type at least three characters
                </p>
              ) : null}
              {searchResults.map((city) => (
                <li className="hover:bg-[#FDEAD7]" key={city}>
                  <button
                    className="py-5 px-4 w-full text-left"
                    type="button"
                    onClick={() => gotoDashboard(city)}
                  >
                    {city}
                  </button>
                </li>
              ))}
              {searchResults.length === 0 && query.length > 2 && !isLoading ? (
                <p className="text-gray-500 text-center">No cities found</p>
              ) : null}
              {isLoading ? (
                <p className="text-gray-500 text-center">Loading...</p>
              ) : null}
            </ul>
          )}
        </label>
        <button
          type="button"
          className="px-4 py-2 text-white rounded-lg bg-primary-btn w-max  header_btn"
        >
          Get App
        </button>
      </div>
      <div className="mobilesearch-abs" data-visible={search}>
        <label
          htmlFor="search"
          className="relative w-full max-w-xl border-b justify-self-end border-grey-200"
        >
          <input
            type="text"
            id="search"
            ref={searchRef}
            value={query}
            onChange={closeSearch}
            placeholder="Search for city"
            className="outline-none px-14 w-full  py-4"
          />
          <CiSearch className="absolute text-2xl transform -translate-y-1/2 top-1/2 left-4" />
          {query.length > 0 && (
            <ul className="absolute z-10 w-full shadow bg-white py-4 max-h-96 overflow-y-auto">
              {query.length < 3 ? (
                <p className="text-gray-500 text-center">
                  Type at least three characters
                </p>
              ) : null}
              {searchResults.map((city) => (
                <li className="px-4 hover:bg-gray-200" key={city}>
                  <button
                    className="py-5"
                    type="button"
                    onClick={() => gotoDashboard(city)}
                  >
                    {city}
                  </button>
                </li>
              ))}
              {searchResults.length === 0 && query.length > 2 ? (
                <p className="text-gray-500 text-center">No cities found</p>
              ) : null}
            </ul>
          )}
        </label>
      </div>
      <div className="mobilecon-flex">
        <button className="mobile-search" onClick={handleSearch} type="button">
          <CiSearch />
        </button>
        <MobileHeaderToggle handleToggle={handleToggle} toggle={toggle} />
      </div>
    </header>
  );
}
