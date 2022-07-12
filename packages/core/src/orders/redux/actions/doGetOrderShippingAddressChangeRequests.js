import {
  GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_FAILURE,
  GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST,
  GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetOrderShippingAddressChangeRequestsThunkFactory
 * @param {string} orderId - The order id to get details from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get order shipping address change requests.
 *
 * @function doGetOrderShippingAddressChangeRequests
 * @memberof module:orders/actions
 *
 * @param {Function} getOrderShippingAddressChangeRequests - Get requests to change the shipping address of the order.
 *
 * @returns {GetOrderShippingAddressChangeRequestsThunkFactory} Thunk factory.
 */
export default getOrderShippingAddressChangeRequests =>
  (orderId, config) =>
  async dispatch => {
    dispatch({
      type: GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST,
    });

    try {
      const result = await getOrderShippingAddressChangeRequests(
        orderId,
        config,
      );

      dispatch({
        type: GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_FAILURE,
      });

      throw error;
    }
  };
