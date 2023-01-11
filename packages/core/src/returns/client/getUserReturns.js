import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetUserReturnQuery
 *
 * @alias GetUserReturnQuery
 * @memberof module:returns/client
 *
 * @property {number} [page] - Number of the page to get, starting at 1. The default is 1.
 * @property {number} [pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
 * @property {string} [sort] - Comma separated list of sort criteria of the results. Possible values:
 * createdAt:asc, createdAt:desc.
 */

/**
 * Method responsible for getting all the user returns.
 *
 * @function getUserReturns
 * @memberof module:profile/client
 *
 * @param {number} userId - The user's id.
 * @param {GetUserReturnQuery} [query] - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, query, config) =>
  client
    .get(join('/account/v1/users', userId, '/returns', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
