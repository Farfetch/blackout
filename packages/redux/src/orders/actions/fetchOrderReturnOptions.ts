import { fetchOrderReturnOptionsFactory } from './factories';
import { getOrderReturnOptions } from '@farfetch/blackout-client/orders';

/**
 * Fetch order return options.
 *
 * @memberof module:orders/actions
 *
 * @name getOrderReturnOptions
 *
 * @type {GetOrderReturnOptionsThunkFactory}
 */
export default fetchOrderReturnOptionsFactory(getOrderReturnOptions);
