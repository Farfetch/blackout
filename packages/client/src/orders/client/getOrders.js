import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching orders.
 *
 * @function getOrders
 * @memberof module:orders/client
 *
 * @param {object} props - Properties for getting the orders.
 * @param {object} props.userId - The current user id.
 * @param {object} props.query - Pagination information. Possible values: "page", "pageSize".
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ userId, query }, config) =>
  client
    .get(
      join('/account/v1/users/', userId, 'orders', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
