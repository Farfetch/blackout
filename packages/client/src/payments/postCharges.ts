import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostCharges } from './types';

/**
 * @typedef {object} PostChargesData
 *
 * @alias PostChargesData
 * @memberof module:payments/client
 *
 * @property {object} charge - Charge intent data.
 */

/**
 * Method responsible for creating an intent charge.
 *
 * @function postCharges
 * @memberof module:payments/client
 *
 * @param {string} id            - Id of the payment intent.
 * @param {PostChargesData} data - Request data.
 * @param {object} [config]      - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postCharges: PostCharges = (id, data, config) =>
  client
    .post(join('/payment/v1/intents', id, 'charges'), data, config)
    .then(response => response)
    .catch(error => {
      throw adaptError(error);
    });

export default postCharges;
