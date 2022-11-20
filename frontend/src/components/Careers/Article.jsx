import React from 'react';
import PropTypes from 'prop-types';

export default function Article({
 heading, content, imageSrc, position,
}) {
  return (
    <article className="career_marginbtm grid">
      <h2 className={`career_center ${position}`}>{heading}</h2>
      <img src={imageSrc} alt="" className={`career_marginbtm  ${position}`} />
      <div className={`career_con ${position}`}>
        <p className="career_left ">
          {content}

        </p>
        <button className={`career_more career_pt ${position}`} type="button">Learn more</button>
      </div>
    </article>
  );
}
Article.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};
