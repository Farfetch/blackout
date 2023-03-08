import { createPaymentIntentChargeFactory } from './factories/index.js';
import { postPaymentIntentCharge } from '@farfetch/blackout-client';

/**
 * Payments charge. To be used by pay-by-link 1.5 only.
 */
export default createPaymentIntentChargeFactory(postPaymentIntentCharge);
