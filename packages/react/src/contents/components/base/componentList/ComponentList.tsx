import { map } from 'lodash-es';
import Component from '../../Component.jsx';
import React, { type ReactElement } from 'react';
import type { ComponentList as ComponentListType } from '../../../types/index.js';

const ComponentList = ({
  data: { components },
  location,
  viewportBreakpoint,
}: ComponentListType): ReactElement => (
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

export default ComponentList;
