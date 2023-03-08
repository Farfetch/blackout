import React, { type ReactElement } from 'react';
import type { NumberComponent } from '../../../types/index.js';

const Number = ({
  data: { value: number },
}: NumberComponent): ReactElement | null =>
  isNaN(number) ? null : <div>{number}</div>;

export default Number;
