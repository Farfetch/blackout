import { putUserPreferences } from '@farfetch/blackout-client/users';
import { setPreferencesFactory } from './factories';

/**
 * Updates the user preferences.
 */
export default setPreferencesFactory(putUserPreferences);
