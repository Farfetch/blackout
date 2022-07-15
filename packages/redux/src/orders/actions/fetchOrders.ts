import { fetchOrdersFactory } from './factories';
import { getOrders } from '@farfetch/blackout-client/orders';

/**
 * Fetch orders.
 */
export const fetchOrders = fetchOrdersFactory(getOrders);
