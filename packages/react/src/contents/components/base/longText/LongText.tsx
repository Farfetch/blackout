import React, { ReactElement } from 'react';
import type { TextComponent as LongTextComponent } from '../../../types';

const LongText = ({ data: { value: longtext } }: LongTextComponent): ReactElement => <p>{longtext}</p>;

export default LongText;
