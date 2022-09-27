import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError, Brand, Order } from '@farfetch/blackout-client';
import type {
  CategoryEntity,
  CourierEntity,
  LabelTrackingEntity,
  MerchantEntity,
  MerchantOrderReturnOptionsNormalized,
  OrderEntity,
  OrderItemEntity,
  OrdersNormalized,
  ReturnEntity,
  ReturnItemEntity,
  ReturnOptionEntity,
  ShipmentTrackingsNormalized,
} from '../../entities/types';
import type { NormalizedSchema } from 'normalizr';

type OrderPayload = NormalizedSchema<
  {
    orders: Record<OrderEntity['id'], OrderEntity>;
    orderItems: Record<OrderItemEntity['id'], OrderItemEntity>;
    merchants: Record<MerchantEntity['id'], MerchantEntity>;
    brands: Record<Brand['id'], Brand>;
    categories: Record<CategoryEntity['id'], CategoryEntity>;
  },
  OrderEntity['id']
>;

type UserOrdersPayload = NormalizedSchema<
  {
    orders: Record<OrderEntity['id'], OrderEntity>;
    merchants: Record<MerchantEntity['id'], MerchantEntity>;
  },
  OrdersNormalized
>;

type GuestOrdersPayload = NormalizedSchema<
  {
    orders: Record<OrderEntity['id'], OrderEntity>;
    orderItems: Record<OrderItemEntity['id'], OrderItemEntity>;
    merchants: Record<MerchantEntity['id'], MerchantEntity>;
    brands: Record<Brand['id'], Brand>;
    categories: Record<CategoryEntity['id'], CategoryEntity>;
  },
  Array<OrderEntity['id']>
>;

type ReturnsPayload = NormalizedSchema<
  {
    returnItems: Record<ReturnItemEntity['id'], ReturnItemEntity>;
    returns: Record<ReturnEntity['id'], ReturnEntity>;
  },
  Array<ReturnEntity['id']>
>;

type ReturnOptionsPayload = NormalizedSchema<
  {
    returnOptions: Record<ReturnOptionEntity['id'], ReturnOptionEntity>;
  },
  MerchantOrderReturnOptionsNormalized[]
>;

type ShipmentTrackingsPayload = NormalizedSchema<
  {
    labelTracking: Record<
      LabelTrackingEntity['trackingNumber'],
      LabelTrackingEntity
    >;
    courier: Record<CourierEntity['id'], CourierEntity>;
  },
  ShipmentTrackingsNormalized
>;

export interface FetchOrderRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_REQUEST;
  meta: { orderId: Order['id'] };
}
export interface FetchOrderSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_SUCCESS;
  payload: OrderPayload;
  meta: { orderId: string };
}
export interface FetchOrderFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_FAILURE;
  payload: { error: BlackoutError };
  meta: { orderId: Order['id'] };
}

/**
 * Actions dispatched when the fetch order request is made.
 */
export type FetchOrderAction =
  | FetchOrderRequestAction
  | FetchOrderSuccessAction
  | FetchOrderFailureAction;

export interface FetchOrderReturnsRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURNS_REQUEST;
  meta: { orderId: Order['id'] };
}
export interface FetchOrderReturnsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURNS_SUCCESS;
  payload: ReturnsPayload;
  meta: { orderId: Order['id'] };
}
export interface FetchOrderReturnsFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURNS_FAILURE;
  payload: { error: BlackoutError };
  meta: { orderId: Order['id'] };
}

/**
 * Actions dispatched when the order returns request is made.
 */
export type FetchOrderReturnsAction =
  | FetchOrderReturnsRequestAction
  | FetchOrderReturnsSuccessAction
  | FetchOrderReturnsFailureAction;

export interface FetchOrderReturnOptionsRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST;
  meta: { orderId: Order['id'] };
}
export interface FetchOrderReturnOptionsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS;
  payload: ReturnOptionsPayload;
  meta: { orderId: Order['id'] };
}
export interface FetchOrderReturnOptionsFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE;
  payload: { error: BlackoutError };
  meta: { orderId: Order['id'] };
}

/**
 * Actions dispatched when the fetch order return request is made.
 */
export type FetchOrderReturnOptionsAction =
  | FetchOrderReturnOptionsRequestAction
  | FetchOrderReturnOptionsSuccessAction
  | FetchOrderReturnOptionsFailureAction;

