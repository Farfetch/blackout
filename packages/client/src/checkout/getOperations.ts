import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetOperations } from './types/getOperations.types';

/**
 * @typedef {object} GetOperationsQuery
 *
 * @alias GetOperationsQuery
 * @memberof module:checkout
 *
 * @property {number} [page] - Number of the page to get, starting at 1. The default is 1.
 * @property {number} [pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
 * @property {string[]} [sort] - Sorts the operations by the created date in ascending or descending order. The default is to sort by created date descending.
 * One of the following:
 * - createdDate:desc: Sorts by the operation createdDate, starting with the newest operation.
 * - createdDate:asc: Sorts by the operation createdDate, starting with the oldest operation.
 * @property {string} [createdDate] - Operations created in specific time range, specified as a complex filter. Only 'ge' and 'le' are supported.
 */

/**
 * Method responsible for fetching all operations performed in the order.
 *
 * @function getOperations
 * @memberof module:checkout
 *
 * @param {number} id - Universal identifier of the Order.
 * @param {GetOperationsQuery} [query] - Query params.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise<object>} Promise that will resolve when the call to the endpoint finishes.
 */
const getOperations: GetOperations = (id, query, config) =>
  client
    .get(join('/checkout/v1/orders/', id, 'operations', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
export default getOperations;
