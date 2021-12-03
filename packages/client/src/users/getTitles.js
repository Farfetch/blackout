import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetTitlesQuery
 *
 * @alias GetTitlesQuery
 * @memberof module:users/client
 *
 * @property {number} [page=1] - Number of the page to get, starting at 1.
 * The default is 1.
 * @property {number} [pageSize=10000] - Size of each page, as a number.
 * The default is 10000.
 */

/**
 * Method responsible for get list of titles.
 *
 * @function getTitles
 * @memberof module:users/client
 *
 * @param {GetTitlesQuery} [query] - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (query, config) =>
  client
    .get(join('/account/v1/titles', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
