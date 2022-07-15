import { fetchOrderItemAvailableActivitiesFactory } from './factories';
import { getOrderItemAvailableActivities } from '@farfetch/blackout-client/orders';

/**
 * Fetch available activities of a certain order item.
 */
export const fetchOrderItemAvailableActivities =
  fetchOrderItemAvailableActivitiesFactory(getOrderItemAvailableActivities);
