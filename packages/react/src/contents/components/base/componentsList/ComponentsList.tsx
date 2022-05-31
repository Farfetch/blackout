import Component from '../../Component';
import map from 'lodash/map';
import React, { ReactElement } from 'react';
import type { ComponentsList as ComponentsListType } from '../../../types';

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
