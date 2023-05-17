import { fetchPaymentIntentChargeFactory } from './factories/index.js';
import { getPaymentIntentCharge } from '@farfetch/blackout-client';

/**
 * Fetch payment intent charge.
 */
export default fetchPaymentIntentChargeFactory(getPaymentIntentCharge);
