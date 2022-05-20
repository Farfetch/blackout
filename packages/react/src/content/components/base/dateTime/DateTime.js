import PropTypes from 'prop-types';
import React from 'react';

const DateTime = ({ data: { utcDate: date } }) => {
  if (!date) {
    return null;
  }

  const formatDate = new Date(date).toDateString();

  return <div>{formatDate}</div>;
};

DateTime.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DateTime;
