/* eslint-disable no-console */
import baseComponents from './base';
import PropTypes from 'prop-types';
import React from 'react';

// Define default components as base components
export const components = baseComponents;

/**
 * Registers a react component to be rendered for a given CMS component type.
 *
 * @function
 *
 * @param  {string} type - Component type. Should be the exact component type in the CMS.
 * @param  {Node} component - Component to be registered.
 *
 * @returns {Node} Ready component.
 */
export const registerComponent = (type, component) => {
  if (components[type]) {
    console.warn(
      `[react-content] Component with "type=${type}" already registered on components. Will override with new component.`,
    );
  }

  components[type] = component;

  return component;
};

/**
 * @typedef ComponentProps
 * @property {object} component - Object containing the data needed to render.
 * @property {Node} children - A React Node.
 */

/**
 * Editorial component.
 * Renders a component by looking it up in the registered types.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {ComponentProps} props - All props of component.
 *
 * @returns {Node} - A registered component.
 *
 * @example
 * import Component from '@farfetch/blackout-react/content/component';
 * @example
 * <Component
 *   component={{ type, ...data }}
 *   {...props} />
 */
const Component = ({ component, children, ...props }) => {
  const { type, customType } = component;
  const typeToRender = customType || type;
  // Lookup a component based on the type
  const ComponentToRender = components[typeToRender];

  if (!ComponentToRender) {
    console.warn(
      `[react-content] No component with "type=${typeToRender}" is defined.`,
    );

    return null;
  }

  return (
    <ComponentToRender data={component} {...props}>
      {children}
    </ComponentToRender>
  );
};

Component.propTypes = {
  component: PropTypes.object.isRequired,
  children: PropTypes.any,
};

export default Component;
