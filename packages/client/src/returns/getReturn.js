import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetReturnQuery
 *
 * @alias GetReturnQuery
 * @memberof module:returns/client
 *
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Method responsible for obtaining a specific return.
 *
 * @function getReturn
 * @memberof module:returns/client
 *
 * @param {string} id - Return identifier.
 * @param {GetReturnQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(join('/legacy/v1/returns', id, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
