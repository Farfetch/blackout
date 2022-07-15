import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrderReturnOptions } from './types';

/**
 * Method responsible for fetching the order return options.
 *
 * @param orderId - The orderID.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getOrderReturnOptions: GetOrderReturnOptions = (orderId, config) =>
  client
    .get(join('/legacy/v1/orders', orderId, 'returnoptions'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
