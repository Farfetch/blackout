import { getCheckoutOrderOperation } from '@farfetch/blackout-client';
import fetchCheckoutOrderOperationFactory from './factories/fetchCheckoutOrderOperationFactory';

/**
 * Fetch checkout order operation.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchCheckoutOrderOperation
 *
 * @type {FetchCheckoutOrderOperationThunkFactory}
 */
export default fetchCheckoutOrderOperationFactory(getCheckoutOrderOperation);
