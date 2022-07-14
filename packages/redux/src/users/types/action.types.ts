import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { Address, BlackoutError, User } from '@farfetch/blackout-client';
import type { LOGOUT_SUCCESS } from '../../authentication/actionTypes';
import type { NormalizedSchema } from 'normalizr';
import type { UserAttributesResponse } from '@farfetch/blackout-client/src/users/attributes/types';
import type { UserPersonalIdsResponse } from '@farfetch/blackout-client/src/users/personalIds/types';

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
  payload: { error: BlackoutError };
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
  payload: { error: BlackoutError };
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
  payload: { error: BlackoutError };
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
  payload: { error: BlackoutError };
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
  payload: { error: BlackoutError };
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
  payload: { error: BlackoutError };
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

export interface LogoutAction extends Action {
  type: typeof LOGOUT_SUCCESS;
}

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
  payload: UserPersonalIdsResponse;
  type: typeof actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS;
}

export type FetchPersonalIdsAction =
  | FetchPersonalIdsRequestAction
  | FetchPersonalIdsFailureAction
  | FetchPersonalIdsSuccessAction;

//
// Create personal ids
//
export interface CreatePersonalIdsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_USER_PERSONAL_IDS_FAILURE;
}

export interface CreatePersonalIdsRequestAction extends Action {
  type: typeof actionTypes.CREATE_USER_PERSONAL_IDS_REQUEST;
}

export interface CreatePersonalIdsSuccessAction extends Action {
  payload: UserPersonalIdsResponse;
  type: typeof actionTypes.CREATE_USER_PERSONAL_IDS_SUCCESS;
}

export type CreatePersonalIdsAction =
  | CreatePersonalIdsRequestAction
  | CreatePersonalIdsFailureAction
  | CreatePersonalIdsSuccessAction;

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
  payload: UserPersonalIdsResponse;
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

/**
 * Create Address Action.
 */
export type CreateUserAddressAction =
  | CreateUserAddressFailureAction
  | CreateUserAddressRequestAction
  | CreateUserAddressSuccessAction;

type CreateAddressPayload = NormalizedSchema<
  {
    addresses: Record<Address['id'], Address>;
  },
  Address['id']
>;
export interface CreateUserAddressFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_USER_ADDRESS_FAILURE;
}

export interface CreateUserAddressRequestAction extends Action {
  type: typeof actionTypes.CREATE_USER_ADDRESS_REQUEST;
}

export interface CreateUserAddressSuccessAction extends Action {
  payload: CreateAddressPayload;
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.CREATE_USER_ADDRESS_SUCCESS;
}

/**
 * Fetch Address Action.
 */
export type FetchUserAddressAction =
  | FetchUserAddressFailureAction
  | FetchUserAddressRequestAction
  | FetchUserAddressSuccessAction;

type FetchAddressPayload = NormalizedSchema<
  {
    addresses: Record<Address['id'], Address>;
  },
  Array<Address['id']>
>;
export interface FetchUserAddressFailureAction extends Action {
  meta: { addressId: Address['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_ADDRESS_FAILURE;
}

export interface FetchUserAddressRequestAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.FETCH_USER_ADDRESS_REQUEST;
}

export interface FetchUserAddressSuccessAction extends Action {
  meta: { addressId: Address['id'] };
  payload: FetchAddressPayload;
  type: typeof actionTypes.FETCH_USER_ADDRESS_SUCCESS;
}

/**
 * Fetch Addresses Action.
 */
export type FetchUserAddressesAction =
  | FetchUserAddressesFailureAction
  | FetchUserAddressesRequestAction
  | FetchUserAddressesSuccessAction;

type FetchUserAddressesPayload = NormalizedSchema<
  {
    addresses: Record<Address['id'], Address>;
  },
  Array<Address['id']>
>;
export interface FetchUserAddressesFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_ADDRESSES_FAILURE;
}

export interface FetchUserAddressesRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_ADDRESSES_REQUEST;
}

export interface FetchUserAddressesSuccessAction extends Action {
  payload: FetchUserAddressesPayload;
  type: typeof actionTypes.FETCH_USER_ADDRESSES_SUCCESS;
}

/**
 * Fetch Default Contact Address Action.
 */
export type FetchUserDefaultContactAddressAction =
  | FetchUserDefaultContactAddressFailureAction
  | FetchUserDefaultContactAddressRequestAction
  | FetchUserDefaultContactAddressSuccessAction;

export interface FetchUserDefaultContactAddressFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_FAILURE;
}

export interface FetchUserDefaultContactAddressRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_REQUEST;
}

