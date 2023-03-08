import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostPaymentIntentInstrument } from './types/index.js';

/**
 * Method responsible for creating a payment instrument for a payment intent.
 *
 * @param paymentIntentId - Id of the payment intent.
 * @param data            - Request data.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postPaymentIntentInstrument: PostPaymentIntentInstrument = (
  paymentIntentId,
  data,
  config,
) =>
  client
    .post(
      join('/payment/v1/intents', paymentIntentId, 'instruments'),
      data,
      config,
    )
    .then(response => response)
    .catch(error => {
      throw adaptError(error);
    });

export default postPaymentIntentInstrument;
