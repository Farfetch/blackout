import { putUserPreferences } from '@farfetch/blackout-client';
import { setUserPreferencesFactory } from './factories';

/**
 * Updates the user preferences.
 */
export default setUserPreferencesFactory(putUserPreferences);
