import { createCheckoutOrderContextFactory } from './factories/index.js';
import { postCheckoutOrderContext } from '@farfetch/blackout-client';

/**
 * Create checkout order context.
 */
export default createCheckoutOrderContextFactory(postCheckoutOrderContext);
