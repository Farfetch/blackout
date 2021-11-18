import { getEntity } from './entity';

/**
 * Returns all preferences.
 *
 * @function getPreferences
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {string} preferenceCode - Preference code to be filtered.
 *
 * @returns {object} Preferences normalized.
 */
export const getPreferences = (state, preferenceCode) =>
  getEntity(state, 'preferences', preferenceCode);
