import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrderAvailableItemsActivities } from './types';

/**
 * Method responsible for fetching the activities that are available for each item
 * in the order.
 *
 * @param id      - The identifier of the order.
 * @param orderId -
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
