import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserOrders } from './types/index.js';

/**
 * Method responsible for fetching user orders.
 *
 * @param id     - The current user id.
 * @param query  - Pagination information. Possible values: "page", "pageSize".
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserOrders: GetUserOrders = (id, query, config) =>
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

export default getUserOrders;
