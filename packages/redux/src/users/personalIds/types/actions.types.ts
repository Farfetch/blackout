import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  UserPersonalId,
  UserPersonalIdPartial,
} from '@farfetch/blackout-client';

//
// Fetch personal ids
//
export interface FetchUserPersonalIdsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE;
}

export interface FetchUserPersonalIdsRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST;
}

export interface FetchUserPersonalIdsSuccessAction extends Action {
  payload: UserPersonalId[];
  type: typeof actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS;
}

export type FetchUserPersonalIdsAction =
  | FetchUserPersonalIdsRequestAction
  | FetchUserPersonalIdsFailureAction
  | FetchUserPersonalIdsSuccessAction;

//
// Fetch personal id
//
export interface FetchUserPersonalIdFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_PERSONAL_ID_FAILURE;
}

export interface FetchUserPersonalIdRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_PERSONAL_ID_REQUEST;
}

export interface FetchUserPersonalIdSuccessAction extends Action {
  payload: UserPersonalId;
  type: typeof actionTypes.FETCH_USER_PERSONAL_ID_SUCCESS;
}

export type FetchUserPersonalIdAction =
  | FetchUserPersonalIdRequestAction
  | FetchUserPersonalIdFailureAction
  | FetchUserPersonalIdSuccessAction;

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
export interface FetchUserDefaultPersonalIdFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE;
}

export interface FetchUserDefaultPersonalIdRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST;
}

export interface FetchUserDefaultPersonalIdSuccessAction extends Action {
  payload: UserPersonalId;
  type: typeof actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS;
}

export type FetchUserDefaultPersonalIdAction =
  | FetchUserDefaultPersonalIdRequestAction
  | FetchUserDefaultPersonalIdFailureAction
  | FetchUserDefaultPersonalIdSuccessAction;

//
// Set default personal id
//
export interface SetUserDefaultPersonalIdFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE;
}

export interface SetUserDefaultPersonalIdRequestAction extends Action {
  type: typeof actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST;
}

export interface SetUserDefaultPersonalIdSuccessAction extends Action {
  payload: number;
  type: typeof actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS;
}

export type SetUserDefaultPersonalIdAction =
  | SetUserDefaultPersonalIdRequestAction
  | SetUserDefaultPersonalIdFailureAction
  | SetUserDefaultPersonalIdSuccessAction;

/**
 * Reset PersonalIds Action.
 */
export type ResetUserPersonalIdsAction = ResetUserPersonalIdsSuccessAction;

export interface ResetUserPersonalIdsSuccessAction extends Action {
  type: typeof actionTypes.RESET_USER_PERSONAL_IDS;
}
