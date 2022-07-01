import { Component } from '../components';
import React, { ComponentProps, ReactElement } from 'react';
import type { ComponentType } from '@farfetch/blackout-client';

/**
 * Render an Editorial component. Renders an editorial component registered in
 * components.
 *
 * @param type  - Component type.
 * @param data  - Component data.
 * @param props - Component props.
 *
 * @returns - A registered component.
 */

const renderComponent = (
  type: string,
  data: ComponentType,
  props: ComponentProps<any>,
): ReactElement => <Component component={{ ...data, type }} {...props} />;

export default renderComponent;
