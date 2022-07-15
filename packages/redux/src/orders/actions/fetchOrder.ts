import { fetchOrderFactory } from './factories';
import { getOrder } from '@farfetch/blackout-client/orders';

/**
 * Fetch order details.
 */
export const fetchOrder = fetchOrderFactory(getOrder);
