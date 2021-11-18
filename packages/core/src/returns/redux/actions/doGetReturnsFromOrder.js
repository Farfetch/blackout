import {
  GET_RETURNS_FROM_ORDER_FAILURE,
  GET_RETURNS_FROM_ORDER_REQUEST,
  GET_RETURNS_FROM_ORDER_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import returnSchema from '../../../entities/schemas/return';

/**
 * @typedef {object} GetReturnsFromOrderQuery
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest). This is should only be used if
 * you don't use access tokens.
 */

/**
 * @callback GetReturnsFromOrderThunkFactory
 * @param {string} orderId - Order identifier.
 * @param {GetReturnsFromOrderQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for returns from a specific order.
 *
 * @function doGetReturnsFromOrder
 * @memberof module:returns/actions
 *
 * @param {Function} getReturnsFromOrder - Get returns from order client.
 *
 * @returns {GetReturnsFromOrderThunkFactory} Thunk factory.
 */
export default getReturnsFromOrder =>
  (orderId, query, config) =>
  async dispatch => {
    dispatch({
      type: GET_RETURNS_FROM_ORDER_REQUEST,
    });

    try {
      const result = await getReturnsFromOrder(orderId, query, config);

      dispatch({
        payload: normalize(result, [returnSchema]),
        type: GET_RETURNS_FROM_ORDER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_RETURNS_FROM_ORDER_FAILURE,
      });

      throw error;
    }
  };
