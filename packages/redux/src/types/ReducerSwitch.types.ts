import type { Action, AnyAction } from 'redux';

// Borrowed from https://github.com/reduxjs/redux/issues/3580#issuecomment-642423427

export interface ReducerSwitch<S, A extends Action = AnyAction> {
  (state: S, action: A | AnyAction): S;
}
