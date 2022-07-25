import { fetchUserPreferencesFactory } from './factories';
import { getUserPreferences } from '@farfetch/blackout-client';

/**
 * Fetch the user preferences.
 */
export default fetchUserPreferencesFactory(getUserPreferences);
