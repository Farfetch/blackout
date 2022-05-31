import isBoolean from 'lodash/isBoolean';
import React from 'react';
import type { BoolComponent } from '../../../types';

const Boolean = ({
  data: { value: bool },
}: BoolComponent): JSX.Element | null =>
  isBoolean(bool) ? <div>{bool.toString()}</div> : null;

export default Boolean;
