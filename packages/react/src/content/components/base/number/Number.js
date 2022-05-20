import PropTypes from 'prop-types';
import React from 'react';

const Number = ({ data: { value: number } }) =>
  isNaN(number) ? null : <div>{number}</div>;

Number.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Number;
