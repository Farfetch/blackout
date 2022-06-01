import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetIntent } from './types';

/**
 * Gets the payment intent details.
 *
 * @param id     - Id of the payment intent.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getIntent: GetIntent = (id, config) =>
  client
    .get(join('/payment/v1/intents', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getIntent;
