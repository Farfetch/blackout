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
  getOrderAvailableItemsActivities,
  getOrderDetails,
  getOrderItemAvailableActivities,
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
 * import { getOrdersPagination } from '@farfetch/blackout-core/orders/redux';
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
export const getOrdersPagination = state =>
  createSelector([state => getResult(state.orders)], result => {
    if (!result) return;

    return {
      number: get(result, 'items.number'),
      totalItems: get(result, 'items.totalItems'),
      totalPages: get(result, 'items.totalPages'),
    };
  })(state);

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
 * @param {string} orderId - Order id.
 * @param {number} merchantId - Merchant id.
 * @returns {Array|undefined} List of return options objects.
 */
export const getReturnOptionsFromOrder = (state, orderId, merchantId) =>
  createSelector(
    [
      (state, orderId) => getOrder(state, orderId),
      getReturnOptions,
      (_, orderId, merchantId) => merchantId,
    ],
    (order, returnOptions, merchantId) => {
      const returnOptionsIds = get(
        order,
        `byMerchant.${merchantId}.returnOptions`,
      );

      return (
        returnOptionsIds &&
        returnOptionsIds.map(returnId => returnOptions[returnId])
      );
    },
  )(state, orderId, merchantId);

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
export const getMerchantsFromOrder = (state, orderId) =>
  createSelector(
    [(state, orderId) => getOrder(state, orderId), getMerchants],
    (order, merchants) => {
      const ordersByMerchant = get(order, 'byMerchant');

      return (
        ordersByMerchant &&
        Object.keys(ordersByMerchant).map(merchantId => merchants[merchantId])
      );
    },
  )(state, orderId);

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
export const getOrderItemsByOrder = (state, orderId) =>
  createSelector(
    [(state, orderId) => getOrder(state, orderId), getOrderItems],
    (order, orderItems) => {
      const orderItemsIds = get(order, 'items');

      return (
        orderItemsIds &&
        orderItemsIds.map(orderItemId => orderItems[orderItemId])
      );
    },
  )(state, orderId);

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
export const getOrderItemsByMerchant = (state, orderId) =>
  createSelector(
    [(state, orderId) => getOrder(state, orderId), getOrderItems],
    (order, orderItems) => {
      const orderDetailsByMerchant = get(order, 'byMerchant');
      // If the property orderItems exists, it means the store is not split by merchantOrderCode.
      // Otherwise, merchants are split by merchantOrderCode and the selector will consider this when getting that info.
      const isSplitByMerchantOrderCode = !Object.values(
        orderDetailsByMerchant || {},
      )[0]?.orderItems;

      if (!orderDetailsByMerchant) return;

      const result = {};

      for (const orderDetail in orderDetailsByMerchant) {
        if (orderDetailsByMerchant.hasOwnProperty(orderDetail)) {
          if (isSplitByMerchantOrderCode) {
            const orderItemsFromDetailsByMerchant = [];
            // Go through every merchantOrderCode and get the items from
            // the specific merchant (orderDetail).
            Object.values(orderDetailsByMerchant[orderDetail]).forEach(
              merchantCode => {
                const merchantOrderCode = merchantCode?.merchantOrderCode;

                if (merchantOrderCode) {
                  const orderItemsByMerchantOrderCode = get(
                    orderDetailsByMerchant,
                    `${orderDetail}.${merchantOrderCode}.orderItems`,
                  );

                  if (orderItemsByMerchantOrderCode) {
                    orderItemsByMerchantOrderCode.forEach(orderItem =>
                      orderItemsFromDetailsByMerchant.push(orderItem),
                    );
                  }
                }
              },
            );

            if (orderItemsFromDetailsByMerchant.length) {
              result[orderDetail] = orderItemsFromDetailsByMerchant.map(
                orderItemId => orderItems[orderItemId],
              );
            }
          } else {
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
      }

      return result;
    },
  )(state, orderId);

/**
 * Returns the quantity of orderItems in the order.
 *
 * @function
 * @param {object} state - Application state.
 * @param {string} orderId - Order id.
 * @param {number} orderItemId - Order item id.
 * @returns {number | undefined} Number of orderItems in the order.
 */
export const getOrderItemQuantity = (state, orderId, orderItemId) =>
  createSelector(
    [
      (state, orderId) => getOrder(state, orderId),
      (state, orderId) => getOrderItemsByOrder(state, orderId),
      (_, orderId, orderItemId) => orderItemId,
    ],
    (order, orderItemsByOrder, orderItemId) => {
      if (!order) return;

      const hasFullDetails = get(order, 'items');

      if (!hasFullDetails) return;

      return Object.values(orderItemsByOrder).reduce(
        (acc, value) => acc + (value.id === orderItemId),
        0,
      );
    },
  )(state, orderId, orderItemId);

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

/**
 * Returns the loading status for the available items activities operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Tracking Loading status.
 */
export const isAvailableItemsActivitiesLoading = state =>
  getOrderAvailableItemsActivities(state.orders).isLoading;

/**
 * Returns the error for the available items activities operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Trackings operation error.
 */
export const getAvailableItemsActivitiesError = state =>
  getOrderAvailableItemsActivities(state.orders).error;

/**
 * Returns the loading status for the order item available activities operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Tracking Loading status.
 */
export const isOrderItemAvailableActivitiesLoading = state =>
  getOrderItemAvailableActivities(state.orders).isLoading;

/**
 * Returns the error for the order item available activities operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Trackings operation error.
 */
export const getOrderItemAvailableActivitiesError = state =>
  getOrderItemAvailableActivities(state.orders).error;

/**
 * Returns a list of order summaries, with the order items if the
 * details of the order were previously fetched.
 *
 * This selector should only be used when implementing splitted orders.
 * That depends on the prop `splitByMerchantOrderCode` to be true
 * when fetching the user orders in the `doGetOrders` action.
 *
 * @function
 * @param {string} orderId - Order id.
 * @param {object} state - Application state.
 * @returns {object} Order summaries array.
 */
export const getOrderShipments = (state, orderId) => {
  const order = getOrder(state, orderId);

  if (!order) return;

  // Omit both byMerchant and items, we don't want to expose all of the items
  // of the order by its alphanumeric, we split the order items by the order summary
  const { byMerchant, items, ...sharedOrderInformation } = order;
  const result = [];

  for (const merchantId in byMerchant) {
    for (const merchantOrderCode in byMerchant[merchantId]) {
      if (merchantOrderCode !== 'returnOptions') {
        const orderSummary = byMerchant[merchantId][merchantOrderCode];
        // Fetch the full order item so the tenant does not have to fetch it
        // simplifying the renderization.
        orderSummary['orderItems'] = orderSummary?.['orderItems']?.map(
          orderItemId => getOrderItem(state, orderItemId),
        );

        result.push({
          ...sharedOrderInformation,
          ...byMerchant[merchantId][merchantOrderCode],
        });
      }
    }
  }

  return result;
};
