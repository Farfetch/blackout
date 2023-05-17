import { putUserPreferences } from '@farfetch/blackout-client';
import { setUserPreferencesFactory } from './factories/index.js';

/**
 * Updates the user preferences.
 */
export default setUserPreferencesFactory(putUserPreferences);
