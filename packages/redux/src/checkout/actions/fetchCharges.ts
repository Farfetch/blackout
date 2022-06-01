import { fetchChargesFactory } from './factories';
import { getCharges } from '@farfetch/blackout-client/checkout';

/**
 * Fetch charges checkout.
 */
export default fetchChargesFactory(getCharges);
