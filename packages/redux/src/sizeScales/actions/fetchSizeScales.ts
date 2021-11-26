import { fetchSizeScalesFactory } from './factories';
import { getSizeScales } from '@farfetch/blackout-client/sizeScales';

/**
 * Fetches size scales.
 *
 * @memberof module:sizeScales/actions
 * @name fetchSizeScales
 * @type {FetchSizeScalesThunkFactory}
 */
export default fetchSizeScalesFactory(getSizeScales);
