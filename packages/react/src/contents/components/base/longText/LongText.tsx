import React, { type ReactElement } from 'react';
import type { TextComponent as LongTextComponent } from '../../../types/index.js';

const LongText = ({
  data: { value: longtext },
}: LongTextComponent): ReactElement => <p>{longtext}</p>;

export default LongText;
