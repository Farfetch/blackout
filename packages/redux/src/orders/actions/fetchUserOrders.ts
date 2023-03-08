import { fetchUserOrdersFactory } from './factories/index.js';
import { getUserOrders } from '@farfetch/blackout-client';

/**
 * Fetch user orders.
 */
export default fetchUserOrdersFactory(getUserOrders);
