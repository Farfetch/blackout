import { createSelector } from 'reselect';
import {
  getDocuments,
  getError,
  getIsLoading,
  getOrderAvailableItemsActivities,
  getOrderDetails,
  getOrderItemAvailableActivities,
  getOrderReturnOptions,
  getOrdersList,
  getResult,
  getShipmentTrackings,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import get from 'lodash/get';
import type { BlackoutError } from '@farfetch/blackout-client';
import type {
  LabelTracking,
  Order,
  OrderItem,
  OrderSummary,
} from '@farfetch/blackout-client/orders/types';
import type { StoreState } from '../types';

/**
 * Returns the loading flag for the orders area actions.
 *
 * @param state - Application state.
 *
 * @returns Loading.
 */
export const isOrdersLoading = (state: StoreState): boolean =>
  getIsLoading(state.orders);

/**
 * Returns the error for the orders area actions.
 *
 * @param state - Application state.
 *
 * @returns Orders error.
 */
export const getOrdersError = (state: StoreState): BlackoutError | null =>
  getError(state.orders);

/**
 * Returns all the orders in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with orders with its orderId as the key.
 */
export const getOrders = (state: StoreState): OrderSummary =>
  getEntities(state, 'orders');

/**
 * Returns a specific order identified by its id.
 *
 * @param state   - Application state.
 * @param orderId - Order id.
 *
 * @returns Order object.
 */
export const getOrder = (
  state: StoreState,
  orderId: string,
): Order | undefined => getEntityById(state, 'orders', orderId);

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
): LabelTracking | undefined =>
  getEntityById(state, 'labelTracking', trackingNumber);

/**
 * Retrieves pagination information of the user orders.
 *
 * @example
 * ```
 * import { getOrdersPagination } from '@farfetch/blackout-client/orders/redux';
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
  [state => getResult(state.orders)],
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
export const getCourier = (state: StoreState, courierId: string) =>
  getEntityById(state, 'courier', courierId);

/**
 * Returns all the merchants in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with all merchants with its merchantId as the key.
 */
export const getMerchants = (state: StoreState) =>
  getEntities(state, 'merchants');

/**
 * Returns a specific merchant identified by its id.
 *
 * @param state      - Application state.
 * @param merchantId - Merchant id.
 *
 * @returns Merchant object.
 */
export const getMerchant = (state: StoreState, merchantId: string) =>
  getEntityById(state, 'merchants', merchantId);

/**
 * Returns all the order items in the application state.
 *
 * @param state - Application state.
 *
 * @returns Object with all order items with its orderItemId as the key.
 */
export const getOrderItems = (state: StoreState): Order =>
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
  orderItemId: string,
): OrderItem | undefined => getEntityById(state, 'orderItems', orderItemId);

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
    const returnOptionsIds = get(
      order,
      `byMerchant.${merchantId}.returnOptions`,
    );

    return (
      returnOptionsIds &&
      returnOptionsIds.map((returnId: string) => returnOptions[returnId])
    );
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

    return (
      ordersByMerchant &&
      Object.keys(ordersByMerchant).map(merchantId => merchants[merchantId])
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
    const orderItemsIds = get(order, 'items');

    return (
      orderItemsIds && orderItemsIds.map(orderItemId => orderItems[orderItemId])
    );
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

    if (!orderDetailsByMerchant) return;

    const result = {};

    for (const orderDetail in orderDetailsByMerchant) {
      if (orderDetailsByMerchant.hasOwnProperty(orderDetail)) {
        const orderItemsFromDetailsByMerchant = get(
          orderDetailsByMerchant,
          `${orderDetail}.orderItems`,
        );

        if (orderItemsFromDetailsByMerchant) {
          result[orderDetail] = orderItemsFromDetailsByMerchant.map(
            orderItemId => orderItems[orderItemId],
          );
        }
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
    if (!order) return;

    const hasFullDetails = get(order, 'items');

    if (!hasFullDetails) return;

    return Object.values(orderItemsByOrder).reduce(
      (acc, value) => acc + (value.id === orderItemId),
      0,
    );
  },
);

/**
 * Returns the error or loading status of each sub-area.
 */

/**
 * Returns the loading status for the orders list operation.
 *
 * @param state - Application state.
 *
 * @returns Orders list Loading status.
 */
export const isOrdersListLoading = (state: StoreState): boolean =>
  getOrdersList(state.orders).isLoading;

/**
 * Returns the error for the orders list operation.
 *
 * @param state - Application state.
 *
 * @returns Orders list operation error.
 */
export const getOrdersListError = (state: StoreState): BlackoutError =>
  getOrdersList(state.orders).error;

/**
 * Returns the loading status for the orders list operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Orders list Loading status.
 */
export const isOrderDetailsLoading = (
  state: StoreState,
  orderId: string,
): boolean => getOrderDetails(state.orders).isLoading[orderId];

/**
 * Returns the error for the order details operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order details operation error.
 */
export const getOrderDetailsError = (
  state: StoreState,
  orderId: string,
): BlackoutError => getOrderDetails(state.orders).error[orderId];

/**
 * Returns the loading status for the order return options operation.
 *
 * @param state   - Application state.
 * @param orderId - Order identifier.
 *
 * @returns Order return options Loading status.
 */
export const isOrderReturnOptionsLoading = (
  state: StoreState,
  orderId: string,
): boolean => getOrderReturnOptions(state.orders).isLoading[orderId];

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
): BlackoutError => getOrderReturnOptions(state.orders).error[orderId];

/**
 * Returns the loading status for the tracking operation.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const isTrackingsLoading = (state: StoreState): boolean =>
  getShipmentTrackings(state.orders).isLoading;

/**
 * Returns the error for the trackings operation.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getShipmentTrackingsError = (state: StoreState): BlackoutError =>
  getShipmentTrackings(state.orders).error;

/**
 * Returns the loading status for the documents operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const isDocumentsLoading = (state: StoreState): boolean =>
  getDocuments(state.orders).isLoading;

/**
 * Returns the error for the documents operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getDocumentsError = (state: StoreState): BlackoutError =>
  getDocuments(state.orders).error;

/**
 * Returns the loading status for the available items activities operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const isAvailableItemsActivitiesLoading = (state: StoreState): boolean =>
  getOrderAvailableItemsActivities(state.orders).isLoading;

/**
 * Returns the error for the available items activities operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getAvailableItemsActivitiesError = (
  state: StoreState,
): BlackoutError => getOrderAvailableItemsActivities(state.orders).error;

/**
 * Returns the loading status for the order item available activities operations.
 *
 * @param state - Application state.
 *
 * @returns Tracking Loading status.
 */
export const isOrderItemAvailableActivitiesLoading = (
  state: StoreState,
): boolean => getOrderItemAvailableActivities(state.orders).isLoading;

/**
 * Returns the error for the order item available activities operations.
 *
 * @param state - Application state.
 *
 * @returns Trackings operation error.
 */
export const getOrderItemAvailableActivitiesError = (
  state: StoreState,
): BlackoutError => getOrderItemAvailableActivities(state.orders).error;
