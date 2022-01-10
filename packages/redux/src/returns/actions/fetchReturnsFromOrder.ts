import { fetchReturnsFromOrderFactory } from './factories';
import { getReturnsFromOrder } from '@farfetch/blackout-client/returns';

/**
 * Fetch returns from a specific order.
 *
 * @memberof module:returns/actions
 *
 * @function fetchReturnsFromOrder
 *
 * @type {FetchReturnsFromOrderThunkFactory}
 */
export default fetchReturnsFromOrderFactory(getReturnsFromOrder);
