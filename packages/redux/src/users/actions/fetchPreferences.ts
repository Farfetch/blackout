import { fetchPreferencesFactory } from './factories';
import { getUserPreferences } from '@farfetch/blackout-client/users';

/**
 * Fetch the user preferences.
 */
export default fetchPreferencesFactory(getUserPreferences);
