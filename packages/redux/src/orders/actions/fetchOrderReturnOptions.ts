import { fetchOrderReturnOptionsFactory } from './factories/index.js';
import { getOrderReturnOptions } from '@farfetch/blackout-client';

/**
 * Fetch order return options.
 */
export default fetchOrderReturnOptionsFactory(getOrderReturnOptions);
