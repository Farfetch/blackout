import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError, UserAttribute } from '@farfetch/blackout-client';

//
// Fetch all user attributes
//
export interface FetchUserAttributesFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_ATTRIBUTES_FAILURE;
}

export interface FetchUserAttributesRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_ATTRIBUTES_REQUEST;
}

export interface FetchUserAttributesSuccessAction extends Action {
  payload: UserAttribute[];
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
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_USER_ATTRIBUTES_FAILURE;
}

export interface CreateUserAttributesRequestAction extends Action {
  type: typeof actionTypes.CREATE_USER_ATTRIBUTES_REQUEST;
}

export interface CreateUserAttributesSuccessAction extends Action {
  payload: UserAttribute;
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
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_ATTRIBUTE_FAILURE;
}

export interface FetchUserAttributeRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_ATTRIBUTE_REQUEST;
}

export interface FetchUserAttributeSuccessAction extends Action {
  payload: UserAttribute;
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
  payload: { error: BlackoutError };
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
  payload: { error: BlackoutError };
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
  payload: { error: BlackoutError };
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
