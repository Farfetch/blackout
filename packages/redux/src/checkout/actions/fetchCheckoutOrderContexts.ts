import { fetchCheckoutOrderContextsFactory } from './factories/index.js';
import { getCheckoutOrderContexts } from '@farfetch/blackout-client';

/**
 * Fetch checkout order contexts.
 */
export default fetchCheckoutOrderContextsFactory(getCheckoutOrderContexts);
