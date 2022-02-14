import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching the activities that are available for each item in the order.
 *
 * @function getOrderAvailableItemsActivities
 * @memberof module:orders/client
 * @param {object} props - Props object.
 * @param {string} props.orderId - The identifier of the order.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ orderId }, config) =>
  client
    .get(
      join('/account/v1/orders', orderId, 'availableItemsActivities'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
