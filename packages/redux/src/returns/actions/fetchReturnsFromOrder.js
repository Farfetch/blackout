import { fetchReturnsFromOrderFactory } from './factories';
import { getReturnsFromOrder } from '@farfetch/blackout-client/returns';

/**
 * Get return from order.
 *
 * @memberof module:returns/actions
 *
 * @name getReturnsFromOrder
 *
 * @type {GetReturnsFromOrderThunkFactory}
 */
export default fetchReturnsFromOrderFactory(getReturnsFromOrder);
