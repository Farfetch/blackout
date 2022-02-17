import { fetchOrderAvailableItemsActivitiesFactory } from './factories';
import { getOrderAvailableItemsActivities } from '@farfetch/blackout-client/orders';

/**
 * Fetch available items activities of a certain order.
 *
 * @memberof module:orders/actions
 *
 * @name getOrderAvailableItemsActivities
 *
 * @type {GetOrderAvailableItemsActivitiesThunkFactory}
 */
export default fetchOrderAvailableItemsActivitiesFactory(
  getOrderAvailableItemsActivities,
);
