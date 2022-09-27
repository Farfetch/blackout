import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PostOrderItemActivity } from './types';

/**
 * Method responsible for creating an activity to perform on the order item.
 *
 * @param orderId - The identifier of the order.
 * @param itemId  - The identifier of the item.
 * @param data    - Request data.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postOrderItemActivities: PostOrderItemActivity = (
  orderId,
  itemId,
  data,
  config,
) =>
  client
    .post(
      join('/account/v1/orders', orderId, 'items', itemId, 'activities'),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default postOrderItemActivities;
