import { fetchChargesFactory } from './factories';
import { getCharges } from '@farfetch/blackout-client/payments';

/**
 * Fetch charges.
 */
export default fetchChargesFactory(getCharges);
