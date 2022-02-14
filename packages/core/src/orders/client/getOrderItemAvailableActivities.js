import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching the activities that are available for the order item.
 *
 * @function getOrderItemAvailableActivities
 * @memberof module:orders/client
 * @param {object} props - Props object.
 * @param {string} props.orderId - The identifier of the order.
 * @param {string} props.itemId - The identifier of the item.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ orderId, itemId }, config) =>
  client
    .get(
      join(
        '/account/v1/orders',
        orderId,
        'items',
        itemId,
        'availableActivities',
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
