import {
  CREATE_EXCHANGE_BOOK_REQUEST_FAILURE,
  CREATE_EXCHANGE_BOOK_REQUEST_REQUEST,
  CREATE_EXCHANGE_BOOK_REQUEST_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} ExchangeReturnAssociation
 *
 * @property {string} exchangeReturnItemId - The identifier of the exchange return item.
 * @property {number} returnId - The return identifier.
 */

/**
 * @typedef {object} Data
 *
 * @property {Array<ExchangeReturnAssociation>} exchangeReturnAssociations - List of exchange return item and the associated return id.
 */

/**
 * @callback CreateExchangeBookRequestThunkFactory
 * @param {Data} data  - Book requests request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an exchange book request.
 *
 * @function doCreateExchangeBookRequest
 * @memberof module:exchanges/actions
 *
 * @param {Function} postExchangeBookRequest  - Post exchange book request client.
 *
 * @returns {CreateExchangeBookRequestThunkFactory} Thunk factory.
 */
export default postExchangeBookRequest =>
  (id, data, config) =>
  async dispatch => {
    dispatch({
      type: CREATE_EXCHANGE_BOOK_REQUEST_REQUEST,
    });

    try {
      const result = await postExchangeBookRequest(id, data, config);

      dispatch({
        type: CREATE_EXCHANGE_BOOK_REQUEST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_EXCHANGE_BOOK_REQUEST_FAILURE,
      });

      throw error;
    }
  };
