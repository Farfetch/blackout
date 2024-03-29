import { fetchMerchantsLocationsFactory } from './factories/index.js';
import { getMerchantsLocations } from '@farfetch/blackout-client';

/**
 * Fetches merchants locations for the given merchant, merchantLocation and/or
 * country ids.
 */
export default fetchMerchantsLocationsFactory(getMerchantsLocations);
