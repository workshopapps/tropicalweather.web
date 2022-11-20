import React from 'react';
import PropTypes from 'prop-types';

export default function Department({ department }) {
  return (
    <div className="career_grid">
      <hr />
      <p className="career_pt">{department}</p>
      <hr />
    </div>
  );
}
Department.propTypes = {
  department: PropTypes.string.isRequired,
};
