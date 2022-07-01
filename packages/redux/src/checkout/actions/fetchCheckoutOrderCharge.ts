import { fetchCheckoutOrderChargeFactory } from './factories';
import { getCheckoutOrderCharge } from '@farfetch/blackout-client';

/**
 * Fetch charges checkout.
 */
export default fetchCheckoutOrderChargeFactory(getCheckoutOrderCharge);
