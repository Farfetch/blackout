import { Component } from '../components';
import map from 'lodash/map';
import React, { ReactElement } from 'react';
import type { ComponentType, ContentEntry } from '@farfetch/blackout-client';

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
  isFromContentTool = false,
): ReactElement =>
  map(components, (component: ComponentType, key: number) => {
    if (isFromContentTool && component.type === 'list') {
      return renderContent(component as { components: ComponentType[] }, true);
    }

    return <Component component={component} key={key} />;
  }) as unknown as ReactElement;

export default renderContent;
