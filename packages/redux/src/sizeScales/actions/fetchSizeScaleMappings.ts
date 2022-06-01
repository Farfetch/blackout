import { fetchSizeScaleMappingsFactory } from './factories';
import { getSizeScaleMappings } from '@farfetch/blackout-client/sizeScales';

/**
 * Fetches size scale mappings.
 */

export default fetchSizeScaleMappingsFactory(getSizeScaleMappings);
