import { fetchConfigurationFactory } from './factories';
import { getConfiguration } from '@farfetch/blackout-client';
/**
 * Fetches configuration.
 */
export default fetchConfigurationFactory(getConfiguration);
