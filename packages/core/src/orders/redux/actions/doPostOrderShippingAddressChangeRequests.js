import {
  POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_FAILURE,
  POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST,
  POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS,
} from '../actionTypes';

/**
 * @callback PostOrderShippingAddressChangeRequestsThunkFactory
 * @param {string} orderId - The order id to post details from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Post order shipping address change requests.
 *
 * @function doPostOrderShippingAddressChangeRequests
 * @memberof module:orders/actions
 *
 * @param {Function} postOrderShippingAddressChangeRequests - Post requests to change the shipping address of the order.
 *
 * @returns {PostOrderShippingAddressChangeRequestsThunkFactory} Thunk factory.
 */
export default postOrderShippingAddressChangeRequests =>
  (orderId, data, config) =>
  async dispatch => {
    dispatch({
      type: POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST,
    });

    try {
      const result = await postOrderShippingAddressChangeRequests(
        orderId,
        data,
        config,
      );

      dispatch({
        type: POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: POST_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_FAILURE,
      });

      throw error;
    }
  };
