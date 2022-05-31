import { Component } from '../components';
import map from 'lodash/map';
import React, { ReactElement } from 'react';
import type { ContentEntry } from '@farfetch/blackout-client';
import type { DefaultMedia } from '../types';

/**
 * Render an Editorial Content. Renders Editorial Content by going through all it's
 * components and rendering them using the Editorial Component.
 *
 * @param data - Data to render.
 * @param location - Router location object.
 * @param viewportBreakpoint - Screen size (Xs | Sm | Md | Lg) .
 * @param media - Media breakpoint sizes (xs: '400px', md...);
 *
 * @returns Rendered components.
 */
const renderContent = (
  { components }: { components: ContentEntry['components'] },
  location: {
    query?: Record<string, string>;
  },
  viewportBreakpoint: string,
  media?: DefaultMedia,
): ReactElement => (
  <>
    {map(components, (component, key) => (
      <Component
        component={component}
        location={location}
        viewportBreakpoint={viewportBreakpoint}
        media={media}
        key={key}
      />
    ))}
  </>
);

export default renderContent;
