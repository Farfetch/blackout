import { fetchSizeScalesFactory } from './factories/index.js';
import { getSizeScales } from '@farfetch/blackout-client';

/**
 * Fetches size scales.
 */
export default fetchSizeScalesFactory(getSizeScales);
