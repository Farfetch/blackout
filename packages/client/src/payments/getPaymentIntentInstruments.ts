import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetPaymentIntentInstruments } from './types';

/**
 * Obtains all the intent instruments that will process on demand.
 *
 * @param intentId     - Id of the payment intent.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentIntentInstruments: GetPaymentIntentInstruments = (
  intentId,
  config,
) =>
  client
    .get(join('/payment/v1/intents', intentId, 'instruments'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentIntentInstruments;
