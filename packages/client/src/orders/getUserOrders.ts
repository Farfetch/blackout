import { adaptError } from '../helpers/client/formatError.js';
import { range } from 'lodash';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type {
  GetUserOrders,
  GetUserOrdersQuery,
  OrderSummaries,
  OrderSummary,
} from './types/index.js';

const DEFAULT_MAX_PAGESIZE = 180;

/**
 * Method responsible for fetching user orders.
 *
 * @param id     - The current user id.
 * @param query  - Pagination information. Possible values: "page", "pageSize".
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserOrders: GetUserOrders = async (id, query, config) => {
  const request = (
    query: GetUserOrdersQuery | undefined,
  ): Promise<OrderSummaries> =>
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

  if (query?.pageSize === Infinity && query?.pageSize === Infinity) {
    let entries = [] as Array<OrderSummary>;
    let totalItems = 0;

    const firstResult = await request({
      pageSize: DEFAULT_MAX_PAGESIZE,
      page: 1,
    });

    entries = [...firstResult.entries];
    totalItems += firstResult.entries.length;

    if (firstResult.totalItems >= DEFAULT_MAX_PAGESIZE) {
      await Promise.allSettled(
        range(2, firstResult?.totalPages + 1).map(page =>
          request({ pageSize: DEFAULT_MAX_PAGESIZE, page }),
        ),
      ).then(results => {
        for (const result of results) {
          if (result.status === 'fulfilled') {
            entries = [...entries, ...result.value.entries];
            totalItems += result.value.entries.length;
          }
        }
      });
    }

    return {
      entries,
      number: 1,
      totalItems,
      totalPages: 1,
    } as OrderSummaries;
  } else {
    return request(query);
  }
};

export default getUserOrders;
