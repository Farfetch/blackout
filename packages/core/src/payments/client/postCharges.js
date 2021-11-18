import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PostChargesData
 *
 * @alias PostChargesData
 * @memberof module:payments/client
 *
 * @property {string} returnUrl - After the customer completes the payment,
 * ask the payment service to redirect the browser of the customer to this URL.
 * @property {string} cancelUrl - If the customer cancels the payment,
 * ask the payment service to redirect the browser of the customer to this URL.
 */

/**
 * Method responsible for creating an intent charge.
 *
 * @function postCharges
 * @memberof module:payments/client
 *
 * @param {string} id - Numeric identifier of the payment intent.
 * @param {PostChargesData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, data, config) =>
  client
    .post(join('/payment/v1/intents', id, 'charges'), data, config)
    .then(response => response)
    .catch(error => {
      throw adaptError(error);
    });
