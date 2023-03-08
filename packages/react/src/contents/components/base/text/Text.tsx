import React from 'react';
import type { TextComponent } from '../../../types/index.js';

const Text = ({ data: { value: text } }: TextComponent): JSX.Element => (
  <div>{text}</div>
);

export default Text;
