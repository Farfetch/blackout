import { fetchOrderFactory } from './factories';
import { getOrder } from '@farfetch/blackout-client';

/**
 * Fetch order details.
 */
export default fetchOrderFactory(getOrder);
