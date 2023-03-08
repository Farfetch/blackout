import { isBoolean } from 'lodash-es';
import React from 'react';
import type { BoolComponent } from '../../../types/index.js';

const Boolean = ({
  data: { value: bool },
}: BoolComponent): JSX.Element | null =>
  isBoolean(bool) ? <div>{bool.toString()}</div> : null;

export default Boolean;
