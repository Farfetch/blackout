import { Component } from '../../';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';

const ComponentsList = ({
  data: { components },
  location,
  viewportBreakpoint,
}) =>
  map(components, (component, key) => (
    <Component
      component={component}
      location={location}
      viewportBreakpoint={viewportBreakpoint}
      key={key}
    />
  ));

ComponentsList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ComponentsList;
