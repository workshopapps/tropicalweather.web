import React from 'react';

export default function WeatherNews() {
  return (
    <>
      <main>
        <div className="hero">
          <h1>The Weather Inside Of 24 Hours and Beyond</h1>
          <h1 className="desktop-h1">
            The Weather Inside Of 24
            <br />
            Hours and Beyond
          </h1>
          <div className="input-control">
            <span>{/* <CiSearch /> */}</span>
            <input type="text" placeholder="Choose a location" />
            <button className="btn" type="button">
              Search
            </button>
          </div>
        </div>
        <ul className="temp-list">
          <li>Rainy</li>
          <li>Sunny </li>
          <li>Cloudy</li>
          <li>Windy</li>
          <li className="conditions">Thunderstorms</li>
          <li className="conditions">Heat</li>
        </ul>
        <div>
          <div className="rectangle">
            <p>lorem</p>
          </div>
          <div className="cards">
            <p>lorem</p>
            {/* {articles.map((item, index) => {
              return <Card {...item} key={index} />;
            })} */}
          </div>
        </div>
        <div className="rectangle">
          <p>lorem</p>
        </div>
      </main>
      <div className="pre-footer" />
      <footer>
        <div className="top-footer">
          <div>
            {/* <div>
              <img src={logoFooter} alt="" />
            </div> */}
            <nav>
              <ul>
                <li className="active">
                  <a href="/">About Us</a>
                </li>
                <li>
                  <a href="/">Careers</a>
                </li>
                <li>
                  <a href="/">Weather News</a>
                </li>
                <li>
                  <a href="/">For Business</a>
                </li>
                <li>
                  <a href="/">FAQs</a>
                </li>
                <li>
                  <a href="/">Contact US </a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <p className="download">Download the mobile app</p>
            <div className="appstore">
              {/* <img src={appstore} alt="app" />
              <img src={playstore} alt="app" /> */}
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom-footer">
          <div className="web">
            {/* <img src={footerIcons} alt="icon" className="mobile" />
            <img src={profile} alt="icon" className="desktop" /> */}
          </div>
          <p className="copyright">
            © 2022 Weathery, All rights reserved to Team Gear
          </p>
        </div>
      </footer>
    </>
  );
}
