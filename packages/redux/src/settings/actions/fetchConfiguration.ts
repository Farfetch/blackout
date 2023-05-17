import { fetchConfigurationFactory } from './factories/index.js';
import { getConfiguration } from '@farfetch/blackout-client';

/**
 * Fetches configuration.
 */
export default fetchConfigurationFactory(getConfiguration);
