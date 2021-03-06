import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PostOrderItemActivityData
 *
 * @alias PostOrderItemActivityData
 * @memberof module:orders/client
 *
 * @property {string} type - Type of activity.
 */

/**
 * Method responsible for creating an activity to perform on the order item.
 *
 * @function postOrderItemActivities
 * @memberof module:orders/client
 * @param {object} props - Props object.
 * @param {string} props.orderId - The identifier of the order.
 * @param {string} props.itemId - The identifier of the item.
 * @param {PostOrderItemActivityData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ orderId, itemId }, data, config) =>
  client
    .post(
      join(
        '/account/v1/orders',
        orderId,
        'items',
        itemId,
        'availableActivities',
      ),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
