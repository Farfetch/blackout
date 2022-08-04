import { fetchCheckoutOrderChargeFactory } from './factories';
import { getCheckoutOrderCharge } from '@farfetch/blackout-client';

/**
 * Fetch checkout order charge.
 */
export default fetchCheckoutOrderChargeFactory(getCheckoutOrderCharge);
