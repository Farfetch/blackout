import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  UserPersonalId,
  UserPersonalIdPartial,
} from '@farfetch/blackout-client';

//
// Fetch personal ids
//
export interface FetchPersonalIdsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE;
}

export interface FetchPersonalIdsRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST;
}

export interface FetchPersonalIdsSuccessAction extends Action {
  payload: UserPersonalId[];
  type: typeof actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS;
}

export type FetchPersonalIdsAction =
  | FetchPersonalIdsRequestAction
  | FetchPersonalIdsFailureAction
  | FetchPersonalIdsSuccessAction;

//
// Create personal id
//
export interface CreateUserPersonalIdFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_USER_PERSONAL_ID_FAILURE;
}

export interface CreateUserPersonalIdRequestAction extends Action {
  type: typeof actionTypes.CREATE_USER_PERSONAL_ID_REQUEST;
}

export interface CreateUserPersonalIdSuccessAction extends Action {
  payload: UserPersonalIdPartial;
  type: typeof actionTypes.CREATE_USER_PERSONAL_ID_SUCCESS;
}

export type CreateUserPersonalIdAction =
  | CreateUserPersonalIdRequestAction
  | CreateUserPersonalIdFailureAction
  | CreateUserPersonalIdSuccessAction;

//
// Fetch default personal id
//
export interface FetchDefaultPersonalIdFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE;
}

export interface FetchDefaultPersonalIdRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST;
}

export interface FetchDefaultPersonalIdSuccessAction extends Action {
  payload: UserPersonalId;
  type: typeof actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS;
}

export type FetchDefaultPersonalIdAction =
  | FetchDefaultPersonalIdRequestAction
  | FetchDefaultPersonalIdFailureAction
  | FetchDefaultPersonalIdSuccessAction;

//
// Set default personal id
//
export interface SetDefaultPersonalIdFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE;
}

export interface SetDefaultPersonalIdRequestAction extends Action {
  type: typeof actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST;
}

export interface SetDefaultPersonalIdSuccessAction extends Action {
  payload: number;
  type: typeof actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS;
}

export type SetDefaultPersonalIdAction =
  | SetDefaultPersonalIdRequestAction
  | SetDefaultPersonalIdFailureAction
  | SetDefaultPersonalIdSuccessAction;
