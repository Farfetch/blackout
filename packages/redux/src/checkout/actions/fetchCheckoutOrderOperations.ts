import { getCheckoutOrderOperations } from '@farfetch/blackout-client';
import fetchCheckoutOrderOperationsFactory from './factories/fetchCheckoutOrderOperationsFactory';

/**
 * Fetch checkout order operations.
 *
 */
export default fetchCheckoutOrderOperationsFactory(getCheckoutOrderOperations);
