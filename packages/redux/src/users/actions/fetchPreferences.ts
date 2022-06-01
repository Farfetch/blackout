import { fetchPreferencesFactory } from './factories';
import { getPreferences } from '@farfetch/blackout-client/users';

/**
 * Fetch the user preferences.
 */
export default fetchPreferencesFactory(getPreferences);
