import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetPaymentIntent } from './types';

/**
 * Gets the payment intent details.
 *
 * @param intentId     - Id of the payment intent.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentIntent: GetPaymentIntent = (intentId, config) =>
  client
    .get(join('/payment/v1/intents', intentId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentIntent;
