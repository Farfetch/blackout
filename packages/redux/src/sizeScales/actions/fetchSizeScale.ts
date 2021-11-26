import { fetchSizeScaleFactory } from './factories';
import { getSizeScale } from '@farfetch/blackout-client/sizeScales';

/**
 * Fetches a specific product size scale for a given size scale id.
 *
 * @memberof module:sizeScales/actions
 * @name fetchSizeScale
 * @type {FetchSizeScaleThunkFactory}
 */
export default fetchSizeScaleFactory(getSizeScale);
