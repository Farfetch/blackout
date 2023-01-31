import { Component } from '../components';
import map from 'lodash/map';
import React from 'react';

/**
 * Render an Editorial Content.
 * Renders Editorial Content by going through all it's components and rendering them using the Editorial Component.
 *
 * @function
 * @memberof module:content/helpers
 *
 * @param {object} data - Data to render.
 * @param {object[]} data.components - Collection of components to render.
 * @param {object} [location] - Router location object.
 * @param {string} [viewportBreakpoint] - Screen size (xs | sm | md | lg) .
 *
 * @returns {object} Rendered components.
 */
const renderContent = ({ components }, location, viewportBreakpoint) =>
  map(components, (component, key) => (
    <Component
      component={component}
      location={location}
      viewportBreakpoint={viewportBreakpoint || 'lg'}
      key={key}
    />
  ));

export default renderContent;
