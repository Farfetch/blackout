import { fetchOrderDetailsFactory } from './factories';
import { getOrderDetails } from '@farfetch/blackout-client/orders';

/**
 * Fetch order details.
 */
export default fetchOrderDetailsFactory(getOrderDetails);
