import client, { adaptError } from '../helpers/client';
import type { PostCheckout } from './types';

/**
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postCheckout: PostCheckout = (data, config) =>
  client
    .post('/checkout/v1/orders', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postCheckout;
