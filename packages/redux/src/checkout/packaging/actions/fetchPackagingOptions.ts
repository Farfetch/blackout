import { fetchPackagingOptionsFactory } from './factories/index.js';
import { getPackagingOptions } from '@farfetch/blackout-client';

/**
 * Fetch all packaging options.
 */
export default fetchPackagingOptionsFactory(getPackagingOptions);
