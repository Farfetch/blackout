import { fetchUserOrdersFactory } from './factories';
import { getUserOrders } from '@farfetch/blackout-client';

/**
 * Fetch user orders.
 */
export default fetchUserOrdersFactory(getUserOrders);
