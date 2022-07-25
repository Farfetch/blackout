import { createCheckoutOrderChargeFactory } from './factories';
import { postCheckoutOrderCharge } from '@farfetch/blackout-client';

/**
 * Charge checkout.
 */
export default createCheckoutOrderChargeFactory(postCheckoutOrderCharge);
