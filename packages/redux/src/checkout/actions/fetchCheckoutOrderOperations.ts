import { getCheckoutOrderOperations } from '@farfetch/blackout-client';
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
export default fetchCheckoutOrderOperationsFactory(getCheckoutOrderOperations);
