import { Component } from '../components';
import map from 'lodash/map';
import React, { ReactElement } from 'react';
import type {
  ComponentType,
  ContentEntries,
} from '@farfetch/blackout-client/contents/types';

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
 * @returns {ReactElement} Rendered components.
 */
const renderContent = (
  { components }: { components: ContentEntries['components'] },
  isContentTool = IS_CONTENT_TOOL.inactive,
): ReactElement =>
  map(components, (component: ComponentType, key: number) => {
    if (isContentTool === IS_CONTENT_TOOL.active && component.type === 'list') {
      return renderContent(
        component as { components: ComponentType[] },
        IS_CONTENT_TOOL.active,
      );
    }

    return <Component component={component} key={key} />;
  }) as unknown as ReactElement;

export default renderContent;
