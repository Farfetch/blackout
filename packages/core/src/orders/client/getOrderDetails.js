import adaptOrderDetails from './helpers/adaptOrderDetails';
import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching the details of an order.
 *
 * @function getOrderDetails
 * @memberof module:orders/client
 *
 * @param {string} orderId - The orderID to get the details.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (orderId, config) =>
  client
    .get(join('/account/v1/orders', orderId), config)
    .then(response => adaptOrderDetails(response.data))
    .catch(error => {
      throw adaptError(error);
    });
