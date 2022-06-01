import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { Designers } from '@farfetch/blackout-client/designers/types';
import type { Error } from '@farfetch/blackout-client/types';

export interface FetchDesignersRequestAction extends Action {
  type: typeof actionTypes.FETCH_DESIGNERS_REQUEST;
  meta: { hash: string };
}
export interface FetchDesignersSuccessAction extends Action {
  type: typeof actionTypes.FETCH_DESIGNERS_SUCCESS;
  payload: { result: { designers: Designers } };
  meta: { hash: string };
}
export interface FetchDesignersFailureAction extends Action {
  type: typeof actionTypes.FETCH_DESIGNERS_FAILURE;
  payload: { error: Error };
  meta: { hash: string };
}

export interface SetDesignersResultHashAction extends Action {
  type: typeof actionTypes.SET_DESIGNERS_RESULT_HASH;
  meta: { hash: string };
}

/**
 * Actions dispatched when the fetch designers request is made.
 */
export type FetchDesignersAction =
  | FetchDesignersRequestAction
  | FetchDesignersSuccessAction
  | FetchDesignersFailureAction;