export interface FetchUserOrdersRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_ORDERS_REQUEST;
}
export interface FetchUserOrdersSuccessAction extends Action {
  type: typeof actionTypes.FETCH_USER_ORDERS_SUCCESS;
  payload: UserOrdersPayload;
}
export interface FetchUserOrdersFailureAction extends Action {
  type: typeof actionTypes.FETCH_USER_ORDERS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch orders request is made.
 */
export type FetchOrdersAction =
  | FetchUserOrdersRequestAction
  | FetchUserOrdersSuccessAction
  | FetchUserOrdersFailureAction;

export interface FetchGuestOrdersRequestAction extends Action {
  type: typeof actionTypes.FETCH_GUEST_ORDERS_REQUEST;
}
export interface FetchGuestOrdersSuccessAction extends Action {
  type: typeof actionTypes.FETCH_GUEST_ORDERS_SUCCESS;
  payload: GuestOrdersPayload;
}
export interface FetchGuestOrdersFailureAction extends Action {
  type: typeof actionTypes.FETCH_GUEST_ORDERS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch guest orders request is made.
 */
export type FetchGuestOrdersAction =
  | FetchGuestOrdersRequestAction
  | FetchGuestOrdersSuccessAction
  | FetchGuestOrdersFailureAction;

export interface FetchShipmentTrackingsRequestAction extends Action {
  type: typeof actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST;
}
export interface FetchShipmentTrackingsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_SHIPMENT_TRACKINGS_SUCCESS;
  payload: ShipmentTrackingsPayload;
}
export interface FetchShipmentTrackingsFailureAction extends Action {
  type: typeof actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch trackings request is made.
 */
export type FetchShipmentTrackingsAction =
  | FetchShipmentTrackingsRequestAction
  | FetchShipmentTrackingsSuccessAction
  | FetchShipmentTrackingsFailureAction;

export interface FetchOrderDocumentsRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_DOCUMENTS_REQUEST;
}
export interface FetchOrderDocumentsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_DOCUMENTS_SUCCESS;
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
}

/**
 * Actions dispatched when the reset order details state request is made.
 */
export interface ResetOrderDetailsStateAction extends Action {
  type: typeof actionTypes.RESET_ORDER_DETAILS_STATE;
  payload: Array<Order['id']> | undefined;
}

/**
 * Actions dispatched when the reset order returns state request is made.
 */
export interface ResetOrderReturnsStateAction extends Action {
  type: typeof actionTypes.RESET_ORDER_RETURNS_STATE;
  payload: Array<Order['id']> | undefined;
}

/**
 * Actions dispatched when the reset order returns request is made.
 */
export interface ResetOrderReturnsEntitiesAction extends Action {
  type: typeof actionTypes.RESET_ORDER_RETURNS_ENTITIES;
  payload: Array<Order['id']> | undefined;
}

/**
 * Actions dispatched when the reset order return options state request is made.
 */
export interface ResetOrderReturnOptionsStateAction extends Action {
  type: typeof actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE;
  payload: Array<Order['id']> | undefined;
}

/**
 * Actions dispatched when the reset order return options entities request is made.
 */
export interface ResetOrderReturnOptionsEntitiesAction extends Action {
  type: typeof actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES;
  payload: Array<Order['id']> | undefined;
}

export interface FetchOrderAvailableItemsActivitiesRequestAction
  extends Action {
  type: typeof actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST;
}
export interface FetchOrderAvailableItemsActivitiesSuccessAction
  extends Action {
  type: typeof actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS;
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
export type FetchOrderAvailableItemsActivitiesAction =
  | FetchOrderAvailableItemsActivitiesRequestAction
  | FetchOrderAvailableItemsActivitiesSuccessAction
  | FetchOrderAvailableItemsActivitiesFailureAction;

export interface FetchOrderItemAvailableActivitiesRequestAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST;
}
export interface FetchOrderItemAvailableActivitiesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS;
}
export interface FetchOrderItemAvailableActivitiesFailureAction extends Action {
  type: typeof actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE;
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

export interface AddOrderItemActivityRequestAction extends Action {
  type: typeof actionTypes.ADD_ORDER_ITEM_ACTIVITY_REQUEST;
}
export interface AddOrderItemActivitySuccessAction extends Action {
  type: typeof actionTypes.ADD_ORDER_ITEM_ACTIVITY_SUCCESS;
}
export interface AddOrderItemActivityFailureAction extends Action {
  type: typeof actionTypes.ADD_ORDER_ITEM_ACTIVITY_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the add order item activity request is
 * made.
 */
export type AddOrderItemActivityAction =
  | AddOrderItemActivityRequestAction
  | AddOrderItemActivitySuccessAction
  | AddOrderItemActivityFailureAction;
