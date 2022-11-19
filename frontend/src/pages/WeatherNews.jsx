import React from 'react';
import '../styles/weatherNews.css';
import { CiSearch } from 'react-icons/ci';
import {
  news1,
  news1Vert,
  news2,
  news2Vert,
  news3,
  news4,
  news5,
  news6,
} from '../assets/weatherNews';
import RectangleCard from '../components/WeatherNews/RectangleCard';

const articles = [
  {
    image: news2,
    heading:
      'Pakistan vs England, T20 World Cup Final: Will Rain Force Summit Clash To Go Into Reserve Day?',
    info: 'NDTV Sports Desk | Sunday November 13, 2022',
    text: 'One question on everyone`s minds ahead of the summit clash is about the weather and will it hold for a a full 40-overs game.',
  },
  {
    image: news4,
    heading:
      'Pakistan vs England, T20 World Cup Final: Will Rain Force Summit Clash To Go Into Reserve Day?',
    info: 'NDTV Sports Desk | Sunday November 13, 2022',
    text: 'One question on everyone`s minds ahead of the summit clash is about the weather and will it hold for a a full 40-overs game.',
  },
  {
    image: news1,
    heading:
      'Pakistan vs England, T20 World Cup Final: Will Rain Force Summit Clash To Go Into Reserve Day?',
    info: 'NDTV Sports Desk | Sunday November 13, 2022',
    text: 'One question on everyone`s minds ahead of the summit clash is about the weather and will it hold for a a full 40-overs game.',
  },
  {
    image: news5,
    heading:
      'Pakistan vs England, T20 World Cup Final: Will Rain Force Summit Clash To Go Into Reserve Day?',
    info: 'NDTV Sports Desk | Sunday November 13, 2022',
    text: 'One question on everyone`s minds ahead of the summit clash is about the weather and will it hold for a a full 40-overs game.',
  },
];

const rectangle1 = {
  image: news3,
  image2: news1Vert,
  heading: 'How And When Will The Sun Die? Researchers Have An Answer',
  info: 'World News | Edited by Nikhil Pandey | Saturday November 12, 2022',
  text: 'Scientists have forecasted when and how Sun will end, as well as what it would look like.',
};
const rectangle2 = {
  image: news6,
  image2: news2Vert,
  heading: 'NCAA warns pilots, airlines over adverse weather',
  info: 'Nigerian Aviation | By Wole Oyebade, 18 June 2021 | 3:06 am',
  text: 'The Nigerian Civil Aviation Authority (NCAA) has warned pilots to be wary of severe thunderstorms and other hazardous weather changes during the rainy season.',
};

export default function WeatherNews() {
  return (
    <>
      <main>
        <div className="hero">
          <h1 className="text-xl text-center">
            The Weather Inside Of 24 Hours and Beyond
          </h1>
          <h1 className="desktop-h1">
            The Weather Inside Of 24
            <br />
            Hours and Beyond
          </h1>
          <div className="input-control">
            <span>
              <CiSearch />
            </span>
            <input type="text" placeholder="Choose a location" />
            <button className="btn" type="button">
              Search
            </button>
          </div>
        </div>
        <ul className="temp-list md:text-xl bg-primary-btn">
          <li>Rainy</li>
          <li>Sunny </li>
          <li>Cloudy</li>
          <li>Windy</li>
          <li className="conditions">Thunderstorms</li>
          <li className="conditions">Heat</li>
        </ul>
        <div>
          <RectangleCard
            image={rectangle1.image}
            image2={rectangle1.image2}
            heading={rectangle1.heading}
            info={rectangle1.info}
            text={rectangle1.text}
          />
        </div>
        <div>
          <div className="cards">
            {articles.map((item) => (
              <div key={item.text} className="card">
                <div className="img-container mb-4">
                  <img src={item.image} alt="" />
                </div>
                <div className="text">
                  <h3 className="uppercase font-bold mb-3 text-md">
                    {item.heading}
                  </h3>
                  <p className="info">{item.info}</p>
                  <p className="text">{item.text}</p>
                  <p className="continue">
                    <a href="/">Continue reading</a>
                  </p>
                  <p className="date">10th November 2022</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-24">
          <RectangleCard
            image={rectangle2.image}
            image2={rectangle2.image2}
            heading={rectangle2.heading}
            info={rectangle2.info}
            text={rectangle2.text}
          />
        </div>
      </main>
    </>
  );
}
