import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrder } from './types';

/**
 * Method responsible for fetching the details of an order.
 *
 * @param orderId - The orderID to get the details.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getOrder: GetOrder = (orderId, config) =>
  client
    .get(join('/account/v1/orders', orderId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
