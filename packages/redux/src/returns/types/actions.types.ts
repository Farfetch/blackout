import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  PickupCapabilities,
  Return,
  ReturnItem,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ReturnNormalized } from './return.types';

type Payload = NormalizedSchema<
  {
    returnItems: Record<ReturnItem['id'], ReturnItem>;
  },
  ReturnNormalized
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

export interface GetReturnPickupCapabilitiesRequestAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST;
}
export interface GetReturnPickupCapabilitiesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS;
  meta: { id: string };
  payload: PickupCapabilities;
}
export interface GetReturnPickupCapabilitiesFailureAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE;
  payload: { error: Error };
}

/** Actions dispatched when the get pickup capabilities request is made. */
export type GetReturnPickupCapabilitiesAction =
  | GetReturnPickupCapabilitiesRequestAction
  | GetReturnPickupCapabilitiesSuccessAction
  | GetReturnPickupCapabilitiesFailureAction;

export interface GetReturnReferencesRequestAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_REFERENCES_REQUEST;
}
export interface GetReturnReferencesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_REFERENCES_SUCCESS;
  payload: string;
}
export interface GetReturnReferencesFailureAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_REFERENCES_FAILURE;
  payload: { error: Error };
}

/** Actions dispatched when the get references request is made. */
export type GetReturnReferencesAction =
  | GetReturnReferencesRequestAction
  | GetReturnReferencesSuccessAction
  | GetReturnReferencesFailureAction;

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

export interface FetchReturnPickupRescheduleRequestsRequestAction
  extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_REQUEST;
}
export interface FetchReturnPickupRescheduleRequestsSuccessAction
  extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_SUCCESS;
}
export interface FetchReturnPickupRescheduleRequestsFailureAction
  extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_FAILURE;
  payload: { error: Error };
}

/** Actions dispatched when the fetch pickup reschedule requests is made. */
export type FetchReturnPickupRescheduleRequestsAction =
  | FetchReturnPickupRescheduleRequestsRequestAction
  | FetchReturnPickupRescheduleRequestsSuccessAction
  | FetchReturnPickupRescheduleRequestsFailureAction;

export interface FetchReturnPickupRescheduleRequestRequestAction
  extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST;
}
export interface FetchReturnPickupRescheduleRequestSuccessAction
  extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS;
}
export interface FetchReturnPickupRescheduleRequestFailureAction
  extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE;
  payload: { error: Error };
}

/** Actions dispatched when the fetch pickup reschedule request is made. */
export type FetchReturnPickupRescheduleRequestAction =
  | FetchReturnPickupRescheduleRequestRequestAction
  | FetchReturnPickupRescheduleRequestSuccessAction
  | FetchReturnPickupRescheduleRequestFailureAction;

export interface CreateReturnPickupRescheduleRequestRequestAction
  extends Action {
  type: typeof actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST;
}
export interface CreateReturnPickupRescheduleRequestSuccessAction
  extends Action {
  type: typeof actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS;
  payload: Payload;
}
export interface CreateReturnPickupRescheduleRequestFailureAction
  extends Action {
  type: typeof actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE;
  payload: { error: Error };
}

/** Actions dispatched when the create pickup reschedule request is made. */
export type CreateReturnPickupRescheduleRequestAction =
  | CreateReturnPickupRescheduleRequestRequestAction
  | CreateReturnPickupRescheduleRequestSuccessAction
  | CreateReturnPickupRescheduleRequestFailureAction;

/**
 * Actions dispatched when the reset return request is made.
 */
export interface ResetReturnAction extends Action {
  type: typeof actionTypes.RESET_RETURN;
  meta: { resetEntities: boolean };
}
