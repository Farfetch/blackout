import { fetchPaymentIntentChargeFactory } from './factories';
import { getPaymentIntentCharge } from '@farfetch/blackout-client';

/**
 * Fetch payment intent charge.
 */
export default fetchPaymentIntentChargeFactory(getPaymentIntentCharge);
