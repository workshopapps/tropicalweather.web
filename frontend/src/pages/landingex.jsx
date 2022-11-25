import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

export default function Culture() {
  return (
    <div className="cont">
      <div className="head">
        <div className="main-img">
          <img src="assets/landingex/background star.png" alt="" className="back-star" />
          <img src="assets/landingex/mobile background.png" alt="" className="mobile" />
          <div className="head-text">
            <div className="clear">
              <img src="assets/landingex/clear icon.png" alt="" />
              <h4 className="clear1">Australia Region</h4>
            </div>
            <h2 className="title">Weather Forecast for Tropical Regions.</h2>
            <div className="subtit">
              <p className="subtitle">Understand the weather forecast around your region</p>
            </div>
            <div className="buttons">
              <Link to="/landing" className="land-but1">
                View More
              </Link>
              <div className="sec-btn">
                <Link to="/landing" className="land-but2">
                  Get App
                </Link>
                <img src="assets/landingex/get-app icon.png" alt="" className="getme" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="weather-updates">
        <div className="we-head">
          <div className="updates">
            <h2 className="we-up">Weather Updates</h2>
            <div className="by">
              <h6 className="daily">Daily</h6>
              <img src="assets/landingex/Vector (2).png" alt="" className="dropdown" />
            </div>
          </div>
          <p className="up-min">Updated a minute ago</p>
        </div>
        <div className="columns">
          <div className="left-col">
            <h3 className="hour">Hourly Updates</h3>
            <div className="section1">
              <div className="time">
                <h4>9:00am</h4>
                <img src="assets/landingex/rainy icon.png" alt="" className="dropdown" />
              </div>
              <div className="day">
                <p>Today, Friday</p>
                <p>Rainy</p>
              </div>
              <hr />
            </div>
            <div className="section2">
              <div className="time">
                <h4>10:00am</h4>
                <img src="assets/landingex/rainy icon.png" alt="" className="dropdown" />
              </div>
              <div className="day">
                <p>Today, Friday</p>
                <p>Rainy</p>
              </div>
              <hr />
            </div>
            <div className="section3">
              <div className="time">
                <h4>11:00am</h4>
                <img src="assets/landingex/cloudy icon.png" alt="" className="dropdown" />
              </div>
              <div className="day">
                <p>Today, Friday</p>
                <p>Cloudy</p>
              </div>
              <hr />
            </div>
            <div className="section4">
              <div className="time">
                <h4>12:00am</h4>
                <img src="assets/landingex/sunny icon.png" alt="" className="dropdown" />
              </div>
              <div className="day">
                <p>Today, Friday</p>
                <p>Sunny</p>
              </div>
              <hr />
            </div>
            <div className="section5">
              <div className="time">
                <h4>1:00am</h4>
                <img src="assets/landingex/sunny icon.png" alt="" className="dropdown" />
              </div>
              <div className="day">
                <p>Today, Friday</p>
                <p>Sunny</p>
              </div>
              <hr />
            </div>
          </div>
          <div className="right-col">
            <h3 className="hour">Risks</h3>
            <div className="section-col1">
              <img src="assets/landingex/vector (4).png" alt="" />
              <div className="condition">
                <h4 className="flood">Dust Levels</h4>
                <p className="today">Today, Friday</p>
              </div>
              <div className="from">
                <p className="high">LOW</p>
                <p className="when">From 10:00am to 11:00am</p>
              </div>
            </div>
            <hr />
            <div className="section-col1">
              <img src="assets/landingex/sun burn icon.png" alt="" />
              <div className="condition">
                <h4 className="flood">Sunburn</h4>
                <p className="today">Today, Friday</p>
              </div>
              <div className="from">
                <p className="high">HIGH</p>
                <p className="when">From 12:00am to 1:00pm</p>
              </div>
            </div>
            <hr />
            <div className="section-col1">
              <img src="assets/landingex/fog icon.png" alt="" />
              <div className="condition">
                <h4 className="flood">Fog Levels</h4>
                <p className="today">Today, Friday</p>
              </div>
              <div className="from">
                <p className="high">HIGH</p>
                <p className="when">From 11:00am to 12:00am</p>
              </div>
            </div>
            <hr />
            <div className="section-col1">
              <img src="assets/landingex/vector (4).png" alt="" />
              <div className="condition">
                <h4 className="flood">Dust Levels</h4>
                <p className="today">Today, Friday</p>
              </div>
              <div className="from">
                <p className="high">LOW</p>
                <p className="when">From 10:00am to 11:00am</p>
              </div>
            </div>
            <hr />
            <div className="section-col1">
              <img src="assets/landingex/flood.png" alt="" />
              <div className="condition">
                <h4 className="flood">Flood</h4>
                <p className="today">Today, Friday</p>
              </div>
              <div className="from">
                <p className="high">HIGH</p>
                <p className="when">From 9:00am to 10:00am</p>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div className="location-section">
        <div className="popular-locations">
          <div className="pop-header">
            <h2 className="pop-loc">Popular locations</h2>
            <p className="up-ago">Update a minute ago</p>
          </div>
          <div className="search-section">
            <form action="/" method="get">
              <label htmlFor="header-search">
                <span className="visually-hidden">Search blog posts</span>
              </label>
              <input className="in" type="text" id="header-search" placeholder="Search for City" name="s" />
            </form>
          </div>
          <div>
            <div className="main-state">
              <div className="state1">
                <div className="port">
                  <img src="assets/landingex/locatin icon.png" alt="" className="location-icon" />
                  <h3 className="portha">Sydney, Austrailia</h3>
                </div>
                <hr />
                <div className="Clou">
                  <h5 className="Cloudy">RAINY</h5>
                  <p className="expect">Expect rain and scattered thunderstorms by 7:00pm.</p>
                  <Link to="/landing" className="view-more">View More</Link>
                </div>
              </div>
              <div className="state2">
                <div className="port">
                  <img src="assets/landingex/locatin icon.png" alt="" className="location-icon" />
                  <h3 className="portha">Sydney, Austrailia</h3>
                </div>
                <hr />
                <div className="Clou">
                  <h5 className="Cloudy">RAINY</h5>
                  <p className="expect">Expect rain and scattered thunderstorms by 7:00pm.</p>
                  <Link to="/landing" className="view-more">View More</Link>
                </div>
              </div>
              <div className="state3">
                <div className="port">
                  <img src="assets/landingex/locatin icon.png" alt="" className="location-icon" />
                  <h3 className="portha">Sydney, Austrailia</h3>
                </div>
                <hr />
                <div className="Clou">
                  <h5 className="Cloudy">RAINY</h5>
                  <p className="expect">Expect rain and scattered thunderstorms by 7:00pm.</p>
                  <Link to="/landing" className="view-more">View More</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="cities">
            <h2 className="city">Cities near you</h2>
            <div className="set-places">
              <div className="first-row">
                <div className="first-city">
                  <img src="assets/landingex/places.png" alt="" className="place-icon" />
                  <div className="placename">
                    <p className="mel">Melbourne</p>
                    <p className="au">Australia</p>
                  </div>
                </div>
                <div className="first-city">
                  <img src="assets/landingex/places.png" alt="" className="place-icon" />
                  <div className="placename">
                    <p className="mel">Sydney</p>
                    <p className="au">Australia</p>
                  </div>
                </div>
                <div className="first-city">
                  <img src="assets/landingex/places.png" alt="" className="place-icon" />
                  <div className="placename">
                    <p className="mel">Brisbane</p>
                    <p className="au">Australia</p>
                  </div>
                </div>
                <div className="first-city">
                  <img src="assets/landingex/places.png" alt="" className="place-icon" />
                  <div className="placename">
                    <p className="mel">Hobart</p>
                    <p className="au">Australia</p>
                  </div>
                </div>
                <div className="first-city">
                  <img src="assets/landingex/places.png" alt="" className="place-icon" />
                  <div className="placename">
                    <p className="mel">Darwin</p>
                    <p className="au">Australia</p>
                  </div>
                </div>
              </div>
              <div className="second-row">
                <div className="sec-row">
                  <div className="first-city">
                    <img src="assets/landingex/places.png" alt="" className="place-icon" />
                    <div className="placename">
                      <p className="mel">New Castle</p>
                      <p className="au">Australia</p>
                    </div>
                  </div>
                  <div className="first-city">
                    <img src="assets/landingex/places.png" alt="" className="place-icon" />
                    <div className="placename">
                      <p className="mel">Gold Coast</p>
                      <p className="au">Australia</p>
                    </div>
                  </div>
                  <div className="first-city">
                    <img src="assets/landingex/places.png" alt="" className="place-icon" />
                    <div className="placename">
                      <p className="mel">Adelaide</p>
                      <p className="au">Australia</p>
                    </div>
                  </div>
                  <div className="first-city">
                    <img src="assets/landingex/places.png" alt="" className="place-icon" />
                    <div className="placename">
                      <p className="mel">Canberra</p>
                      <p className="au">Australia</p>
                    </div>
                  </div>
                  <div className="first-city">
                    <img src="assets/landingex/places.png" alt="" className="place-icon" />
                    <div className="placename">
                      <p className="mel">Perth</p>
                      <p className="au">Australia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="ex-heading">
          <h2 className="we-up">Explore FAQs</h2>
          <div className="by">
            <h6 className="daily">View in full</h6>
            <img src="assets/landingex/Vector (2).png" alt="" className="dropdown" />
          </div>
        </div>
        <div className="numlist">
          <div className="content">
            <div className="top">
              <h1 className="how">1. HOW DO I ADD, SAVE OR DELETE A LOCATION?</h1>
              <img src="assets/landingex/minus icon.png" alt="" className="minus" />
            </div>
            <p className="weat">
              Weather keeps track of your last five location searches.
              Click the drop-down arrow of the top right side of the page
              and you will see your most recently viewed five locations.
              When you search for additional locations, they will be replaced by the new ones.
              However, clearing your cookies will remove all saved locations.
            </p>
          </div>
          <div className="content2">
            <div className="top">
              <h1 className="how">2. WHAT ARE YOU DOING WITH MY LOCATION DATA?</h1>
              <img src="assets/landingex/add.png" alt="" className="minus" />
            </div>
          </div>
          <div className="content2">
            <div className="top">
              <h1 className="how">3. HOW DO I VIEW THE RADAR MAP?</h1>
              <img src="assets/landingex/add.png" alt="" className="minus" />
            </div>
          </div>
          <div className="content2">
            <div className="top">
              <h1 className="how">4. HOW DO I MANAGE THE NOTIFICATION?</h1>
              <img src="assets/landingex/add.png" alt="" className="minus" />
            </div>
          </div>
          <div className="content2">
            <div className="top">
              <h1 className="how">5. WHERE IS THE WEATHER NEWS SECTION?</h1>
              <img src="assets/landingex/add.png" alt="" className="minus" />
            </div>
          </div>
        </div>
        <div className="sub-foot">
          <div className="footimg">
            <div className="textfoot">
              <h1 className="gomobile">GO MOBILE</h1>
              <p className="use-free">Use the Free Weathery app</p>
              <p className="discover">Discover the convenience and flexibility of using our Weathery App on the go!</p>
              <div className="applink">
                <img src="assets/landingex/app store.png" alt="" className="apstore" />
                <img src="assets/landingex/play store.png" alt="" className="playstore" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
