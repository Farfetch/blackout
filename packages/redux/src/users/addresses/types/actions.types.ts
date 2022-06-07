import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  User,
  UserAddress,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';

/**
 * Create User Address Action.
 */
export type CreateUserAddressAction =
  | CreateUserAddressFailureAction
  | CreateUserAddressRequestAction
  | CreateUserAddressSuccessAction;

type CreateUserAddressPayload = NormalizedSchema<
  {
    addresses: Record<UserAddress['id'], UserAddress>;
  },
  UserAddress['id']
>;
export interface CreateUserAddressFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_USER_ADDRESS_FAILURE;
}

export interface CreateUserAddressRequestAction extends Action {
  type: typeof actionTypes.CREATE_USER_ADDRESS_REQUEST;
}

export interface CreateUserAddressSuccessAction extends Action {
  payload: CreateUserAddressPayload;
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.CREATE_USER_ADDRESS_SUCCESS;
}

/**
 * Fetch User Address Action.
 */
export type FetchUserAddressAction =
  | FetchUserAddressFailureAction
  | FetchUserAddressRequestAction
  | FetchUserAddressSuccessAction;

type FetchUserAddressPayload = NormalizedSchema<
  {
    addresses: Record<UserAddress['id'], UserAddress>;
  },
  UserAddress['id']
>;
export interface FetchUserAddressFailureAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_USER_ADDRESS_FAILURE;
}

export interface FetchUserAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.FETCH_USER_ADDRESS_REQUEST;
}

export interface FetchUserAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: FetchUserAddressPayload;
  type: typeof actionTypes.FETCH_USER_ADDRESS_SUCCESS;
}

/**
 * Fetch User Addresses Action.
 */
export type FetchUserAddressesAction =
  | FetchUserAddressesFailureAction
  | FetchUserAddressesRequestAction
  | FetchUserAddressesSuccessAction;

type FetchUserAddressesPayload = NormalizedSchema<
  {
    addresses: Record<UserAddress['id'], UserAddress>;
  },
  Array<UserAddress['id']>
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
 * Fetch User Default Contact Address Action.
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
  payload: UserAddress;
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
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_USER_ADDRESS_FAILURE;
}

export interface RemoveUserAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.REMOVE_USER_ADDRESS_REQUEST;
}

export interface RemoveUserAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
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
  meta: { userId: User['id']; addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_FAILURE;
}

export interface RemoveUserDefaultContactAddressRequestAction extends Action {
  meta: { userId: User['id']; addressId: UserAddress['id'] };
  type: typeof actionTypes.REMOVE_USER_DEFAULT_CONTACT_ADDRESS_REQUEST;
}

export interface RemoveUserDefaultContactAddressSuccessAction extends Action {
  meta: { userId: User['id']; addressId: UserAddress['id'] };
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
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_FAILURE;
}

export interface SetUserDefaultBillingAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_BILLING_ADDRESS_REQUEST;
}

export interface SetUserDefaultBillingAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
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
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_FAILURE;
}

export interface SetUserDefaultContactAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_CONTACT_ADDRESS_REQUEST;
}

export interface SetUserDefaultContactAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
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
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_FAILURE;
}

export interface SetUserDefaultShippingAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.SET_USER_DEFAULT_SHIPPING_ADDRESS_REQUEST;
}

export interface SetUserDefaultShippingAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
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
    addresses: Record<UserAddress['id'], UserAddress>;
  },
  UserAddress['id']
>;
export interface UpdateUserAddressFailureAction extends Action {
  meta: { addressId: UserAddress['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_USER_ADDRESS_FAILURE;
}

export interface UpdateUserAddressRequestAction extends Action {
  meta: { addressId: UserAddress['id'] };
  type: typeof actionTypes.UPDATE_USER_ADDRESS_REQUEST;
}

export interface UpdateUserAddressSuccessAction extends Action {
  meta: { addressId: UserAddress['id'] };
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
