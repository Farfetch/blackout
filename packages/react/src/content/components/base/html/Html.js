import PropTypes from 'prop-types';
import React from 'react';

const Html = ({ data: { value } }) => (
  <div dangerouslySetInnerHTML={{ __html: value }} />
);

Html.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Html;
