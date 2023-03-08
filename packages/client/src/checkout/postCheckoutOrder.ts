import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { PostCheckoutOrder } from './types/index.js';

/**
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postCheckoutOrder: PostCheckoutOrder = (data, config) =>
  client
    .post('/checkout/v1/orders', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postCheckoutOrder;
