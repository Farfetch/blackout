import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PutPaymentIntentInstrument } from './types/index.js';

/**
 * Method responsible for updating an instrument.
 *
 * @param paymentIntentId      - Id of the payment intent.
 * @param paymentInstrumentId  - Id of the payment instrument.
 * @param data                 - Request data.
 * @param config               - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putPaymentIntentInstrument: PutPaymentIntentInstrument = (
  paymentIntentId,
  paymentInstrumentId,
  data,
  config,
) =>
  client
    .put(
      join(
        '/payment/v1/intents',
        paymentIntentId,
        'instruments',
        paymentInstrumentId,
      ),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putPaymentIntentInstrument;
