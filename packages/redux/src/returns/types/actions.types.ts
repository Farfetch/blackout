import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Return,
  ReturnItem,
  ReturnPickupCapability,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { ReturnEntity } from '../../entities/index.js';

type ReturnPayload = NormalizedSchema<
  {
    returnItems: Record<ReturnItem['id'], ReturnItem>;
  },
  Return['id']
>;

export interface CreateReturnRequestAction extends Action {
  type: typeof actionTypes.CREATE_RETURN_REQUEST;
}
export interface CreateReturnSuccessAction extends Action {
  type: typeof actionTypes.CREATE_RETURN_SUCCESS;
  payload: ReturnPayload;
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

export interface FetchReturnPickupCapabilityRequestAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_REQUEST;
  meta: { returnId: Return['id']; pickupDay: string; hash: string };
}
export interface FetchReturnPickupCapabilitySuccessAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_SUCCESS;
  meta: { returnId: Return['id']; pickupDay: string; hash: string };
  payload: ReturnPickupCapability;
}
export interface FetchReturnPickupCapabilityFailureAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_FAILURE;
  meta: { returnId: Return['id']; pickupDay: string; hash: string };
  payload: { error: BlackoutError };
}

/** Actions dispatched when the fetch pickup capability request is made. */
export type FetchReturnPickupCapabilityAction =
  | FetchReturnPickupCapabilityRequestAction
  | FetchReturnPickupCapabilitySuccessAction
  | FetchReturnPickupCapabilityFailureAction;

/**
 * Action dispatched when the reset return pickup capability state request is made.
 */
export interface ResetReturnPickupCapabilityStateAction extends Action {
  type: typeof actionTypes.RESET_RETURN_PICKUP_CAPABILITY_STATE;
  payload: Array<{ returnId: Return['id']; pickupDay: string }>;
}

export interface FetchReturnRequestAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_REQUEST;
  meta: { returnId: Return['id'] };
}
export interface FetchReturnSuccessAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_SUCCESS;
  meta: { returnId: Return['id'] };
  payload: ReturnPayload;
}
export interface FetchReturnFailureAction extends Action {
  type: typeof actionTypes.FETCH_RETURN_FAILURE;
  meta: { returnId: Return['id'] };
  payload: { error: BlackoutError };
}

/**
 * Action dispatched when the reset return state request is made.
 */
export interface ResetReturnStateAction extends Action {
  type: typeof actionTypes.RESET_RETURN_STATE;
  payload: Array<Return['id']>;
}

/**
 * Actions dispatched when the fetch return request is made.
 */
export type FetchReturnAction =
  | FetchReturnRequestAction
  | FetchReturnSuccessAction
  | FetchReturnFailureAction;

export interface UpdateReturnRequestAction extends Action {
  type: typeof actionTypes.UPDATE_RETURN_REQUEST;
  meta: { returnId: Return['id'] };
}
export interface UpdateReturnSuccessAction extends Action {
  type: typeof actionTypes.UPDATE_RETURN_SUCCESS;
  meta: { returnId: Return['id'] };
  payload: {
    pickupSchedule: NonNullable<ReturnEntity['pickupSchedule']>;
  };
}
export interface UpdateReturnFailureAction extends Action {
  type: typeof actionTypes.UPDATE_RETURN_FAILURE;
  meta: { returnId: Return['id'] };
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the update return request is made.
 */
export type UpdateReturnAction =
  | UpdateReturnRequestAction
  | UpdateReturnSuccessAction
  | UpdateReturnFailureAction;

/**
 * Actions dispatched when the reset return request is made.
 */
export interface ResetReturnsAction extends Action {
  type: typeof actionTypes.RESET_RETURNS;
  meta: { resetEntities: boolean };
}
