import { fetchOrderDetailsFactory } from './factories';
import { getOrderDetails } from '@farfetch/blackout-client/orders';

/**
 * Fetch order details.
 *
 * @memberof module:orders/actions
 *
 * @name getOrderDetails
 *
 * @type {GetOrderDetailsThunkFactory}
 */
export default fetchOrderDetailsFactory(getOrderDetails);
