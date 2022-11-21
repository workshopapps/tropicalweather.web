import React from 'react';
import logo from './img/logo.png';
import search from './img/search.png';
import Picture from './Picture';

function Features02() {
  return (
    <div>
      <div className="part_01_feature">

        <div className="Num_feature">
          <h1> 02 </h1>
          <h1 className="style_h1_feature"> Everything you need </h1>
        </div>
        <div className="style_01_writeup_feature">
          <p>
            Get all the infos you need to make living safer, easier and better. We aim at
            <br />

            making life easier and better for our users
          </p>
          <button type="button"> Get started</button>
        </div>
        <div className="select_page1_feature">
          <div className="places2_feature">
            <nav>
              <div className="logo_feature">
                <img src={logo} alt="" />
                <h1> Weathery</h1>
              </div>
              <div className="search_feature">
                <img src={search} alt="" />
                <input type="text" placeholder="Choose a Location" />
                <button type="button"> Search </button>
              </div>
              <a href="/"> Weather settings_feature</a>
            </nav>
          </div>
          <Picture />
        </div>
      </div>

    </div>
  );
}

export default Features02;
