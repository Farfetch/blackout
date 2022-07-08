import React from 'react';
import type { CallToActionComponent } from '../../../types';

const CallToAction = ({
  children,
  data: { text, url, target },
  'data-test': dataTest,
  style,
}: CallToActionComponent): JSX.Element => {
  if (!url && !text) {
    return <span>{children || null}</span>;
  }

  const anchorTarget = target === '' ? undefined : target;

  return (
    <a href={url} target={anchorTarget} style={style} data-test={dataTest}>
      {children || text}
    </a>
  );
};

export default CallToAction;
