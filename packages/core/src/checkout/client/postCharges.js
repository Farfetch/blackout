import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PostChargesData
 *
 * @alias PostChargesData
 * @memberof module:checkout/client
 *
 * @property {object} chargeTransaction - Charge transaction data.
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
export default (id, data, config) =>
  client
    .post(join('/checkout/v1/orders', id, 'charges'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
