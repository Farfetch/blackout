import React, { ReactElement } from 'react';
import { NumberComponent } from '../../../types';

const Number = ({ data: { value: number } }: NumberComponent): ReactElement =>
  isNaN(number) ? null : <div>{number}</div>;

export default Number;
