import PropTypes, { string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function RectangleCard({
    image, image2, heading, info, text,
}) {
  return (
    <div className="weather_news-rectangle">
      <div className="img-container">
        <img src={image} alt="" />
        <img src={image2} alt="" />
      </div>
      <div className="text">
        <h3 className="uppercase font-bold">{heading}</h3>
        <p className="weather_news-info">{info}</p>
        <p className="weather_news-text">{text}</p>
        <p className="weather_news-continue">
          <Link to="/single-news">Continue reading</Link>
        </p>
        <p className="weather_news-date">10th November 2022</p>
      </div>
    </div>
  );
}

RectangleCard.propTypes = {
  heading: string,
  info: string,
  text: string,
  image: PropTypes.element,
  image2: PropTypes.element,
  //   image2: any,
};
