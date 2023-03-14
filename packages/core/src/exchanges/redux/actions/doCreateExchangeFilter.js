import {
  CREATE_EXCHANGE_FILTER_FAILURE,
  CREATE_EXCHANGE_FILTER_REQUEST,
  CREATE_EXCHANGE_FILTER_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} ExchangeFilterItem
 *
 * @property {string} orderCode - The alphanumeric identifier of the order.
 * @property {string} orderItemUuid - The order item uuid to be exchanged.
 */

/**
 * @typedef {object} Data
 *
 * @property {Array<ExchangeFilterItem>} exchangeFilterItems - The order items under the same shipping order to be exchanged.
 */

/**
 * @callback CreateExchangeFilterThunkFactory
 * @param {Data} data  - Exchange filter request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an exchange filter.
 *
 * @function doCreateExchangeFilter
 * @memberof module:exchanges/actions
 *
 * @param {Function} postExchangeFilter  - Post exchange filter client.
 *
 * @returns {CreateExchangeFilterThunkFactory} Thunk factory.
 */
export default postExchangeFilter => (data, config) => async dispatch => {
  dispatch({
    type: CREATE_EXCHANGE_FILTER_REQUEST,
  });

  try {
    const result = await postExchangeFilter(data, config);

    dispatch({
      payload: result,
      type: CREATE_EXCHANGE_FILTER_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: CREATE_EXCHANGE_FILTER_FAILURE,
    });

    throw error;
  }
};
