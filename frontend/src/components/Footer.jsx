import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsGlobe } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';

export default function Footer() {
  useEffect(() => {
    //  scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <footer className="self-end pt-16 text-white bg-primary-btn-clicked">
      <div className="p-4 bg-[#B93815] md:py-10 md:px-16">
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:justify-between md:items-center">
          <div>
            <img src="/footer-logo.png" alt="logo" />
            <div className="flex flex-col flex-wrap gap-6 mt-8 md:flex-row">
              <Link
                onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
                to="/about-us"
                className="link link-hover"
              >
                About us
              </Link>
              {/* <Link to="/promotions" className="link link-hover">Promotions</Link> */}
              <Link to="/about-us" className="link link-hover">About us</Link>
              <Link to="/contact" className="link link-hover">Contact Us</Link>
            </div>
          </div>
          <div>
            <span className="footer-title">Download the mobile app</span>
            <div className="flex flex-wrap gap-6 mt-6">
              <Link
                to="https://appetize.io/app/lca2f4kgwzqiveyfwvjqlmplsq?device=pixel4&osVersion=11.0&scale=75"
              >
                <img src="/app-store.png" alt="app store" />
              </Link>
              <Link
                to="https://appetize.io/app/lca2f4kgwzqiveyfwvjqlmplsq?device=pixel4&osVersion=11.0&scale=75"
              >
                <img src="/google-play.png" alt="google play" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-5 border-t border-t-white md:flex-row">
          <p className="order-last text-sm md:order-first md:text-base">© 2022 Weathery, All rights reserved to Team Gear</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <BsGlobe />
              <span className="hidden md:block">English</span>
            </span>
            <span className="flex items-center gap-2">
              <img src="/icons/uk-flag.png" alt="uk flag" />
              <span className="hidden md:block">United Kingdom</span>
            </span>
            <span className="flex items-center gap-2">
              <BiSupport />
              <span className="hidden md:block">Customer Support</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
