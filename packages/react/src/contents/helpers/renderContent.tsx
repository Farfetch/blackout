import { Component } from '../components';
import map from 'lodash/map';
import React, { type ReactElement } from 'react';
import type { ComponentProps } from '../types';
import type { ContentEntry } from '@farfetch/blackout-client';

/**
 * Render an Editorial Content. Renders Editorial Content by going through all it's
 * components and rendering them using the Editorial Component.
 *
 * @param data - Data to render.
 * @param componentProps - Props to be passed to the registered components.
 *
 * @returns Rendered components.
 */
const renderContent = (
  { components }: { components: ContentEntry['components'] },
  componentProps?: Omit<ComponentProps, 'component'> & Record<string, unknown>,
): ReactElement => (
  <>
    {map(components, (component, key) => (
      <Component component={component} key={key} {...componentProps} />
    ))}
  </>
);

export default renderContent;
