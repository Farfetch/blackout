import React from 'react';
import type { ColorComponent } from '../../../types/index.js';

const Color = ({ data: { hex } }: ColorComponent): JSX.Element | null =>
  hex ? <div>{hex}</div> : null;

export default Color;
