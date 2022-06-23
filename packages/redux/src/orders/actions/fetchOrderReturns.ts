import { fetchOrderReturnsFactory } from './factories';
import { getOrderReturns } from '@farfetch/blackout-client';

/**
 * Fetch returns from a specific order.
 */
export default fetchOrderReturnsFactory(getOrderReturns);
