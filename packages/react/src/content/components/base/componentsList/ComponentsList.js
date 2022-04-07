import { Component } from '../../';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';

const ComponentsList = ({ data: { components }, props }) => (
  <div {...props}>
    {map(components, (component, key) => (
      <Component component={component} key={key} />
    ))}
  </div>
);

ComponentsList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ComponentsList;
