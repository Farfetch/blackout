/**
 * @module orders/selectors
 * @category Orders
 * @subcategory Selectors
 */

import { createSelector } from 'reselect';
import {
  getDocuments,
  getError,
  getIsLoading,
  getOrderDetails,
  getOrderReturnOptions,
  getOrdersList,
  getResult,
  getTrackings,
} from './reducer';
import { getEntity } from '../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the loading flag for the orders area actions.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading.
 */
export const isOrdersLoading = state => getIsLoading(state.orders);

/**
 * Returns the error for the orders area actions.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Orders error.
 */
export const getOrdersError = state => getError(state.orders);

/**
 * Returns all the orders in the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with orders with its orderId as the key.
 */
export const getOrders = state => getEntity(state, 'orders');

/**
 * Returns a specific order identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} orderId - Order id.
 *
 * @returns {object} Order object.
 */
export const getOrder = (state, orderId) => getEntity(state, 'orders', orderId);

/**
 * Returns a label tracking with the order tracking events.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} trackingNumber - Tracking number.
 *
 * @returns {object} Label tracking object.
 */
export const getLabelTracking = (state, trackingNumber) =>
  getEntity(state, 'labelTracking', trackingNumber);

/**
 * Retrieves pagination information of the user orders.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Pagination object.
 *
 * @example
 * import { getOrdersPagination } from '@farfetch/blackout-client/orders/redux';
 *
 * const mapStateToProps = state => ({
 *     pagination: getOrdersPagination(state)
 * });
 *
 * @example
 * // Object returned for the orders
 * {
 *     number: 1, // Current page
 *     totalItems: 89, // Total of orders
 *     totalPages: 5 // Total of pages
 * };
 *
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
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} courierId - Courier Id.
 *
 * @returns {object} Courier object.
 */
export const getCourier = (state, courierId) =>
  getEntity(state, 'courier', courierId);

/**
 * Returns all the merchants in the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with all merchants with its merchantId as the key.
 */
export const getMerchants = state => getEntity(state, 'merchants');

/**
 * Returns a specific merchant identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} merchantId - Merchant id.
 *
 * @returns {object} Merchant object.
 */
export const getMerchant = (state, merchantId) =>
  getEntity(state, 'merchants', merchantId);

/**
 * Returns all the order items in the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with all order items with its orderItemId as the key.
 */
export const getOrderItems = state => getEntity(state, 'orderItems');

/**
 * Returns a specific order item identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} orderItemId - Order item id.
 *
 * @returns {object} Order item object.
 */
export const getOrderItem = (state, orderItemId) =>
  getEntity(state, 'orderItems', orderItemId);

/**
 * Returns all the countries in the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with all countries with its countryId as the key.
 */
export const getCountries = state => getEntity(state, 'countries');

/**
 * Returns a specific country identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} countryId - Country id.
 *
 * @returns {object} Country object.
 */
export const getCountry = (state, countryId) =>
  getEntity(state, 'countries', countryId);

/**
 * Returns all the return options in the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object with all returnOptions with
 * its orderId_merchantId_type as the key.
 */
export const getReturnOptions = state => getEntity(state, 'returnOptions');

/**
 * Returns a specific return option identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} returnOptionId - Return option id.
 *
 * @returns {object} Return option object.
 */
export const getReturnOption = (state, returnOptionId) =>
  getEntity(state, 'returnOptions', returnOptionId);

/**
 * Returns all return options from a specific order and merchant.
 *
 * @function
 * @param {object} state - Application state.
 * @param _
 * @param {string} orderId - Order id.
 * @param {number} merchantId - Merchant id.
 * @returns {Array|undefined} List of return options objects.
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
      returnOptionsIds.map(returnId => returnOptions[returnId])
    );
  },
);

/**
 * Returns all the merchants from a specific order.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} orderId - Order id.
 *
 * @returns {Array|undefined} List of merchants objects.
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
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} orderId - Order id.
 *
 * @returns {Array|undefined} List of order items objects.
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
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} orderId - Order id.
 *
 * @returns {object | undefined} Order items objects.
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
 * @function
 * @param {object} state - Application state.
 * @param _
 * @param {string} orderId - Order id.
 * @param {number} orderItemId - Order item id.
 * @returns {number | undefined} Number of orderItems in the order.
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
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Orders list Loading status.
 */
export const isOrdersListLoading = state =>
  getOrdersList(state.orders).isLoading;

/**
 * Returns the error for the orders list operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Orders list operation error.
 */
export const getOrdersListError = state => getOrdersList(state.orders).error;

/**
 * Returns the loading status for the orders list operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} orderId - Order identifier.
 *
 * @returns {boolean} Orders list Loading status.
 */
export const isOrderDetailsLoading = (state, orderId) =>
  getOrderDetails(state.orders).isLoading[orderId];

/**
 * Returns the error for the order details operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} orderId - Order identifier.
 *
 * @returns {object} Order details operation error.
 */
export const getOrderDetailsError = (state, orderId) =>
  getOrderDetails(state.orders).error[orderId];

/**
 * Returns the loading status for the order return options operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} orderId - Order identifier.
 *
 * @returns {boolean} Order return options Loading status.
 */
export const isOrderReturnOptionsLoading = (state, orderId) =>
  getOrderReturnOptions(state.orders).isLoading[orderId];

/**
 * Returns the error for the order return options operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} orderId - Order identifier.
 *
 * @returns {object} Order return options operation error.
 */
export const getOrderReturnOptionsError = (state, orderId) =>
  getOrderReturnOptions(state.orders).error[orderId];

/**
 * Returns the loading status for the tracking operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Tracking Loading status.
 */
export const isTrackingsLoading = state => getTrackings(state.orders).isLoading;

/**
 * Returns the error for the trackings operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Trackings operation error.
 */
export const getTrackingsError = state => getTrackings(state.orders).error;

/**
 * Returns the loading status for the documents operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Tracking Loading status.
 */
export const isDocumentsLoading = state => getDocuments(state.orders).isLoading;

/**
 * Returns the error for the documents operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Trackings operation error.
 */
export const getDocumentsError = state => getDocuments(state.orders).error;
