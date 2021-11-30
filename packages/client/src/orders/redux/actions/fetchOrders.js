import {
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import order from '../../../entities/schemas/order';

/**
 * @callback FetchOrdersThunkFactory
 * @param {number} userId - Identifier of the user.
 * @param {object} query - Pagination information. Possible values: "page", "pageSize".
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetches orders.
 *
 * @function fetchOrders
 * @memberof module:orders/actions
 *
 * @param {Function} getOrders - Get orders client.
 *
 * @returns {FetchOrdersThunkFactory} Thunk factory.
 */
export default getOrders => (userId, query, config) => async dispatch => {
  dispatch({
    type: FETCH_ORDERS_REQUEST,
  });

  try {
    const result = await getOrders({ userId, query }, config);
    const normalizedOrders = normalize(result, {
      entries: [order],
    });

    dispatch({
      payload: normalizedOrders,
      type: FETCH_ORDERS_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_ORDERS_FAILURE,
    });

    throw error;
  }
};
