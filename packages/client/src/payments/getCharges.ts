import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetCharges } from './types';

/**
 * Gets the payment intent charges.
 *
 * @function getCharges
 * @memberof module:payments/client
 *
 * @param {string} id       - Id of the payment intent.
 * @param {string} chargeId - Id of the intent charge.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getCharges: GetCharges = (id, chargeId, config) =>
  client
    .get(join('/payment/v1/intents', id, 'charges', chargeId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCharges;
