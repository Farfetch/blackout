import { fetchCheckoutOrderContextFactory } from './factories/index.js';
import { getCheckoutOrderContext } from '@farfetch/blackout-client';

/**
 * Fetch checkout order context.
 */
export default fetchCheckoutOrderContextFactory(getCheckoutOrderContext);
