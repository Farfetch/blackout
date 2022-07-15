import { fetchOrderReturnOptionsFactory } from './factories';
import { getOrderReturnOptions } from '@farfetch/blackout-client/orders';

/**
 * Fetch order return options.
 */
export const fetchOrderReturnOptions = fetchOrderReturnOptionsFactory(
  getOrderReturnOptions,
);
