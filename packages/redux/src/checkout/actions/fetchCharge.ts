import { fetchChargeFactory } from './factories';
import { getCheckoutOrderCharge } from '@farfetch/blackout-client';

/**
 * Fetch charges checkout.
 */
export default fetchChargeFactory(getCheckoutOrderCharge);
