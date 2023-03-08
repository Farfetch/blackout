import { fetchConfigurationsFactory } from './factories/index.js';
import { getConfigurations } from '@farfetch/blackout-client';

/**
 * Fetches configurations.
 */
export default fetchConfigurationsFactory(getConfigurations);
