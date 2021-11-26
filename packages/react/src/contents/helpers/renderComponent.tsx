import React, { ComponentProps, ReactElement } from 'react';
import { Component } from '../components';
import type { ContentEntries } from '@farfetch/blackout-client/contents/types';

/**
 * Render an Editorial component.
 * Renders an editorial component registred in components.
 *
 * @param {string} type - Component type.
 * @param {ContentEntries} data - Component data.
 * @param {object} props - Component props.
 *
 * @returns {ReactElement} - A registered component.
 */

const renderComponent = (type: string, data: ContentEntries, props: ComponentProps<any>): ReactElement => (
  <Component component={{ ...data, type }} {...props} />
);

export default renderComponent;