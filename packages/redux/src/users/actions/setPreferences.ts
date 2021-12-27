import { putPreferences } from '@farfetch/blackout-client/users';
import { setPreferencesFactory } from './factories';

/**
 * Updates the user preferences.
 *
 * @memberof module:users/actions
 *
 * @function setPreferences
 *
 * @type {SetPreferencesThunkFactory}
 */
export default setPreferencesFactory(putPreferences);
