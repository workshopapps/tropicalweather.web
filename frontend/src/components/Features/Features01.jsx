import React from 'react';
import logo from './img/logo.png';
import search from './img/search.png';
import icon from './img/Icon.png';

function Features01() {
  return (
    <div>
      <div className="part_01_feature">
        <div className="Num_feature">
          <h1> 01 </h1>
          <h1 className="style_h1_feature"> Accessible for everyone</h1>
        </div>
        <div className="style_01_writeup_feature">
          <p>
            Our product is designed to serve all users with  interactive and
            customized
            <br />
            experirence, Users get to personalize the product however they like
          </p>
          <button type="button"> Get started</button>
        </div>
      </div>
      <div className="select_page_feature">
        <div className="places_feature">
          <nav>
            <div className="logo_feature">
              <img src={logo} alt="" />
              <h1> Weathery</h1>
            </div>
            <div className="search_feature">
              <img src={search} alt="" />
              <input type="text" placeholder="Choose a Location" />
              <button type="button">Search</button>
            </div>
            <a href="/"> Weather settings</a>
          </nav>
          <div className="place_dropdown_feature">
            <img src={icon} alt="" />
            <h2> Weathery Settings</h2>
          </div>

          <div className="weathery_setting_feature">
            <div className="Lang_input_feature">
              <label htmlFor="Language"> Language</label>
              <input type="text" placeholder="Choose preferred language" />
              <hr />
              <label htmlFor="Theme"> Theme</label>
              <input type="text" placeholder="Select preffered mode" />
              <hr />
              <label className="help_feature" htmlFor="Language"> Help</label>
              <hr />
            </div>
            <div className="weathery_setting_feature">
              <form action="">
                <select name="place" id="places">
                  <option value="English">
                    English
                    <span> Default </span>
                  </option>
                  <option value="عربي <br">
                    <span> Arabic </span>
                    Arabic
                  </option>
                  <option value="saab">
                    Hrvatski
                    <br />
                    <span> Croatian</span>
                  </option>
                  <option value="opel">
                    Netherlands
                    <span>Dutch</span>
                  </option>
                  <option value="audi">
                    Suomi
                    <span> Finnish</span>
                  </option>
                  <option value="">
                    {' '}
                    <li>
                      {' '}
                      Francais
                      <br />
                      <span> French </span>
                    </li>
                  </option>
                  <option value="">
                    {' '}
                    Deutsch
                    <br />
                    <span> German</span>
                  </option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features01;
