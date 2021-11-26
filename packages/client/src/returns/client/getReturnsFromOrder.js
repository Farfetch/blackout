import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetReturnsFromOrderQuery
 *
 * @alias GetReturnsFromOrderQuery
 * @memberof module:returns/client
 *
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Method responsible for obtaining returns from a specific order.
 *
 * @function getReturnsFromOrder
 * @memberof module:returns/client
 *
 * @param {string} orderId - Order identifier.
 * @param {GetReturnsFromOrderQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (orderId, query, config) =>
  client
    .get(join('/account/v1/orders', orderId, 'returns', { query }), config)
    .then(response => response?.data)
    .catch(error => {
      throw adaptError(error);
    });
