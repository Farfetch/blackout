import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { LOGOUT_SUCCESS } from '../../authentication/actionTypes';
import type { NormalizedSchema } from 'normalizr';
import type { Order } from '@farfetch/blackout-client/orders/types';
import type {
  OrderItemsEntity,
  OrdersEntity,
  ReturnOptionsEntity,
} from '../../entities/types';

export type NormalizedOrders = Omit<Order, 'items'> & {
  items: Array<Order['id']>;
};

type Payload = NormalizedSchema<
  {
    orders: Record<OrdersEntity['id'], OrdersEntity>;
    orderItems: Record<OrderItemsEntity['id'], OrderItemsEntity>;
    returnOptions: Record<ReturnOptionsEntity['id'], ReturnOptionsEntity>;
  },
  NormalizedOrders
>;

export interface FetchOrderRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_REQUEST;
  meta: { orderId: string };
}
export interface FetchOrderSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_SUCCESS;
  payload: Payload;
  meta: { orderId: string };
}
export interface FetchOrderFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_FAILURE;
  payload: { error: BlackoutError };
  meta: { orderId: string };
}

/**
 * Actions dispatched when the fetch order request is made.
 */
export type FetchOrderAction =
  | FetchOrderRequestAction
  | FetchOrderSuccessAction
  | FetchOrderFailureAction;

export interface FetchOrderReturnOptionsRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST;
  meta: { orderId: string };
}
export interface FetchOrderReturnOptionsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS;
  payload: Payload;
  meta: { orderId: string };
}
export interface FetchOrderReturnOptionsFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE;
  payload: { error: BlackoutError };
  meta: { orderId: string };
}

/**
 * Actions dispatched when the fetch order return request is made.
 */
export type FetchOrderReturnOptionsAction =
  | FetchOrderReturnOptionsRequestAction
  | FetchOrderReturnOptionsSuccessAction
  | FetchOrderReturnOptionsFailureAction;

export interface FetchOrdersRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDERS_REQUEST;
}
export interface FetchOrdersSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDERS_SUCCESS;
  payload: Payload;
}
export interface FetchOrdersFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDERS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch orders request is made.
 */
export type FetchOrdersAction =
  | FetchOrdersRequestAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailureAction;

export interface FetchTrackingsRequestAction extends Action {
  type: typeof actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST;
}
export interface FetchTrackingsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_SHIPMENT_TRACKINGS_SUCCESS;
  payload: Payload;
}
export interface FetchTrackingsFailureAction extends Action {
  type: typeof actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch trackings request is made.
 */
export type FetchTrackingsAction =
  | FetchTrackingsRequestAction
  | FetchTrackingsSuccessAction
  | FetchTrackingsFailureAction;

export interface FetchOrderDocumentsRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_DOCUMENTS_REQUEST;
}
export interface FetchOrderDocumentsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_DOCUMENTS_SUCCESS;
  payload: Payload;
}
export interface FetchOrderDocumentsFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_DOCUMENTS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch order documents request is made.
 */
export type FetchOrderDocumentsAction =
  | FetchOrderDocumentsRequestAction
  | FetchOrderDocumentsSuccessAction
  | FetchOrderDocumentsFailureAction;

export interface FetchOrderDocumentRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_DOCUMENT_REQUEST;
}
export interface FetchOrderDocumentSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_DOCUMENT_SUCCESS;
  payload: Payload;
}
export interface FetchOrderDocumentFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_DOCUMENT_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch order document request is made.
 */
export type FetchOrderDocumentAction =
  | FetchOrderDocumentRequestAction
  | FetchOrderDocumentSuccessAction
  | FetchOrderDocumentFailureAction;

export interface AddOrderDocumentRequestAction extends Action {
  type: typeof actionTypes.ADD_ORDER_DOCUMENT_REQUEST;
}
export interface AddOrderDocumentSuccessAction extends Action {
  type: typeof actionTypes.ADD_ORDER_DOCUMENT_SUCCESS;
  payload: Payload;
}
export interface AddOrderDocumentFailureAction extends Action {
  type: typeof actionTypes.ADD_ORDER_DOCUMENT_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the add order document request is made.
 */
export type AddOrderDocumentAction =
  | AddOrderDocumentRequestAction
  | AddOrderDocumentSuccessAction
  | AddOrderDocumentFailureAction;

/**
 * Actions dispatched when the reset orders request is made.
 */
export interface ResetOrdersAction extends Action {
  type: typeof actionTypes.RESET_ORDERS;
  meta: { resetEntities: boolean };
}

/**
 * Action dispatched when the logout request is made.
 */
export interface LogoutAction extends Action {
  type: typeof LOGOUT_SUCCESS;
}

/**
 * Actions dispatched when the fetch order available items activities request is
 * made.
 */
export type FetchOrderAvailableItemsActivitiesAction =
  | FetchOrderAvailableItemsActivitiesRequestAction
  | FetchOrderAvailableItemsActivitiesSuccessAction
  | FetchOrderAvailableItemsActivitiesFailureAction;

export interface FetchOrderAvailableItemsActivitiesRequestAction
  extends Action {
  type: typeof actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST;
}
export interface FetchOrderAvailableItemsActivitiesSuccessAction
  extends Action {
  type: typeof actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS;
  payload: Payload;
}
export interface FetchOrderAvailableItemsActivitiesFailureAction
  extends Action {
  type: typeof actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch order available items activities request is
 * made.
 */
export type FetchOrderItemAvailableActivitiesAction =
  | FetchOrderItemAvailableActivitiesRequestAction
  | FetchOrderItemAvailableActivitiesSuccessAction
  | FetchOrderItemAvailableActivitiesFailureAction;

export interface FetchOrderItemAvailableActivitiesRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST;
}
export interface FetchOrderItemAvailableActivitiesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS;
  payload: Payload;
}
export interface FetchOrderItemAvailableActivitiesFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE;
  payload: { error: BlackoutError };
}
