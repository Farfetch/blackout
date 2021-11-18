import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for getting the orderCharge.
 *
 * @function getCharges
 * @memberof module:checkout/client
 *
 * @param {string} id - Numeric identifier of the checkout order.
 * @param {string} chargeId - Alphanumeric guid of the charge.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, chargeId, config) =>
  client
    .get(join('/checkout/v1/orders', id, 'charges', chargeId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
