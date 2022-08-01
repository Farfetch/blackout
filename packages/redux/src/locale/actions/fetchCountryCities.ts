import { fetchCountryCitiesFactory } from './factories';
import { getCountryCities } from '@farfetch/blackout-client';

/**
 * Fetch all cities from an specific country and state.
 *
 * @param getCountryCities - Get product recommendations client.
 */
export default fetchCountryCitiesFactory(getCountryCities);
