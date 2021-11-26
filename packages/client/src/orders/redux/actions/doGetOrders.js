import {
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import order from '../../../entities/schemas/order';

/**
 * @callback GetOrdersThunkFactory
 * @param {number} userId - Identifier of the user.
 * @param {object} query - Pagination information. Possible values: "page", "pageSize".
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get orders.
 *
 * @function doGetOrders
 * @memberof module:orders/actions
 *
 * @param {Function} getOrders - Get orders client.
 *
 * @returns {GetOrdersThunkFactory} Thunk factory.
 */
export default getOrders => (userId, query, config) => async dispatch => {
  dispatch({
    type: GET_ORDERS_REQUEST,
  });

  try {
    const result = await getOrders({ userId, query }, config);

    const normalizedOrders = normalize(result, {
      entries: [order],
    });

    dispatch({
      payload: normalizedOrders,
      type: GET_ORDERS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_ORDERS_FAILURE,
    });

    throw error;
  }
};
