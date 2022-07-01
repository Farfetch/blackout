import { fetchOrdersFactory } from './factories';
import { getOrders } from '@farfetch/blackout-client';

/**
 * Fetch orders.
 */
export default fetchOrdersFactory(getOrders);
