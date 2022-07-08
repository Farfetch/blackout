import { TextComponent } from '../../../types';
import React from 'react';

const Text = ({ data: { value: text } }: TextComponent): JSX.Element => (
  <div>{text}</div>
);

export default Text;
