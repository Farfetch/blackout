import {
  CREATE_EXCHANGE_FILTER_FAILURE,
  CREATE_EXCHANGE_FILTER_REQUEST,
  CREATE_EXCHANGE_FILTER_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import exchangeFiltersSchema from '../../../entities/schemas/exchangeFilter.js';

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
  // Although exchangeFilterItems is an array, it only has 1 object at a time, so it's safe to
  // directly access the first index.
  const orderItemUuid = data.exchangeFilterItems[0]?.orderItemUuid || '';

  try {
    if (!orderItemUuid) {
      throw new Error('No orderItemUuid found');
    }

    dispatch({
      meta: { orderItemUuid },
      type: CREATE_EXCHANGE_FILTER_REQUEST,
    });

    const result = await postExchangeFilter(data, config);
    const normalizedResult = normalize(result, exchangeFiltersSchema);

    dispatch({
      payload: normalizedResult,
      meta: { orderItemUuid },
      type: CREATE_EXCHANGE_FILTER_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      meta: { orderItemUuid },
      type: CREATE_EXCHANGE_FILTER_FAILURE,
    });

    throw error;
  }
};
