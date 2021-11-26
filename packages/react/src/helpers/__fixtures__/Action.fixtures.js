import React from 'react';
import useAction from '../useAction';

export const Action = ({ mockAction }) => {
  const mockUseAction = useAction(mockAction);

  return (
    <button data-test="button" onClick={() => mockUseAction()}>
      use action request
    </button>
  );
};
