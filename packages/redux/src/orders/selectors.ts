import { createSelector } from 'reselect';
import {
  getDocuments,
  getError,
  getIsLoading,
  getOrderAvailableItemsActivities,
  getOrderDetails,
  getOrderItemAvailableActivities,
  getOrderReturnOptions,
  getOrderReturns,
  getOrdersList,
  getResult,
  getShipmentTrackings,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import { getMerchants } from '../products';
import get from 'lodash/get';
import type {
  CourierEntity,
  MerchantEntity,
  OrderItemEntity,
  OrderMerchantNormalized,
  ReturnOptionsEntity,
} from '../entities/types';
import type { Order } from '@farfetch/blackout-client';
import type { OrdersState } from './types';
import type { StoreState } from '../types';

/**
 * Returns the loading flag for the orders area actions.
 *
 * @param state - Application state.
 *
 * @returns Loading.
 */
export const areOrdersLoading = (state: StoreState) =>
  getIsLoading(state.orders as OrdersState);

/**
 * Returns the error for the orders area actions.
 *
 * @param state - Application state.
 *
 * @returns Orders error.
 */
export const getOrdersError = (state: StoreState) =>
  getError(state.orders as OrdersState);

/**
 * Returns all the orders in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with orders with its orderId as the key.
 */
export const getOrders = (state: StoreState) => getEntities(state, 'orders');

/**
 * Returns a specific order identified by its id.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns Order object.
 */
export const getOrder = (state: StoreState, orderId: Order['id']) =>
  getEntityById(state, 'orders', orderId);

/**
 * Returns a label tracking with the order tracking events.
 *
 * @param state          - Application state.
 * @param trackingNumber - Tracking number.
 *
 * @returns Label tracking object.
 */
export const getShipmentTrackingLabel = (
  state: StoreState,
  trackingNumber: string,
) => getEntityById(state, 'labelTracking', trackingNumber);

/**
 * Retrieves pagination information of the user orders.
 *
 * @example
 * ```
 * import { getOrdersPagination } from '@farfetch/blackout-client';
 *
 * const mapStateToProps = (state: StoreState) => ({
 *     pagination: getOrdersPagination(state)
 * });
 *
 * ```
 * @example
 * ```
 * // Object returned for the orders
 * {
 *     number: 1, // Current page
 *     totalItems: 89, // Total of orders
 *     totalPages: 5 // Total of pages
 * };
 *
 * ```
 *
 * @param state - Application state.
 *
 * @returns Pagination object.
 */
export const getOrdersPagination = createSelector(
  [(state: StoreState) => getResult(state.orders as OrdersState)],
  result => {
    if (!result) return;

    return {
      number: get(result, 'number'),
      totalItems: get(result, 'totalItems'),
      totalPages: get(result, 'totalPages'),
    };
  },
);

/**
 * Returns a courier with its name and id.
 *
 * @param state     - Application state.
 * @param courierId - Courier Id.
 *
 * @returns Courier object.
 */
export const getCourier = (state: StoreState, courierId: CourierEntity['id']) =>
  getEntityById(state, 'courier', courierId);

/**
 * Returns all the order items in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with all order items with its orderItemId as the key.
 */
export const getOrderItems = (state: StoreState) =>
  getEntities(state, 'orderItems');

/**
 * Returns a specific order item identified by its id.
 *
 * @param state       - Application state.
 * @param orderItemId - Order item id.
 *
 * @returns Order item object.
 */
export const getOrderItem = (
  state: StoreState,
  orderItemId: OrderItemEntity['id'],
) => getEntityById(state, 'orderItems', orderItemId);

/**
 * Returns all the return options in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with all returnOptions with its orderId_merchantId_type as the key.
 */
export const getReturnOptions = (state: StoreState) =>
  getEntities(state, 'returnOptions');

/**
 * Returns a specific return option identified by its id.
 *
 * @param state          - Application state.
 * @param returnOptionId - Return option id.
 *
 * @returns Return option object.
 */
export const getReturnOption = (state: StoreState, returnOptionId: string) =>
  getEntityById(state, 'returnOptions', returnOptionId);

/**
 * Returns all return options from a specific order and merchant.
 *
 * @param state      - Application state.
 * @param _          -
 * @param orderId    - Order id.
 * @param merchantId - Merchant id.
 *
 * @returns List of return options objects.
 */
export const getReturnOptionsFromOrder = createSelector(
  [
    (state, orderId) => getOrder(state, orderId),
    getReturnOptions,
    (_, orderId, merchantId) => ({ orderId, merchantId }),
  ],
  (order, returnOptions, { merchantId }) => {
    if (!order) {
      return undefined;
    }

    const returnOptionsIds = order.byMerchant[merchantId]?.returnOptions;

    return (returnOptionsIds &&
      returnOptionsIds
        .map((returnId: string) => returnOptions?.[returnId])
        .filter(Boolean)) as ReturnOptionsEntity[];
  },
);

/**
 * Returns all the merchants from a specific order.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns List of merchants objects.
 */
export const getMerchantsFromOrder = createSelector(
  [(state, orderId) => getOrder(state, orderId), getMerchants],
  (order, merchants) => {
    const ordersByMerchant = get(order, 'byMerchant');

    if (!ordersByMerchant) {
      return undefined;
    }

    return (
      Object.keys(ordersByMerchant)
        // This cast is necessary because Object.keys returns a string[]
        // but the strings are numbers as the ordersByMerchant variable is
        // a Record<number, OrderMerchantNormalized>
        .map(merchantId => merchants?.[merchantId as unknown as number])
        .filter(Boolean) as MerchantEntity[]
    );
  },
);

/**
 * Returns all the order items from a specific order.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns List of order items objects.
 */
export const getOrderItemsByOrder = createSelector(
  [(state, orderId) => getOrder(state, orderId), getOrderItems],
  (order, orderItems) => {
    if (!order) {
      return [];
    }

    if ('items' in order) {
      const orderItemsIds = get(order, 'items');

      return (
        orderItemsIds &&
        (orderItemsIds
          .map(orderItemId => orderItems?.[orderItemId])
          .filter(Boolean) as OrderItemEntity[])
      );
    }

    return [];
  },
);

/**
 * Returns all the order items from a specific order and merchant.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns Order items objects.
 */
export const getOrderItemsByMerchant = createSelector(
  [(state, orderId) => getOrder(state, orderId), getOrderItems],
  (order, orderItems) => {
    const orderDetailsByMerchant = get(order, 'byMerchant');

    if (!orderDetailsByMerchant) {
      return;
    }

    const result: Record<number, Array<OrderItemEntity>> = {};

    for (const merchantId in orderDetailsByMerchant) {
      const orderItemsFromDetailsByMerchant = get(
        orderDetailsByMerchant,
        `${merchantId}.orderItems`,
      ) as OrderMerchantNormalized['orderItems'] | undefined;

      if (orderItemsFromDetailsByMerchant) {
        result[merchantId as unknown as number] =
          orderItemsFromDetailsByMerchant
            .map(orderItemId => orderItems?.[orderItemId as unknown as number])
            .filter(Boolean) as OrderItemEntity[];
      }
    }

    return result;
  },
);

/**
 * Returns the quantity of orderItems in the order.
 *
 * @param state       - Application state.
 * @param _           -
 * @param orderId     - Order id.
 * @param orderItemId - Order item id.
 *
 * @returns Number of orderItems in the order.
 */
export const getOrderItemQuantity = createSelector(
  [
    (state, orderId) => getOrder(state, orderId),
    (state, orderId) => getOrderItemsByOrder(state, orderId),
    (_, orderId, orderItemId) => ({ orderId, orderItemId }),
  ],
  (order, orderItemsByOrder, { orderItemId }) => {
    if (!order) {
      return;
    }

    const hasFullDetails = get(order, 'items');

    if (!hasFullDetails) {
      return;
    }

    if (!orderItemsByOrder) {
      return;
    }

    return Object.values(orderItemsByOrder).reduce(
      (acc, value) => acc + (value.id === orderItemId ? 1 : 0),
      0,
    );
  },
);

/**
 * Returns the loading status for the orders list operation.
 *
 * @param state - Application state.
 *
 * @returns Orders list Loading status.
 */
export const isOrdersListLoading = (state: StoreState) =>
  getOrdersList(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the orders list operation.
 *
 * @param state - Application state.
 *
 * @returns Orders list operation error.
 */
export const getOrdersListError = (state: StoreState) =>
  getOrdersList(state.orders as OrdersState).error;

/**
 * Returns the loading status for the order operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Orders list Loading status.
 */
export const isOrderLoading = (state: StoreState, orderId: Order['id']) =>
  getOrderDetails(state.orders as OrdersState).isLoading[orderId];

/**
 * Returns the error for the order operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order details operation error.
 */
export const getOrderError = (state: StoreState, orderId: Order['id']) =>
  getOrderDetails(state.orders as OrdersState).error[orderId];

/**
 * Returns the loading status for the order returns operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order returns Loading status.
 */
export const areOrderReturnsLoading = (
  state: StoreState,
  orderId: Order['id'],
) => getOrderReturns(state.orders as OrdersState).isLoading[orderId];

/**
 * Returns the error for the order returns operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order returns operation error.
 */
export const getOrderReturnsError = (state: StoreState, orderId: Order['id']) =>
  getOrderReturns(state.orders as OrdersState).error[orderId];

/**
 * Returns the loading status for the order return options operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order return options Loading status.
 */
export const areOrderReturnOptionsLoading = (
  state: StoreState,
  orderId: Order['id'],
) => getOrderReturnOptions(state.orders as OrdersState).isLoading[orderId];

/**
 * Returns the error for the order return options operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order return options operation error.
 */
export const getOrderReturnOptionsError = (
  state: StoreState,
  orderId: string,
) => getOrderReturnOptions(state.orders as OrdersState).error[orderId];

/**
 * Returns the loading status for the tracking operation.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const areShipmentTrackingsLoading = (state: StoreState) =>
  getShipmentTrackings(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the trackings operation.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getShipmentTrackingsError = (state: StoreState) =>
  getShipmentTrackings(state.orders as OrdersState).error;

/**
 * Returns the loading status for the documents operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const areDocumentsLoading = (state: StoreState) =>
  getDocuments(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the documents operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getDocumentsError = (state: StoreState) =>
  getDocuments(state.orders as OrdersState).error;

/**
 * Returns the loading status for the available items activities operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const areAvailableItemsActivitiesLoading = (state: StoreState) =>
  getOrderAvailableItemsActivities(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the available items activities operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getAvailableItemsActivitiesError = (state: StoreState) =>
  getOrderAvailableItemsActivities(state.orders as OrdersState).error;

/**
 * Returns the loading status for the order item available activities operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const areOrderItemAvailableActivitiesLoading = (state: StoreState) =>
  getOrderItemAvailableActivities(state.orders as OrdersState).isLoading;

/**
 * Returns the error for the order item available activities operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getOrderItemAvailableActivitiesError = (state: StoreState) =>
  getOrderItemAvailableActivities(state.orders as OrdersState).error;
