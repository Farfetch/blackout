import { fetchCheckoutOrderChargeFactory } from './factories/index.js';
import { getCheckoutOrderCharge } from '@farfetch/blackout-client';

/**
 * Fetch checkout order charge.
 */
export default fetchCheckoutOrderChargeFactory(getCheckoutOrderCharge);
