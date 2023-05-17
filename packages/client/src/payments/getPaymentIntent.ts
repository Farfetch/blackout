import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetPaymentIntent } from './types/index.js';

/**
 * Gets the payment intent details.
 *
 * @param paymentIntentId - Id of the payment intent.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentIntent: GetPaymentIntent = (paymentIntentId, config) =>
  client
    .get(join('/payment/v1/intents', paymentIntentId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentIntent;
