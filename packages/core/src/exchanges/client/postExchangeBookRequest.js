import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

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
 * Method responsible for booking the request for an exchange.
 *
 * @function postExchangeBookRequest
 * @memberof module:exchanges/client
 *
 * @param {string} id - The uuid of the exchange.
 * @param {Data} data - Book requests request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, data, config) =>
  client
    .post(join('/account/v1/exchanges', id, '/bookRequests'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
