import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostCharges } from './types';

/**
 * @typedef {object} ChargeOrderRequest
 * @property {string} redirectUrl - Url to redirect to an external page to complete the payment.
 * @property {string} returnUrl - After the customer completes the payment, ask the payment service to redirect the browser of the customer to this URL..
 * @property {string} cancelUrl - If the customer cancels the payment, ask the payment service to redirect the browser of the customer to this URL.
 */

/**
 * @typedef {object} PostChargesData
 *
 * @alias PostChargesData
 * @memberof module:checkout/client
 *
 * @property {ChargeOrderRequest} chargeOrderRequest - Required information to charge an order.
 */

/**
 * Method responsible for creating an order charge.
 *
 * @function postCharges
 * @memberof module:checkout/client
 *
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {PostChargesData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postCharges: PostCharges = (id, data, config) =>
  client
    .post(join('/checkout/v1/orders', id, 'charges'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postCharges;
