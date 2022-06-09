import { getOperation } from '@farfetch/blackout-client/checkout';
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
export default fetchCheckoutOrderOperationFactory(getOperation);
