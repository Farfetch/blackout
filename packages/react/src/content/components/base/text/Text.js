import PropTypes from 'prop-types';
import React from 'react';

const Text = ({ data: { value: text } }) => <div>{text}</div>;

Text.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Text;
