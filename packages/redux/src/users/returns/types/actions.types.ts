import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { UserReturnsResultNormalized } from '../../../entities';

export interface FetchUserReturnsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_RETURNS_FAILURE;
}

export interface FetchUserReturnsRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_RETURNS_REQUEST;
}

export interface FetchUserReturnsSuccessAction extends Action {
  payload: UserReturnsResultNormalized;
  type: typeof actionTypes.FETCH_USER_RETURNS_SUCCESS;
}

/**
  Actions dispatched when the fetch user returns request is made.
*/
export type FetchUserReturnsAction =
  | FetchUserReturnsRequestAction
  | FetchUserReturnsFailureAction
  | FetchUserReturnsSuccessAction;
