import { fetchOrderReturnsFactory } from './factories/index.js';
import { getOrderReturns } from '@farfetch/blackout-client';

/**
 * Fetch returns from a specific order.
 */
export default fetchOrderReturnsFactory(getOrderReturns);
