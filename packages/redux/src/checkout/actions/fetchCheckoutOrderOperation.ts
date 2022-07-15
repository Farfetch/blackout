import { getCheckoutOrderOperation } from '@farfetch/blackout-client';
import fetchCheckoutOrderOperationFactory from './factories/fetchCheckoutOrderOperationFactory';

/**
 * Fetch checkout order operation.
 *
 */
export default fetchCheckoutOrderOperationFactory(getCheckoutOrderOperation);
