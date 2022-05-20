import { colorStyle } from './styles';
import PropTypes from 'prop-types';
import React from 'react';

const Color = ({ data: { hex, displayOptions } }) => (
  <div>
    {displayOptions?.displayName && (
      <span>{`${displayOptions?.displayName} (${hex})`}</span>
    )}
    <div style={colorStyle(hex)} />
  </div>
);

Color.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Color;
