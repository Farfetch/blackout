import React from 'react';
import type { TextComponent } from '../../../types';

const Text = ({ data: { value: text } }: TextComponent): JSX.Element => (
  <div>{text}</div>
);

export default Text;
