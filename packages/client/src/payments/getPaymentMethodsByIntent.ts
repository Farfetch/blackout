import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetPaymentMethodsByIntent } from './types/index.js';

/**
 * Method responsible for fetching payment methods available for given intent id.
 *
 * @param paymentIntentId - Id of the payment Intent.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentMethodsByIntent: GetPaymentMethodsByIntent = (
  paymentIntentId,
  config,
) =>
  client
    .get(join('/payment/v1/intents', paymentIntentId, 'paymentmethods'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentMethodsByIntent;
