import { fetchUserOrdersFactory } from './factories/index.js';
import { getUserOrders } from '@farfetch/blackout-client';

/**
 * Fetches user orders paginated. If you want to fetch all user orders,
 * pass on either `page` or `pageSize` properties of the `query` parameter
 * the value `Infinity`.
 */
export default fetchUserOrdersFactory(getUserOrders);
