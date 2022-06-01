import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutInstruments } from './types';

/**
 * Method responsible for updating an instrument.
 *
 * @param id           - Id of the payment intent.
 * @param instrumentId - Id of the payment instrument.
 * @param data         - Request data.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putInstruments: PutInstruments = (id, instrumentId, data, config) =>
  client
    .put(
      join('/payment/v1/intents', id, 'instruments', instrumentId),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putInstruments;
