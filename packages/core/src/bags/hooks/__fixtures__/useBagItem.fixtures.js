import React from 'react';

export const HookWrapper = props => {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook} />;
};
