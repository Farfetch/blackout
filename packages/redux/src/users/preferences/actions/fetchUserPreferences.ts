import { fetchUserPreferencesFactory } from './factories/index.js';
import { getUserPreferences } from '@farfetch/blackout-client';

/**
 * Fetch the user preferences.
 */
export default fetchUserPreferencesFactory(getUserPreferences);
