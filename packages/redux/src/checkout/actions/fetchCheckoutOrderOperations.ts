import { getCheckoutOrderOperations } from '@farfetch/blackout-client';
import fetchCheckoutOrderOperationsFactory from './factories/fetchCheckoutOrderOperationsFactory.js';

/**
 * Fetch checkout order operations.
 */
export default fetchCheckoutOrderOperationsFactory(getCheckoutOrderOperations);
