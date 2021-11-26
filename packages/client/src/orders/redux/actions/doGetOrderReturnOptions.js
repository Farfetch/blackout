import {
  GET_ORDER_RETURN_OPTIONS_FAILURE,
  GET_ORDER_RETURN_OPTIONS_REQUEST,
  GET_ORDER_RETURN_OPTIONS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import returnOption from '../../../entities/schemas/returnOption';

/**
 * @callback GetOrderReturnOptionsThunkFactory
 * @param {string} orderId - The order id to get details from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get order return options.
 *
 * @function doGetOrderReturnOptions
 * @memberof module:orders/actions
 *
 * @param {Function} getOrderReturnOptions - Get order return options client.
 *
 * @returns {GetOrderReturnOptionsThunkFactory} Thunk factory.
 */
export default getOrderReturnOptions => (orderId, config) => async dispatch => {
  dispatch({
    meta: { orderId },
    type: GET_ORDER_RETURN_OPTIONS_REQUEST,
  });

  try {
    const result = await getOrderReturnOptions(orderId, config);

    dispatch({
      meta: { orderId },
      payload: normalize(result, [{ options: [returnOption] }]),
      type: GET_ORDER_RETURN_OPTIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { orderId },
      payload: { error },
      type: GET_ORDER_RETURN_OPTIONS_FAILURE,
    });

    throw error;
  }
};