export interface FetchUserDefaultContactAddressSuccessAction extends Action {
  payload: Address;
  type: typeof actionTypes.FETCH_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS;
}

/**
 * Remove address Action.
 */
export type RemoveUserAddressAction =
  | RemoveUserAddressFailureAction
  | RemoveUserAddressRequestAction
  | RemoveUserAddressSuccessAction;

export interface RemoveUserAddressFailureAction extends Action {
  meta: { addressId: Address['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_USER_ADDRESS_FAILURE;
}

export interface RemoveUserAddressRequestAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.REMOVE_USER_ADDRESS_REQUEST;
}

export interface RemoveUserAddressSuccessAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.REMOVE_USER_ADDRESS_SUCCESS;
}

/**
 * Remove default contact address Action.
 */
export type RemoveUserDefaultContactAddressAction =
  | RemoveUserDefaultContactAddressFailureAction
  | RemoveUserDefaultContactAddressRequestAction
  | RemoveUserDefaultContactAddressSuccessAction;

export interface RemoveUserDefaultContactAddressFailureAction extends Action {
  meta: { userId: User['id']; addressId: Address['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE;
}

export interface RemoveUserDefaultContactAddressRequestAction extends Action {
  meta: { userId: User['id']; addressId: Address['id'] };
  type: typeof actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST;
}

export interface RemoveUserDefaultContactAddressSuccessAction extends Action {
  meta: { userId: User['id']; addressId: Address['id'] };
  type: typeof actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS;
}

/**
 * Set default billing address Action.
 */
export type SetUserDefaultBillingAddressAction =
  | SetUserDefaultBillingAddressFailureAction
  | SetUserDefaultBillingAddressRequestAction
  | SetUserDefaultBillingAddressSuccessAction;

export interface SetUserDefaultBillingAddressFailureAction extends Action {
  meta: { addressId: Address['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE;
}

export interface SetUserDefaultBillingAddressRequestAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST;
}

export interface SetUserDefaultBillingAddressSuccessAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_SUCCESS;
}

/**
 * Set default contact address Action.
 */
export type SetUserDefaultContactAddressAction =
  | SetUserDefaultContactAddressFailureAction
  | SetUserDefaultContactAddressRequestAction
  | SetUserDefaultContactAddressSuccessAction;

export interface SetUserDefaultContactAddressFailureAction extends Action {
  meta: { addressId: Address['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE;
}

export interface SetUserDefaultContactAddressRequestAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST;
}

export interface SetUserDefaultContactAddressSuccessAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_SUCCESS;
}

/**
 * Set default shipping address Action.
 */
export type SetUserDefaultShippingAddressAction =
  | SetUserDefaultShippingAddressFailureAction
  | SetUserDefaultShippingAddressRequestAction
  | SetUserDefaultShippingAddressSuccessAction;

export interface SetUserDefaultShippingAddressFailureAction extends Action {
  meta: { addressId: Address['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE;
}

export interface SetUserDefaultShippingAddressRequestAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST;
}

export interface SetUserDefaultShippingAddressSuccessAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_SUCCESS;
}

/**
 * Update Address Action.
 */
export type UpdateUserAddressAction =
  | UpdateUserAddressFailureAction
  | UpdateUserAddressRequestAction
  | UpdateUserAddressSuccessAction;

type UpdateUserAddressPayload = NormalizedSchema<
  {
    addresses: Record<Address['id'], Address>;
  },
  Address['id']
>;
export interface UpdateUserAddressFailureAction extends Action {
  meta: { addressId: Address['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_USER_ADDRESS_FAILURE;
}

export interface UpdateUserAddressRequestAction extends Action {
  meta: { addressId: Address['id'] };
  type: typeof actionTypes.UPDATE_USER_ADDRESS_REQUEST;
}

export interface UpdateUserAddressSuccessAction extends Action {
  meta: { addressId: Address['id'] };
  payload: UpdateUserAddressPayload;
  type: typeof actionTypes.UPDATE_USER_ADDRESS_SUCCESS;
}

/**
 * Reset Addresses Action.
 */
export type ResetUserAddressesAction = ResetUserAddressesSuccessAction;

export interface ResetUserAddressesSuccessAction extends Action {
  type: typeof actionTypes.RESET_USER_ADDRESSES;
}

export interface ResetUserStateAction extends Action {
  type: typeof actionTypes.RESET_USER_STATE;
}

export interface ResetUserEntitiesAction extends Action {
  type: typeof actionTypes.RESET_USER_ENTITIES;
}

export type ResetUserAction = ResetUserStateAction | ResetUserEntitiesAction;
