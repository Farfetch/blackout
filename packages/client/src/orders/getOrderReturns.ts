import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrderReturns } from './types';

/**
 * Method responsible for obtaining returns from a specific order.
 *
 * @param orderId - Order identifier.
 * @param query   - Query parameters.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getOrderReturns: GetOrderReturns = (orderId, query, config) =>
  client
    .get(join('/account/v1/orders', orderId, 'returns', { query }), config)
    .then(response => response?.data)
    .catch(error => {
      throw adaptError(error);
    });
