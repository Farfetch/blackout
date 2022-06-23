import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PostCharges } from './types';

/**
 * Method responsible for creating an intent charge.
 *
 * @param id     - Id of the payment intent.
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postCharges: PostCharges = (id, data, config) =>
  client
    .post(join('/payment/v1/intents', id, 'charges'), data, config)
    .then(response => response)
    .catch(error => {
      throw adaptError(error);
    });

export default postCharges;
