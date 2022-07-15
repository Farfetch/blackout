import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrderItemAvailableActivities } from './types';

/**
 * Method responsible for fetching the activities that are available for the order
 * item.
 *
 * @param orderId - The identifier of the order.
 * @param itemId  - The identifier of the item.
 * @param config  - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getOrderItemAvailableActivities: GetOrderItemAvailableActivities =
  (orderId, itemId, config) =>
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
