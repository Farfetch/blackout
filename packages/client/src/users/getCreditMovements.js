import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetCreditMovementsQuery
 *
 * @alias GetCreditMovementsQuery
 * @memberof module:users/client
 *
 * @property {string} [from] - Get movements created after the
 * specified ISO 8601 moment. For example, 2017-07-01T00:00:00.
 * @property {string} [to] - Get movements created before the specified
 * ISO 8601 moment. For example, 2017-07-31T23:59:59.
 * @property {number} [page=1] - Number of the page to get, starting at 1.
 * The default is 1.
 * @property {number} [pageSize=10000] - Size of each page, as a number.
 * The default is 10000.
 */

/**
 * Method responsible to get the credit movements of the user.
 *
 * @function getCreditMovements
 * @memberof module:users/client
 *
 * @param {string} id - User identifier.
 * @param {GetCreditMovementsQuery} [query] - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(join('/legacy/v1/users', id, 'creditMovements', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
