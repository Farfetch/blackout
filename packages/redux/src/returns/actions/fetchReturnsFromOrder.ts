import { fetchReturnsFromOrderFactory } from './factories';
import { getReturnsFromOrder } from '@farfetch/blackout-client/returns';

/**
 * Fetch returns from a specific order.
 */
export const fetchReturnsFromOrder =
  fetchReturnsFromOrderFactory(getReturnsFromOrder);
