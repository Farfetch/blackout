import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

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
 * Method responsible for creating product filtering criteria.
 *
 * @function postExchangeFilter
 * @memberof module:exchanges/client
 *
 * @param {Data} data - Exchange filter request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post(join('/account/v1/exchangeFilters'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
