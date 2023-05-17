import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetOrderReturnOptions } from './types/index.js';

/**
 * Method responsible for fetching the order return options.
 *
 * @param orderId - The orderID.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getOrderReturnOptions: GetOrderReturnOptions = (orderId, config) =>
  client
    .get(join('/account/v1/orders', orderId, 'returnoptions'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getOrderReturnOptions;
