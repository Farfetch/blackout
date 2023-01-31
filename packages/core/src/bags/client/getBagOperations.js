import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetBagOperationsQuery
 *
 * @property {number} page - Specify the number of the page to get, starting at 1. The default is 1.
 * @property {number} pageSize - Specify the size of each page, as a number between 1 and 180. The default is 60.
 * @property {Array<string>} sort - Sort the contents, as follows:
 *                                  "createdDate:desc" - Sort by the creation date, starting by the most recent.
 *                                  "createdDate:asc" - Sort by the creation date, starting by the oldest.
 * @property {string} createdDate - Filter by the creation date, in RFC 3339 format, using ge and le operators separated by commas (,).
 *                                  (e.g: "createdDate=ge:2019-01-20T10:01:55.883Z,le:2019-01-22T10:01:55.883Z").
 */

/**
 * Method responsible for retrieving operations carried out on the bag.
 *
 * @function getBagOperations
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {GetBagOperationsQuery} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(join('/commerce/v1/bags', id, 'operations', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
