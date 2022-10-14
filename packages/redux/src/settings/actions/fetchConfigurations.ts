import { fetchConfigurationsFactory } from './factories';
import { getConfigurations } from '@farfetch/blackout-client';
/**
 * Fetches configurations.
 */
export default fetchConfigurationsFactory(getConfigurations);
