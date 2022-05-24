import PropTypes from 'prop-types';
import React from 'react';

const LongText = ({ data: { value: longtext } }) => <p>{longtext}</p>;

LongText.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LongText;
