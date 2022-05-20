import { Component } from '../components';
import map from 'lodash/map';
import React from 'react';

const IS_CONTENT_TOOL = {
  active: 'active',
  inactive: 'inactive',
};

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
 * @param {'active'|'inactive'} [isContentTool] - Site key to identify if Content Tool is active or not.
 *
 * @returns {object} Rendered components.
 */
const renderContent = (
  { components },
  location,
  viewportBreakpoint,
  isContentTool = IS_CONTENT_TOOL.inactive,
) =>
  map(components, (component, key) => {
    if (isContentTool === IS_CONTENT_TOOL.active && component.type === 'list') {
      return renderContent(
        component,
        location,
        viewportBreakpoint,
        IS_CONTENT_TOOL.active,
      );
    }

    return (
      <Component
        component={component}
        location={location}
        viewportBreakpoint={viewportBreakpoint || 'lg'}
        key={key}
      />
    );
  });

export default renderContent;
