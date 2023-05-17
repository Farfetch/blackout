import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetOrderAvailableItemsActivities } from './types/index.js';

/**
 * Method responsible for fetching the activities that are available for each item
 * in the order.
 *
 * @param orderId - The identifier of the order.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getOrderAvailableItemsActivities: GetOrderAvailableItemsActivities = (
  orderId,
  config,
) =>
  client
    .get(
      join('/account/v1/orders', orderId, 'availableItemsActivities'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getOrderAvailableItemsActivities;
