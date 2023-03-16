import { fetchSizeScaleFactory } from './factories/index.js';
import { getSizeScale } from '@farfetch/blackout-client';

/**
 * Fetches a specific product size scale for a given size scale id.
 */
export default fetchSizeScaleFactory(getSizeScale);
