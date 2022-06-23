import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteInstrument } from './types';

/**
 * Method responsible for deleting an instrument.
 *
 * @param id           - Id of the payment intent.
 * @param instrumentId - Id of the payment instrument.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteInstrument: DeleteInstrument = (id, instrumentId, config) =>
  client
    .delete(
      join('/payment/v1/intents', id, 'instruments', instrumentId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteInstrument;
