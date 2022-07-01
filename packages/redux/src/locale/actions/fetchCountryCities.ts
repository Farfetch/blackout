import { fetchCountryCitiesFactory } from './factories';
import { getCountryCities } from '@farfetch/blackout-client';

/**
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find the cities related.
 * @param stateId     - State identifier to find the cities related.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all cities from an specific country and state.
 *
 * @param getCountryCities - Get product recommendations client.
 */

export default fetchCountryCitiesFactory(getCountryCities);
