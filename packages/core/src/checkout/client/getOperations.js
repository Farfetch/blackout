import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetOperationsQuery
 *
 * @property {number} page - Specify the number of the page to get, starting at 1. The default is 1.
 * @property {number} pageSize - Specify the size of each page, as a number between 1 and 180. The default is 60.
 * @property {Array<string>} sort - Sort by the creation date of the operations. The default is to sort by the most recent.
 *                              "createdDate:desc" - Start by the most recent.
 *                              "createdDate:asc" - Start by the oldest.
 * @property {string} createdDate - Filter by the creation date, in RFC 3339 format, using ge and le operators separated by commas (,).
 *                               (e.g: "createdDate=ge:2019-01-20T10:01:55.883Z,le:2019-01-22T10:01:55.883Z").
 */

/**
 * Method responsible for getting all operations performed in the order.
 *
 * @function getOperations
 * @memberof module:checkout/client
 *
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {GetOperationsQuery} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(join('/checkout/v1/orders/', id, 'operations', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
