import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  CheckoutOrder,
  DraftOrder,
  DraftOrderItem,
} from '@farfetch/blackout-client';
import type {
  DraftOrderEntity,
  DraftOrdersNormalized,
  Nullable,
} from '../../../index.js';
import type { NormalizedSchema } from 'normalizr';

/**
 * Create a draft order Action.
 */
export type CreateDraftOrderAction =
  | CreateDraftOrderFailureAction
  | CreateDraftOrderRequestAction
  | CreateDraftOrderSuccessAction;

export interface CreateDraftOrderFailureAction extends Action {
  meta: { orderId: CheckoutOrder['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_DRAFT_ORDER_FAILURE;
}

export interface CreateDraftOrderRequestAction extends Action {
  meta: { orderId: CheckoutOrder['id'] };
  type: typeof actionTypes.CREATE_DRAFT_ORDER_REQUEST;
}

export interface CreateDraftOrderSuccessAction extends Action {
  meta: { orderId: CheckoutOrder['id'] };
  payload: NormalizedSchema<
    {
      draftOrders: Record<DraftOrder['id'], DraftOrderEntity>;
    },
    DraftOrder['id']
  >;
  type: typeof actionTypes.CREATE_DRAFT_ORDER_SUCCESS;
}

/**
 * Fetch a draft order Action.
 */
export type FetchDraftOrderAction =
  | FetchDraftOrderFailureAction
  | FetchDraftOrderRequestAction
  | FetchDraftOrderSuccessAction;

export interface FetchDraftOrderFailureAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_DRAFT_ORDER_FAILURE;
}

export interface FetchDraftOrderRequestAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  type: typeof actionTypes.FETCH_DRAFT_ORDER_REQUEST;
}

export interface FetchDraftOrderSuccessAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  payload: NormalizedSchema<
    {
      draftOrders: Record<DraftOrder['id'], DraftOrderEntity>;
    },
    DraftOrder['id']
  >;
  type: typeof actionTypes.FETCH_DRAFT_ORDER_SUCCESS;
}

/**
 * Fetch get draft orders Action.
 */
export type FetchDraftOrdersAction =
  | FetchDraftOrdersFailureAction
  | FetchDraftOrdersRequestAction
  | FetchDraftOrdersSuccessAction;

export interface FetchDraftOrdersFailureAction extends Action {
  meta: { hash: Nullable<string> };
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_DRAFT_ORDERS_FAILURE;
}

export interface FetchDraftOrdersRequestAction extends Action {
  meta: { hash: Nullable<string> };
  type: typeof actionTypes.FETCH_DRAFT_ORDERS_REQUEST;
}

export interface FetchDraftOrdersSuccessAction extends Action {
  meta: { hash: Nullable<string> };
  payload: NormalizedSchema<
    {
      draftOrders: Record<DraftOrder['id'], DraftOrderEntity>;
    },
    DraftOrdersNormalized
  >;
  type: typeof actionTypes.FETCH_DRAFT_ORDERS_SUCCESS;
}

/**
 * Fetch update draft order Action.
 */
export type FetchUpdateDraftOrderAction =
  | FetchUpdateDraftOrderFailureAction
  | FetchUpdateDraftOrderRequestAction
  | FetchUpdateDraftOrderSuccessAction;

export interface FetchUpdateDraftOrderFailureAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_DRAFT_ORDER_FAILURE;
}

export interface FetchUpdateDraftOrderRequestAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  type: typeof actionTypes.UPDATE_DRAFT_ORDER_REQUEST;
}

export interface FetchUpdateDraftOrderSuccessAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  payload: number;
  type: typeof actionTypes.UPDATE_DRAFT_ORDER_SUCCESS;
}

/**
 * Fetch update draft order item Action.
 */
export type FetchUpdateDraftOrderItemAction =
  | FetchUpdateDraftOrderItemFailureAction
  | FetchUpdateDraftOrderItemRequestAction
  | FetchUpdateDraftOrderItemSuccessAction;

export interface FetchUpdateDraftOrderItemFailureAction extends Action {
  meta: { draftOrderId: DraftOrder['id']; itemId: DraftOrderItem['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.UPDATE_DRAFT_ORDER_ITEM_FAILURE;
}

export interface FetchUpdateDraftOrderItemRequestAction extends Action {
  meta: { draftOrderId: DraftOrder['id']; itemId: DraftOrderItem['id'] };
  type: typeof actionTypes.UPDATE_DRAFT_ORDER_ITEM_REQUEST;
}

export interface FetchUpdateDraftOrderItemSuccessAction extends Action {
  meta: { draftOrderId: DraftOrder['id']; itemId: DraftOrderItem['id'] };
  payload: number;
  type: typeof actionTypes.UPDATE_DRAFT_ORDER_ITEM_SUCCESS;
}

/**
 * Fetch delete draft order Action.
 */
export type FetchRemoveDraftOrderAction =
  | FetchRemoveDraftOrderFailureAction
  | FetchRemoveDraftOrderRequestAction
  | FetchRemoveDraftOrderSuccessAction;

export interface FetchRemoveDraftOrderFailureAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_DRAFT_ORDER_FAILURE;
}

export interface FetchRemoveDraftOrderRequestAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  type: typeof actionTypes.REMOVE_DRAFT_ORDER_REQUEST;
}

export interface FetchRemoveDraftOrderSuccessAction extends Action {
  meta: { draftOrderId: DraftOrder['id'] };
  payload: number;
  type: typeof actionTypes.REMOVE_DRAFT_ORDER_SUCCESS;
}

/**
 * Fetch delete draft order item Action.
 */
export type FetchRemoveDraftOrderItemAction =
  | FetchRemoveDraftOrderItemFailureAction
  | FetchRemoveDraftOrderItemRequestAction
  | FetchRemoveDraftOrderItemSuccessAction;

export interface FetchRemoveDraftOrderItemFailureAction extends Action {
  meta: { draftOrderId: DraftOrder['id']; itemId: DraftOrderItem['id'] };
  payload: { error: BlackoutError };
  type: typeof actionTypes.REMOVE_DRAFT_ORDER_ITEM_FAILURE;
}

export interface FetchRemoveDraftOrderItemRequestAction extends Action {
  meta: { draftOrderId: DraftOrder['id']; itemId: DraftOrderItem['id'] };
  type: typeof actionTypes.REMOVE_DRAFT_ORDER_ITEM_REQUEST;
}

export interface FetchRemoveDraftOrderItemSuccessAction extends Action {
  meta: { draftOrderId: DraftOrder['id']; itemId: DraftOrderItem['id'] };
  payload: number;
  type: typeof actionTypes.REMOVE_DRAFT_ORDER_ITEM_SUCCESS;
}

/**
 * Reset DraftOrders Action.
 */
export type ResetDraftOrdersAction = ResetDraftOrdersSuccessAction;

export interface ResetDraftOrdersSuccessAction extends Action {
  type: typeof actionTypes.RESET_DRAFT_ORDERS_STATE;
}
