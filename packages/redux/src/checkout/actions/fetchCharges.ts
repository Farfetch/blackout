import { fetchChargesFactory } from './factories';
import { getCharges } from '@farfetch/blackout-client/checkout';

/**
 * Fetch charges checkout.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchCharges
 *
 * @type {FetchChargesThunkFactory}
 */
export default fetchChargesFactory(getCharges);
