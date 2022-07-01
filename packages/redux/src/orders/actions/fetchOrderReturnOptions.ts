import { fetchOrderReturnOptionsFactory } from './factories';
import { getOrderReturnOptions } from '@farfetch/blackout-client';

/**
 * Fetch order return options.
 */
export default fetchOrderReturnOptionsFactory(getOrderReturnOptions);
