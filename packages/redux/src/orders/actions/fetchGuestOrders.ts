import { fetchGuestOrdersFactory } from './factories/index.js';
import { getGuestOrders } from '@farfetch/blackout-client';

/**
 * Fetch guest user orders.
 */
export default fetchGuestOrdersFactory(getGuestOrders);
