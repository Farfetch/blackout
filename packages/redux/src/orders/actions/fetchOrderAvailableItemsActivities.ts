import { fetchOrderAvailableItemsActivitiesFactory } from './factories';
import { getOrderAvailableItemsActivities } from '@farfetch/blackout-client';

/**
 * Fetch available items activities of a certain order.
 */
export default fetchOrderAvailableItemsActivitiesFactory(
  getOrderAvailableItemsActivities,
);
