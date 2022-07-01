import { createCheckoutOrderChargeFactory } from './factories';
import { postCheckoutOrderCharges } from '@farfetch/blackout-client';

/**
 * Charge checkout.
 */
export default createCheckoutOrderChargeFactory(postCheckoutOrderCharges);
