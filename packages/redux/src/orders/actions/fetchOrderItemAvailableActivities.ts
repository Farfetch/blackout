import { fetchOrderItemAvailableActivitiesFactory } from './factories';
import { getOrderItemAvailableActivities } from '@farfetch/blackout-client/orders';

/**
 * Fetch available activities of a certain order item.
 *
 * @memberof module:orders/actions
 *
 * @name getOrderItemAvailableActivities
 *
 * @type {GetOrderItemAvailableActivitiesThunkFactory}
 */
export default fetchOrderItemAvailableActivitiesFactory(
  getOrderItemAvailableActivities,
);
