import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PutPaymentIntentInstrument } from './types';

/**
 * Method responsible for updating an instrument.
 *
 * @param intentId           - Id of the payment intent.
 * @param instrumentId       - Id of the payment instrument.
 * @param data               - Request data.
 * @param config             - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putPaymentIntentInstrument: PutPaymentIntentInstrument = (
  intentId,
  instrumentId,
  data,
  config,
) =>
  client
    .put(
      join('/payment/v1/intents', intentId, 'instruments', instrumentId),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putPaymentIntentInstrument;
