import PropTypes, { string } from 'prop-types';
import React from 'react';

export default function RectangleCard({
    image, image2, heading, info, text,
}) {
  return (
    <div className="rectangle">
      <div className="img-container">
        <img src={image} alt="" />
        <img src={image2} alt="" />
      </div>
      <div className="text">
        <h3 className="uppercase font-bold">{heading}</h3>
        <p className="info">{info}</p>
        <p className="text">{text}</p>
        <p className="continue">
          <a href="/">Continue reading</a>
        </p>
        <p className="date">10th November 2022</p>
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
