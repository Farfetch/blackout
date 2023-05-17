import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetPaymentIntentInstruments } from './types/index.js';

/**
 * Obtains all the intent instruments that will process on demand.
 *
 * @param paymentIntentId - Id of the payment intent.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentIntentInstruments: GetPaymentIntentInstruments = (
  paymentIntentId,
  config,
) =>
  client
    .get(join('/payment/v1/intents', paymentIntentId, 'instruments'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentIntentInstruments;
