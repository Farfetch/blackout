import { fetchOrderDetailsFactory } from './factories';
import { getOrderDetails } from '@farfetch/blackout-client';

/**
 * Fetch order details.
 */
export default fetchOrderDetailsFactory(getOrderDetails);
