import React from 'react';
import type { ColorComponent } from '../../../types';

const Color = ({ data: { hex } }: ColorComponent): JSX.Element | null => (hex ? <div>{hex}</div> : null);

export default Color;
