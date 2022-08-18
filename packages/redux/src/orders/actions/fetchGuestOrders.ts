import { fetchGuestOrdersFactory } from './factories';
import { getGuestOrders } from '@farfetch/blackout-client';

/**
 * Fetch guest user orders.
 */
export default fetchGuestOrdersFactory(getGuestOrders);
