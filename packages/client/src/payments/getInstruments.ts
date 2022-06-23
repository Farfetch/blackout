import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetInstruments } from './types';

/**
 * Obtains all the intent instruments that will process on demand.
 *
 * @param id     - Id of the payment intent.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getInstruments: GetInstruments = (id, config) =>
  client
    .get(join('/payment/v1/intents', id, 'instruments'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getInstruments;
