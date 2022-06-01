import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetInstrument } from './types';

/**
 * Method responsible for fetching an instrument.
 *
 * @param id           - Id of the payment intent.
 * @param instrumentId - Id of the payment instrument.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getInstrument: GetInstrument = (id, instrumentId, config) =>
  client
    .get(join('/payment/v1/intents', id, 'instruments', instrumentId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getInstrument;
