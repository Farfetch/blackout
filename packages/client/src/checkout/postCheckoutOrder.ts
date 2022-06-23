import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import type { PostCheckoutOrder } from './types';

/**
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const postCheckoutOrder: PostCheckoutOrder = (data, config) =>
  client
    .post('/checkout/v1/orders', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
