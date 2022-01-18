import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching the order return options.
 *
 * @function getOrderReturnOptions
 * @memberof module:orders/client
 *
 * @param {string} orderId - The orderID.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (orderId, config) =>
  client
    .get(join('/legacy/v1/orders', orderId, 'returnoptions'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
