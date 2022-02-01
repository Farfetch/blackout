import { fetchOrdersFactory } from './factories';
import { getOrders } from '@farfetch/blackout-client/orders';

/**
 * Fetch orders.
 *
 * @memberof module:orders/actions
 *
 * @name getOrders
 *
 * @type {GetOrdersThunkFactory}
 */
export default fetchOrdersFactory(getOrders);
