import { fetchChargeFactory } from './factories';
import { getCheckoutOrderCharge } from '@farfetch/blackout-client/checkout';

/**
 * Fetch charges checkout.
 */
export default fetchChargeFactory(getCheckoutOrderCharge);
