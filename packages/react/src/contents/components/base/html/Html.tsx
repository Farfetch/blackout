import DOMPurify from 'dompurify';
import React, { type ReactElement } from 'react';
import type { HTMLComponent } from '../../../types/index.js';

const Html = ({ data: { value } }: HTMLComponent): ReactElement => (
  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
);

export default Html;
