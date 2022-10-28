import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { DeletePaymentIntentInstrument } from './types';

/**
 * Method responsible for deleting an instrument.
 *
 * @param paymentIntentId      - Id of the payment intent.
 * @param paymentInstrumentId  - Id of the payment instrument.
 * @param config               - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deletePaymentIntentInstrument: DeletePaymentIntentInstrument = (
  paymentIntentId,
  paymentInstrumentId,
  config,
) =>
  client
    .delete(
      join(
        '/payment/v1/intents',
        paymentIntentId,
        'instruments',
        paymentInstrumentId,
      ),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deletePaymentIntentInstrument;
