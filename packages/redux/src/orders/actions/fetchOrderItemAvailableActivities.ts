import { fetchOrderItemAvailableActivitiesFactory } from './factories/index.js';
import { getOrderItemAvailableActivities } from '@farfetch/blackout-client';

/**
 * Fetch available activities of a certain order item.
 */
export default fetchOrderItemAvailableActivitiesFactory(
  getOrderItemAvailableActivities,
);
