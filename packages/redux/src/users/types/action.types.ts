import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { UserAttributesResponse } from '@farfetch/blackout-client/users/types';

//
// Fetch user
//
export interface FetchUserFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_USER_FAILURE;
}

export interface FetchUserRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_REQUEST;
}

export interface FetchUserSuccessAction extends Action {
  payload: any;
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
  payload: { error: Error };
  type: typeof actionTypes.UPDATE_USER_FAILURE;
}

export interface UpdateUserRequestAction extends Action {
  type: typeof actionTypes.UPDATE_USER_REQUEST;
}

export interface UpdateUserSuccessAction extends Action {
  payload: any;
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
  payload: { error: Error };
  type: typeof actionTypes.FETCH_GUEST_USER_FAILURE;
}

export interface FetchGuestUserRequestAction extends Action {
  type: typeof actionTypes.FETCH_GUEST_USER_REQUEST;
}

export interface FetchGuestUserSuccessAction extends Action {
  payload: any;
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
  payload: { error: Error };
  type: typeof actionTypes.CREATE_GUEST_USER_FAILURE;
}

export interface CreateGuestUserRequestAction extends Action {
  type: typeof actionTypes.CREATE_GUEST_USER_REQUEST;
}

export interface CreateGuestUserSuccessAction extends Action {
  payload: any;
  type: typeof actionTypes.CREATE_GUEST_USER_SUCCESS;
}

export type CreateGuestUserAction =
  | CreateGuestUserRequestAction
  | CreateGuestUserFailureAction
  | CreateGuestUserSuccessAction;

//
// Fetch all user attributes
//
export interface FetchUserAttributesFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_USER_ATTRIBUTES_FAILURE;
}

export interface FetchUserAttributesRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_ATTRIBUTES_REQUEST;
}

export interface FetchUserAttributesSuccessAction extends Action {
  payload: UserAttributesResponse[];
  type: typeof actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS;
}

export type FetchUserAttributesAction =
  | FetchUserAttributesRequestAction
  | FetchUserAttributesFailureAction
  | FetchUserAttributesSuccessAction;

//
// Create user attributes
//
export interface CreateUserAttributesFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.CREATE_USER_ATTRIBUTES_FAILURE;
}

export interface CreateUserAttributesRequestAction extends Action {
  type: typeof actionTypes.CREATE_USER_ATTRIBUTES_REQUEST;
}

export interface CreateUserAttributesSuccessAction extends Action {
  payload: UserAttributesResponse;
  type: typeof actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS;
}

export type CreateUserAttributesAction =
  | CreateUserAttributesRequestAction
  | CreateUserAttributesFailureAction
  | CreateUserAttributesSuccessAction;

//
// Fetch a specific user attribute
//
export interface FetchUserAttributeFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_USER_ATTRIBUTE_FAILURE;
}

export interface FetchUserAttributeRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_ATTRIBUTE_REQUEST;
}

export interface FetchUserAttributeSuccessAction extends Action {
  payload: UserAttributesResponse;
  type: typeof actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS;
}

export type FetchUserAttributeAction =
  | FetchUserAttributeRequestAction
  | FetchUserAttributeFailureAction
  | FetchUserAttributeSuccessAction;

//
// Set user attribute
//
export interface SetUserAttributeFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.SET_USER_ATTRIBUTE_FAILURE;
}

export interface SetUserAttributeRequestAction extends Action {
  type: typeof actionTypes.SET_USER_ATTRIBUTE_REQUEST;
}

export interface SetUserAttributeSuccessAction extends Action {
  payload: number;
  type: typeof actionTypes.SET_USER_ATTRIBUTE_SUCCESS;
}

export type SetUserAttributeAction =
  | SetUserAttributeRequestAction
  | SetUserAttributeFailureAction
  | SetUserAttributeSuccessAction;

//
// Update user attribute
//
export interface UpdateUserAttributeFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE;
}

export interface UpdateUserAttributeRequestAction extends Action {
  type: typeof actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST;
}

export interface UpdateUserAttributeSuccessAction extends Action {
  payload: number;
  type: typeof actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS;
}

export type UpdateUserAttributeAction =
  | UpdateUserAttributeRequestAction
  | UpdateUserAttributeFailureAction
  | UpdateUserAttributeSuccessAction;

//
// Remove user attribute
//
export interface RemoveUserAttributeFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE;
}

export interface RemoveUserAttributeRequestAction extends Action {
  type: typeof actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST;
}

export interface RemoveUserAttributeSuccessAction extends Action {
  payload: number;
  type: typeof actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS;
}

export type RemoveUserAttributeAction =
  | RemoveUserAttributeRequestAction
  | RemoveUserAttributeFailureAction
  | RemoveUserAttributeSuccessAction;
