import { fetchSizeScaleMappingsFactory } from './factories';
import { getSizeScaleMappings } from '@farfetch/blackout-client';

/**
 * Fetches size scale mappings.
 */

export default fetchSizeScaleMappingsFactory(getSizeScaleMappings);
