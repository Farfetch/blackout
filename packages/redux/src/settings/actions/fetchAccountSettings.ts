import { fetchAccountSettingsFactory } from './factories/index.js';
import { getAccountSettings } from '@farfetch/blackout-client';

/**
 * Fetches account settings.
 */
export default fetchAccountSettingsFactory(getAccountSettings);
