import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching an instrument.
 *
 * @function getInstrument
 * @memberof module:payments/client
 *
 * @param {string} intentId - Id of the payment Intent.
 * @param {string} instrumentId - Id of the payment Instrument.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (intentId, instrumentId, config) =>
  client
    .get(
      join('/payment/v1/intents', intentId, 'instruments', instrumentId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
