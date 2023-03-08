import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostPaymentIntentCharge } from './types/index.js';

/**
 * Method responsible for creating a payment intent charge.
 *
 * @param paymentIntentId - Id of the payment intent.
 * @param data            - Request data.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postPaymentIntentCharge: PostPaymentIntentCharge = (
  paymentIntentId,
  data,
  config,
) =>
  client
    .post(join('/payment/v1/intents', paymentIntentId, 'charges'), data, config)
    .then(response => response)
    .catch(error => {
      throw adaptError(error);
    });

export default postPaymentIntentCharge;
