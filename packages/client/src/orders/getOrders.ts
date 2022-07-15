import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrders } from './types';

/**
 * Method responsible for fetching orders.
 *
 * @param id     - The current user id.
 * @param query  - Pagination information. Possible values: "page", "pageSize".
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getOrders: GetOrders = (id, query, config) =>
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
