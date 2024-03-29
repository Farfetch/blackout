import React, { type ReactElement } from 'react';
import type { DateTimeComponent } from '../../../types/index.js';

const DateTime = ({
  data: { utcDate: date },
}: DateTimeComponent): ReactElement | null => {
  if (!date) {
    return null;
  }

  const formatDate = new Date(date).toDateString();

  return <div>{formatDate}</div>;
};

export default DateTime;
