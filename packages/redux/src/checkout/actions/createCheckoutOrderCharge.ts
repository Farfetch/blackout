import { createCheckoutOrderChargeFactory } from './factories';
import { postCheckoutOrderCharge } from '@farfetch/blackout-client';

/**
 * Charge checkout order.
 */
export default createCheckoutOrderChargeFactory(postCheckoutOrderCharge);
