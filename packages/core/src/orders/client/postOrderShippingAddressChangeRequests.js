import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for change the shipping address of the order.
 *
 * @function postOrderShippingAddressChangeRequests
 * @memberof module:orders/client
 *
 * @param {string} orderId - The orderID to get the details.
 * @param {object} data - The change of the shipping address.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (orderId, data, config) =>
  client
    .post(
      join('/account/v1/orders', orderId, 'shippingAddressChangeRequests'),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
