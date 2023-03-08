import { map } from 'lodash-es';
import Component from '../../Component.js';
import React, { type ReactElement } from 'react';
import type { ComponentsList as ComponentsListType } from '../../../types/index.js';

const ComponentsList = ({
  data: { components },
  location,
  viewportBreakpoint,
}: ComponentsListType): ReactElement => (
  <>
    {map(components, (component, key) => (
      <Component
        component={component}
        location={location}
        viewportBreakpoint={viewportBreakpoint}
        key={key}
      />
    ))}
  </>
);

export default ComponentsList;
