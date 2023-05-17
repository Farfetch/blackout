import { getCheckoutOrderOperation } from '@farfetch/blackout-client';
import fetchCheckoutOrderOperationFactory from './factories/fetchCheckoutOrderOperationFactory.js';

/**
 * Fetch checkout order operation.
 */
export default fetchCheckoutOrderOperationFactory(getCheckoutOrderOperation);
