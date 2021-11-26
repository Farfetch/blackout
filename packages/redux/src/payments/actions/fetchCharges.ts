import { fetchChargesFactory } from './factories';
import { getCharges } from '@farfetch/blackout-client/payments';

/**
 * Fetch charges.
 *
 * @memberof module:payments/actions
 *
 * @name fetchCharges
 *
 * @type {FetchChargesThunkFactory}
 */
export default fetchChargesFactory(getCharges);
