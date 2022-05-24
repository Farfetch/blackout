import PropTypes from 'prop-types';
import React from 'react';

const Boolean = ({ data: { value: bool } }) =>
  bool ? <div>{bool.toString()}</div> : null;

Boolean.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Boolean;
