import { fetchUserPreferencesFactory } from './factories';
import { getUserPreferences } from '@farfetch/blackout-client';

/**
 * Fetch the user preferences.
 */
export const fetchUserPreferences =
  fetchUserPreferencesFactory(getUserPreferences);
