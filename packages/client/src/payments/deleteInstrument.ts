import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteInstrument } from './types';

/**
 * Method responsible for deleting an instrument.
 *
 * @function deleteInstrument
 * @memberof module:payments/client
 *
 * @param {string} id           - Id of the payment intent.
 * @param {string} instrumentId - Id of the payment instrument.
 * @param {object} [config]     - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
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
