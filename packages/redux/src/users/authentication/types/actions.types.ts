import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Config,
  ExternalLogin,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { UserEntity } from '../../../entities/index.js';

//
// Fetch user
//
export interface FetchUserFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_FAILURE;
}

export interface FetchUserRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_REQUEST;
}

export interface FetchUserSuccessAction extends Action {
  payload: NormalizedSchema<{ user: UserEntity }, UserEntity['id']>;
  meta: Config | undefined;
  type: typeof actionTypes.FETCH_USER_SUCCESS;
}

export type FetchUserAction =
  | FetchUserRequestAction
  | FetchUserFailureAction
  | FetchUserSuccessAction;

//
// Update user
//
export interface UpdateUserFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_USER_FAILURE;
}

export interface UpdateUserRequestAction extends Action {
  type: typeof actionTypes.UPDATE_USER_REQUEST;
}

export interface UpdateUserSuccessAction extends Action {
  payload: NormalizedSchema<{ user: UserEntity }, UserEntity['id']>;
  type: typeof actionTypes.UPDATE_USER_SUCCESS;
}

export type UpdateUserAction =
  | UpdateUserRequestAction
  | UpdateUserFailureAction
  | UpdateUserSuccessAction;

//
// Fetch guest user
//
export interface FetchGuestUserFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_GUEST_USER_FAILURE;
}

export interface FetchGuestUserRequestAction extends Action {
  type: typeof actionTypes.FETCH_GUEST_USER_REQUEST;
}

export interface FetchGuestUserSuccessAction extends Action {
  payload: NormalizedSchema<{ user: UserEntity }, UserEntity['id']>;
  type: typeof actionTypes.FETCH_GUEST_USER_SUCCESS;
}

export type FetchGuestUserAction =
  | FetchGuestUserRequestAction
  | FetchGuestUserFailureAction
  | FetchGuestUserSuccessAction;

//
// Create guest user
//
export interface CreateGuestUserFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_GUEST_USER_FAILURE;
}

export interface CreateGuestUserRequestAction extends Action {
  type: typeof actionTypes.CREATE_GUEST_USER_REQUEST;
}

export interface CreateGuestUserSuccessAction extends Action {
  payload: NormalizedSchema<{ user: UserEntity }, UserEntity['id']>;
  type: typeof actionTypes.CREATE_GUEST_USER_SUCCESS;
}

export type CreateGuestUserAction =
  | CreateGuestUserRequestAction
  | CreateGuestUserFailureAction
  | CreateGuestUserSuccessAction;

//
// Fetch user external logins
//
export interface FetchUserExternalLoginsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_EXTERNAL_LOGINS_FAILURE;
}

export interface FetchUserExternalLoginsRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_EXTERNAL_LOGINS_REQUEST;
}

export interface FetchUserExternalLoginsSuccessAction extends Action {
  payload: ExternalLogin[];
  type: typeof actionTypes.FETCH_USER_EXTERNAL_LOGINS_SUCCESS;
}

export type FetchUserExternalLoginsAction =
  | FetchUserExternalLoginsRequestAction
  | FetchUserExternalLoginsFailureAction
  | FetchUserExternalLoginsSuccessAction;

//
// Remove user external login
//
export interface RemoveUserExternalLoginFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_USER_EXTERNAL_LOGIN_FAILURE;
}

export interface RemoveUserExternalLoginRequestAction extends Action {
  type: typeof actionTypes.REMOVE_USER_EXTERNAL_LOGIN_REQUEST;
}

export interface RemoveUserExternalLoginSuccessAction extends Action {
  meta: { externalLoginId: ExternalLogin['id'] };
  type: typeof actionTypes.REMOVE_USER_EXTERNAL_LOGIN_SUCCESS;
}

export type RemoveUserExternalLoginAction =
  | RemoveUserExternalLoginRequestAction
  | RemoveUserExternalLoginFailureAction
  | RemoveUserExternalLoginSuccessAction;

export interface LogoutSuccessAction extends Action {
  type: typeof actionTypes.LOGOUT_SUCCESS;
}
