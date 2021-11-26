import { fetchSizeScaleMappingsFactory } from './factories';
import { getSizeScaleMappings } from '@farfetch/blackout-client/sizeScales';

/**
 * Fetches size scale mappings.
 *
 * @memberof module:sizeScales/actions
 * @name fetchSizeScaleMappings
 * @type {FetchSizeScaleMappingsThunkFactory}
 */

export default fetchSizeScaleMappingsFactory(getSizeScaleMappings);
