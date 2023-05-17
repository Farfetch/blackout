import { fetchOrderFactory } from './factories/index.js';
import { getOrder } from '@farfetch/blackout-client';

/**
 * Fetch order details.
 */
export default fetchOrderFactory(getOrder);
