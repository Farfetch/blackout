import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

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
 * Method responsible for creating an exchange.
 *
 * @function postExchange
 * @memberof module:exchanges/client
 *
 * @param {Data} data - Exchange request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post(join('/account/v1/exchanges'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
