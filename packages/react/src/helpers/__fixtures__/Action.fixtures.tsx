import React from 'react';
import useAction from '../useAction.js';
import type { AnyAction } from 'redux';

type ActionFixture = (props: { mockAction: () => AnyAction }) => JSX.Element;

export const Action: ActionFixture = ({ mockAction }) => {
  const mockUseAction = useAction(mockAction);

  return (
    <button data-test="button" onClick={() => mockUseAction()}>
      use action request
    </button>
  );
};
