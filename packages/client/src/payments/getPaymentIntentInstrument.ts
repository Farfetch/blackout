import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetPaymentIntentInstrument } from './types/index.js';

/**
 * Method responsible for fetching an instrument.
 *
 * @param paymentIntentId           - Id of the payment intent.
 * @param paymentInstrumentId       - Id of the payment instrument.
 * @param config             - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentIntentInstrument: GetPaymentIntentInstrument = (
  paymentIntentId,
  paymentInstrumentId,
  config,
) =>
  client
    .get(
      join(
        '/payment/v1/intents',
        paymentIntentId,
        'instruments',
        paymentInstrumentId,
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentIntentInstrument;
