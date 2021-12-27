import { fetchPreferencesFactory } from './factories';
import { getPreferences } from '@farfetch/blackout-client/users';

/**
 * Fetch the user preferences.
 *
 * @memberof module:users/actions
 *
 * @function fetchPreferences
 *
 * @type {FetchPreferencesThunkFactory}
 */
export default fetchPreferencesFactory(getPreferences);
