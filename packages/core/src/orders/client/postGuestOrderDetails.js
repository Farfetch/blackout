import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} Data
 *
 * @property {string} guestUserEmail - Guest user email.
 */

/**
 * Method responsible for fetching the details of a guest user order.
 *
 * @function postGuestOrderDetails
 * @memberof module:orders/client
 *
 * @param {string} orderId - The orderID to get the details.
 * @param {Data} data - Guest orders request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (orderId, data, config) =>
  client
    .post(join('/legacy/v1/guestorders', orderId), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
