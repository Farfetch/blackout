import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { LOGOUT_SUCCESS } from '../../authentication/actionTypes';
import type { NormalizedReturns } from './return.types';
import type { NormalizedSchema } from 'normalizr';
import type {
  PickupCapabilities,
  Return,
  ReturnItem,
} from '@farfetch/blackout-client/returns/types';

type Payload = NormalizedSchema<
  {
    returnItems: Record<ReturnItem['Id'], ReturnItem>;
  },
  NormalizedReturns
>;

export interface CreateReturnRequestAction extends Action {
  type: typeof actionTypes.CREATE_RETURN_REQUEST;
}
export interface CreateReturnSuccessAction extends Action {
  type: typeof actionTypes.CREATE_RETURN_SUCCESS;
  payload: Payload;
}
export interface CreateReturnFailureAction extends Action {
  type: typeof actionTypes.CREATE_RETURN_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the create return request is made.
 */
export type CreateReturnAction =
  | CreateReturnRequestAction
  | CreateReturnSuccessAction
  | CreateReturnFailureAction;

export interface GetPickupCapabilitiesRequestAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST;
}
export interface GetPickupCapabilitiesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_CAPABILITIES_SUCCESS;
  meta: { id: string };
  payload: PickupCapabilities;
}
export interface GetPickupCapabilitiesFailureAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_CAPABILITIES_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the get pickup capabilities request is made.
 */
export type GetPickupCapabilitiesAction =
  | GetPickupCapabilitiesRequestAction
  | GetPickupCapabilitiesSuccessAction
  | GetPickupCapabilitiesFailureAction;

export interface GetReferencesRequestAction extends Action {
  type: typeof actionTypes.FETCH_REFERENCES_REQUEST;
}
export interface GetReferencesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_REFERENCES_SUCCESS;
  payload: string;
}
export interface GetReferencesFailureAction extends Action {
  type: typeof actionTypes.FETCH_REFERENCES_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the get references request is made.
 */
export type GetReferencesAction =
  | GetReferencesRequestAction
  | GetReferencesSuccessAction
  | GetReferencesFailureAction;

export interface GetReturnRequestAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_REQUEST;
}
export interface GetReturnSuccessAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_SUCCESS;
  payload: Payload;
}
export interface GetReturnFailureAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the get return request is made.
 */
export type GetReturnAction =
  | GetReturnRequestAction
  | GetReturnSuccessAction
  | GetReturnFailureAction;

export interface GetReturnsFromOrderRequestAction extends Action {
  type: typeof actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST;
}
export interface GetReturnsFromOrderSuccessAction extends Action {
  type: typeof actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS;
  payload: Payload;
}
export interface GetReturnsFromOrderFailureAction extends Action {
  type: typeof actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the get returns from order request is made.
 */
export type GetReturnsFromOrderAction =
  | GetReturnsFromOrderRequestAction
  | GetReturnsFromOrderSuccessAction
  | GetReturnsFromOrderFailureAction;

export interface UpdateReturnRequestAction extends Action {
  type: typeof actionTypes.UPDATE_RETURN_REQUEST;
  meta: { id: string };
}
export interface UpdateReturnSuccessAction extends Action {
  type: typeof actionTypes.UPDATE_RETURN_SUCCESS;
  meta: { id: string };
  payload: Return;
}
export interface UpdateReturnFailureAction extends Action {
  type: typeof actionTypes.UPDATE_RETURN_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the update return request is made.
 */
export type UpdateReturnAction =
  | UpdateReturnRequestAction
  | UpdateReturnSuccessAction
  | UpdateReturnFailureAction;

export interface FetchPickupRescheduleRequestsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_RESCHEDULE_REQUESTS_REQUEST;
}
export interface FetchPickupRescheduleRequestsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_RESCHEDULE_REQUESTS_SUCCESS;
}
export interface FetchPickupRescheduleRequestsFailureAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_RESCHEDULE_REQUESTS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch pickup reschedule requests is made.
 */
export type FetchPickupRescheduleRequestsAction =
  | FetchPickupRescheduleRequestsRequestAction
  | FetchPickupRescheduleRequestsSuccessAction
  | FetchPickupRescheduleRequestsFailureAction;

export interface FetchPickupRescheduleRequestRequestAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_RESCHEDULE_REQUEST_REQUEST;
}
export interface FetchPickupRescheduleRequestSuccessAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_RESCHEDULE_REQUEST_SUCCESS;
}
export interface FetchPickupRescheduleRequestFailureAction extends Action {
  type: typeof actionTypes.FETCH_PICKUP_RESCHEDULE_REQUEST_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch pickup reschedule request is made.
 */
export type FetchPickupRescheduleRequestAction =
  | FetchPickupRescheduleRequestRequestAction
  | FetchPickupRescheduleRequestSuccessAction
  | FetchPickupRescheduleRequestFailureAction;

export interface CreatePickupRescheduleRequestRequestAction extends Action {
  type: typeof actionTypes.CREATE_PICKUP_RESCHEDULE_REQUEST_REQUEST;
}
export interface CreatePickupRescheduleRequestSuccessAction extends Action {
  type: typeof actionTypes.CREATE_PICKUP_RESCHEDULE_REQUEST_SUCCESS;
  payload: Payload;
}
export interface CreatePickupRescheduleRequestFailureAction extends Action {
  type: typeof actionTypes.CREATE_PICKUP_RESCHEDULE_REQUEST_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the create pickup reschedule request is made.
 */
export type CreatePickupRescheduleRequestAction =
  | CreatePickupRescheduleRequestRequestAction
  | CreatePickupRescheduleRequestSuccessAction
  | CreatePickupRescheduleRequestFailureAction;

/**
 * Actions dispatched when the reset return request is made.
 */
export interface ResetReturnAction extends Action {
  type: typeof actionTypes.RESET_RETURN;
  meta: { resetEntities: boolean };
}

/**
 * Action dispatched when the logout request is made.
 */
export interface LogoutAction extends Action {
  type: typeof LOGOUT_SUCCESS;
}
