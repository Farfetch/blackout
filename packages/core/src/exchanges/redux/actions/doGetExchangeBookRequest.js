import {
  GET_EXCHANGE_BOOK_REQUEST_FAILURE,
  GET_EXCHANGE_BOOK_REQUEST_REQUEST,
  GET_EXCHANGE_BOOK_REQUEST_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetExchangeBookRequestThunkFactory
 * @param {string} id - The uuid of the exchange.
 * @param {string} bookRequestId - The uuid of the booking request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains a specific exchange book request.
 *
 * @function doGetExchangeBookRequest
 * @param getExchangeBookRequest
 * @memberof module:exchanges/actions
 * @param {Function} getExchange - Get exchange book request client.
 * @returns {GetExchangeBookRequestThunkFactory} Thunk factory.
 */
export default getExchangeBookRequest =>
  (id, bookRequestId, config) =>
  async dispatch => {
    dispatch({
      type: GET_EXCHANGE_BOOK_REQUEST_REQUEST,
    });

    try {
      const result = await getExchangeBookRequest(id, bookRequestId, config);

      dispatch({
        type: GET_EXCHANGE_BOOK_REQUEST_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_EXCHANGE_BOOK_REQUEST_FAILURE,
      });

      throw error;
    }
  };
