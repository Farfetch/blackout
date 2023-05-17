import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetPaymentIntentCharge } from './types/index.js';

/**
 * Gets the payment intent charge.
 *
 * @param paymentIntentId - Id of the payment intent.
 * @param chargeId        - Id of the intent charge.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentIntentCharge: GetPaymentIntentCharge = (
  paymentIntentId,
  chargeId,
  config,
) =>
  client
    .get(
      join('/payment/v1/intents', paymentIntentId, 'charges', chargeId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentIntentCharge;
