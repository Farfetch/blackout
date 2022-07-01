import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PostPaymentIntentCharge } from './types';

/**
 * Method responsible for creating a payment intent charge.
 *
 * @param intentId     - Id of the payment intent.
 * @param data         - Request data.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postPaymentIntentCharge: PostPaymentIntentCharge = (
  intentId,
  data,
  config,
) =>
  client
    .post(join('/payment/v1/intents', intentId, 'charges'), data, config)
    .then(response => response)
    .catch(error => {
      throw adaptError(error);
    });

export default postPaymentIntentCharge;
