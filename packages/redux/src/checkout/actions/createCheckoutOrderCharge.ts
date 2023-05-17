import { createCheckoutOrderChargeFactory } from './factories/index.js';
import { postCheckoutOrderCharge } from '@farfetch/blackout-client';

/**
 * Charge checkout order.
 */
export default createCheckoutOrderChargeFactory(postCheckoutOrderCharge);
