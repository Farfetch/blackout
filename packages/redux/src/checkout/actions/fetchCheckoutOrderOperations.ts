import { getOperations } from '@farfetch/blackout-client/checkout';
import fetchCheckoutOrderOperationsFactory from './factories/fetchCheckoutOrderOperationsFactory';

/**
 * Fetch checkout order operations.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchCheckoutOrderOperations
 *
 * @type {FetchCheckoutOrderOperationsThunkFactory}
 */
export default fetchCheckoutOrderOperationsFactory(getOperations);
