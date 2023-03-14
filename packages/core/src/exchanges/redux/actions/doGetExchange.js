import {
  GET_EXCHANGE_FAILURE,
  GET_EXCHANGE_REQUEST,
  GET_EXCHANGE_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetExchangeThunkFactory
 * @param {string} id - Exchange identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains a specific exchange.
 *
 * @function doGetExchange
 * @memberof module:exchanges/actions
 *
 * @param {Function} getExchange - Get exchange client.
 *
 * @returns {GetExchangeThunkFactory} Thunk factory.
 */
export default getExchange => (id, config) => async dispatch => {
  dispatch({
    type: GET_EXCHANGE_REQUEST,
  });

  try {
    const result = await getExchange(id, config);

    dispatch({
      type: GET_EXCHANGE_SUCCESS,
      payload: result,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_EXCHANGE_FAILURE,
    });

    throw error;
  }
};
