import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError, Config } from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { UserEntity } from '../../../entities';

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

export interface LogoutSuccessAction extends Action {
  type: typeof actionTypes.LOGOUT_SUCCESS;
}
