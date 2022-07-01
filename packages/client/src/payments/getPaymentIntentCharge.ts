import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetPaymentIntentCharge } from './types';

/**
 * Gets the payment intent charge.
 *
 * @param intentId       - Id of the payment intent.
 * @param chargeId       - Id of the intent charge.
 * @param config         - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentIntentCharge: GetPaymentIntentCharge = (
  intentId,
  chargeId,
  config,
) =>
  client
    .get(join('/payment/v1/intents', intentId, 'charges', chargeId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentIntentCharge;
