import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PostCheckoutOrderCharges } from './types';

/**
 * Method responsible for creating an order charge.
 *
 * @param id     - Numeric identifier of the checkout order.
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const postCheckoutOrderCharges: PostCheckoutOrderCharges = (
  id,
  data,
  config,
) =>
  client
    .post(join('/checkout/v1/orders', id, 'charges'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
