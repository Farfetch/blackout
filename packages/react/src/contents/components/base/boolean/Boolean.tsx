import React, { ReactElement } from 'react';
import isBoolean from 'lodash/isBoolean';
import type { BoolComponent} from '../../../types';

const Boolean = ({ data: { value: bool } }: BoolComponent): JSX.Element | null =>
  isBoolean(bool) ? <div>{bool.toString()}</div> : null;

export default Boolean;
