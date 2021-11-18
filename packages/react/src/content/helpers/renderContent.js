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
 * @param {Array}  data.components - Collection of components to render.
 *
 * @returns {object} Rendered components.
 */
export default ({ components }) =>
  map(components, (component, key) => (
    <Component component={component} key={key} />
  ));
