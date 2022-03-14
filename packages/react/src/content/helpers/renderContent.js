import { Component } from '../components';
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
 * @param {'active'|'inactive'} isContentTool - Site key to identify if Content Tool is active or not.
 *
 * @returns {object} Rendered components.
 */
const renderContent = (
  { components },
  isContentTool = IS_CONTENT_TOOL.inactive,
) => {
  if (components.length === 0) {
    return null;
  }

  return components.map((component, key) => {
    if (isContentTool === IS_CONTENT_TOOL.active && component.type === 'list') {
      return renderContent(component, IS_CONTENT_TOOL.active);
    }

    return <Component component={component} key={key} />;
  });
};

export default renderContent;
