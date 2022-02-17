import { addOrderItemActivitiesFactory } from './factories';
import { postOrderItemActivities } from '@farfetch/blackout-client/orders';

/**
 * Fetch available activities of a certain order item.
 *
 * @memberof module:orders/actions
 *
 * @name getOrderItemAvailableActivities
 *
 * @type {GetOrderItemAvailableActivitiesThunkFactory}
 */
export default addOrderItemActivitiesFactory(postOrderItemActivities);
