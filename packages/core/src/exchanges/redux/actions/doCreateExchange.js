import {
  CREATE_EXCHANGE_FAILURE,
  CREATE_EXCHANGE_REQUEST,
  CREATE_EXCHANGE_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} Product
 *
 * @property {number} id - The numeric identificator of the product.
 * @property {string} variantId - The uuid of the product variant.
 * @property {number} merchantId - Identifier of the merchant supplying the product.
 */

/**
 * @typedef {object} ExchangeItem
 *
 * @property {Product} product - The new product details of the exchange.
 */

/**
 * @typedef {object} ExchangeReturnItem
 *
 * @property {string} orderCode - The alphanumeric identifier of the order.
 * @property {string} orderItemUuid - The order item uuid of the item being returned.
 * @property {number} [returnId] - The returnId associated with the exchange return item.
 */

/**
 * @typedef {object} ExchangeGroup
 *
 * @property {Array<ExchangeReturnItem>} exchangeReturnItems - The return items associated with the exchange group.
 * @property {Array<ExchangeItem>} exchangeItems - The items requested to be exchanged for.
 */

/**
 * @typedef {object} Data
 *
 * @property {Array<ExchangeGroup>} exchangeGroups - The list of requesting group relation to exchange.
 */

/**
 * @callback CreateExchangeThunkFactory
 * @param {Data} data  - Exchanges request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an exchange book request.
 *
 * @function doCreateExchanges
 * @memberof module:exchanges/actions
 *
 * @param {Function} postExchange  - Post exchange client.
 *
 * @returns {CreateExchangeThunkFactory} Thunk factory.
 */
export default postExchange => (data, config) => async dispatch => {
  dispatch({
    type: CREATE_EXCHANGE_REQUEST,
  });

  try {
    const result = await postExchange(data, config);

    dispatch({
      type: CREATE_EXCHANGE_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: CREATE_EXCHANGE_FAILURE,
    });

    throw error;
  }
};
