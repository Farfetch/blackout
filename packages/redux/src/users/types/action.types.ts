import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { LOGOUT_SUCCESS } from '../../authentication/actionTypes';
import type {
  PersonalIdsResponse,
  UserAttributesResponse,
} from '@farfetch/blackout-client/users/types';

export type ActionType =
  | LogoutAction
  | FetchUserAction
  | UpdateUserAction
  | FetchGuestUserAction
  | CreateGuestUserAction
  | FetchUserAttributesAction
  | CreateUserAttributesAction
  | FetchUserAttributeAction
  | SetUserAttributeAction
  | UpdateUserAttributeAction
  | RemoveUserAttributeAction;

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

export interface LogoutAction extends Action {
  type: typeof LOGOUT_SUCCESS;
}

//
// Fetch personal ids
//
export interface FetchPersonalIdsFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_PERSONAL_IDS_FAILURE;
}

export interface FetchPersonalIdsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PERSONAL_IDS_REQUEST;
}

export interface FetchPersonalIdsSuccessAction extends Action {
  payload: PersonalIdsResponse;
  type: typeof actionTypes.FETCH_PERSONAL_IDS_SUCCESS;
}

export type FetchPersonalIdsAction =
  | FetchPersonalIdsRequestAction
  | FetchPersonalIdsFailureAction
  | FetchPersonalIdsSuccessAction;

//
// Create personal ids
//
export interface CreatePersonalIdsFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.CREATE_PERSONAL_IDS_FAILURE;
}

export interface CreatePersonalIdsRequestAction extends Action {
  type: typeof actionTypes.CREATE_PERSONAL_IDS_REQUEST;
}

export interface CreatePersonalIdsSuccessAction extends Action {
  payload: PersonalIdsResponse;
  type: typeof actionTypes.CREATE_PERSONAL_IDS_SUCCESS;
}

export type CreatePersonalIdsAction =
  | CreatePersonalIdsRequestAction
  | CreatePersonalIdsFailureAction
  | CreatePersonalIdsSuccessAction;

//
// Fetch default personal id
//
export interface FetchDefaultPersonalIdFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.FETCH_DEFAULT_PERSONAL_ID_FAILURE;
}

export interface FetchDefaultPersonalIdRequestAction extends Action {
  type: typeof actionTypes.FETCH_DEFAULT_PERSONAL_ID_REQUEST;
}

export interface FetchDefaultPersonalIdSuccessAction extends Action {
  payload: PersonalIdsResponse;
  type: typeof actionTypes.FETCH_DEFAULT_PERSONAL_ID_SUCCESS;
}

export type FetchDefaultPersonalIdAction =
  | FetchDefaultPersonalIdRequestAction
  | FetchDefaultPersonalIdFailureAction
  | FetchDefaultPersonalIdSuccessAction;

//
// Set default personal id
//
export interface SetDefaultPersonalIdFailureAction extends Action {
  payload: { error: Error };
  type: typeof actionTypes.SET_DEFAULT_PERSONAL_ID_FAILURE;
}

export interface SetDefaultPersonalIdRequestAction extends Action {
  type: typeof actionTypes.SET_DEFAULT_PERSONAL_ID_REQUEST;
}

export interface SetDefaultPersonalIdSuccessAction extends Action {
  payload: number;
  type: typeof actionTypes.SET_DEFAULT_PERSONAL_ID_SUCCESS;
}

export type SetDefaultPersonalIdAction =
  | SetDefaultPersonalIdRequestAction
  | SetDefaultPersonalIdFailureAction
  | SetDefaultPersonalIdSuccessAction;

export interface ResetUserStateAction extends Action {
  type: typeof actionTypes.RESET_USER_STATE;
  payload: { fieldsToReset: string[] | undefined };
}

export interface ResetUserEntitiesAction extends Action {
  type: typeof actionTypes.RESET_USER_ENTITIES;
}

export type ResetUserAction = ResetUserStateAction | ResetUserEntitiesAction;
