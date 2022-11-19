import React from 'react';
import { Link } from 'react-router-dom';
import { BsGlobe } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';

export default function Footer() {
  return (
    <footer className="self-end pt-16 text-white bg-primary-btn-clicked">
      <div className="p-4 bg-[#B93815] md:py-10 md:px-16">
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:justify-between md:items-center">
          <div>
            <img src="logo-white.png" alt="logo" />
            <div className="flex flex-col flex-wrap gap-6 mt-8 md:flex-row">
              <Link to="/about-us" className="link link-hover">About us</Link>
              <Link to="/careers" className="link link-hover">Careers</Link>
              <Link to="/weather-news" className="link link-hover">Weather News</Link>
              <Link to="/business" className="link link-hover">For Business</Link>
              <Link to="/faqs" className="link link-hover">FAQs</Link>
              <Link to="/contact-us" className="link link-hover">Contact Us</Link>
              <Link to="/culture" className="link link-hover">Culture</Link>
            </div>
          </div>
          <div>
            <span className="footer-title">Download the mobile app</span>
            <div className="flex flex-wrap gap-6 mt-6">
              <img src="app-store.png" alt="app store" />
              <img src="google-play.png" alt="google play" />
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
              <img src="icons/uk-flag.png" alt="uk flag" />
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
