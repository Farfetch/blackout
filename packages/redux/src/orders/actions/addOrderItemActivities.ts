import { addOrderItemActivitiesFactory } from './factories';
import { postOrderItemActivities } from '@farfetch/blackout-client/orders';

/**
 * Fetch available activities of a certain order item.
 */
export const addOrderItemActivities = addOrderItemActivitiesFactory(
  postOrderItemActivities,
);
