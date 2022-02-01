import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrders } from './types';

/**
 * Method responsible for fetching orders.
 *
 * @function getOrders
 * @memberof module:orders/client
 *
 * @param {number} id - The current user id.
 * @param {object} [query] - Pagination information. Possible values: "page", "pageSize".
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getOrders: GetOrders = (id, query, config) =>
  client
    .get(
      join('/account/v1/users/', id, 'orders', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getOrders;
