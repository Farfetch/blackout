import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Obtains all the intent instruments that will process on demand.
 *
 * @function getInstruments
 * @memberof module:payments/client
 *
 * @param {string} id - Id of the payment Intent.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, config) =>
  client
    .get(join('/payment/v1/intents', id, 'instruments'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
