import { Component } from '../components';
import map from 'lodash/map';
import React, { ReactElement } from 'react';
import type { ComponentType, ContentEntry } from '@farfetch/blackout-client';

const IS_CONTENT_TOOL = {
  active: 'active',
  inactive: 'inactive',
};

/**
 * Render an Editorial Content. Renders Editorial Content by going through all it's
 * components and rendering them using the Editorial Component.
 *
 * @param data - Data to render.
 *
 * @returns Rendered components.
 */
const renderContent = (
  { components }: { components: ContentEntry['components'] },
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
