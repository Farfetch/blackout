import PropTypes from 'prop-types';
import React from 'react';

const Color = ({ data: { hex } }) => (hex ? <div>{hex}</div> : null);

Color.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Color;
