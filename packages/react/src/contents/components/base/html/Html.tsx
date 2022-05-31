import DOMPurify from 'dompurify';
import React, { ReactElement } from 'react';
import type { HTMLComponent } from '../../../types';

const Html = ({ data: { value } }: HTMLComponent): ReactElement => (
  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
);

export default Html;
