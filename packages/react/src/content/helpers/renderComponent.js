import { Component } from '../components';
import React from 'react';

/**
 * Render an Editorial component.
 * Renders an editorial component registred in components.
 *
 * @function
 * @memberof module:content/helpers
 *
 * @param {string} type - Component type.
 * @param {object} data - Component data.
 * @param {object} props - Component props.
 *
 * @returns {Node} - A registered component.
 */
export default (type, data, props) => (
  <Component component={{ ...data, type }} {...props} />
);
