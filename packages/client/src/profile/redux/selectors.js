/**
 * @module profile/selectors
 * @category Profile
 * @subcategory Selectors
 */

import {
  getBenefits as getBenefitsGetter,
  getContacts as getContactsGetter,
  getCredit as getCreditGetter,
  getCreditMovements as getCreditMovementsGetter,
  getError,
  getIsLoading,
  getPreferences as getPreferencesGetter,
  getResult,
  getTitles as getTitlesGetter,
  getUpdatePreferences as getUpdatePreferencesGetter,
} from './reducer';
import { getEntity } from '../../entities/redux/selectors';

/**
 * Returns the loading status for the profile operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Profile operation Loading status.
 */
export const isProfileLoading = state => getIsLoading(state.profile);

/**
 * Returns the profile error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Profile operation error.
 */
export const getProfileError = state => getError(state.profile);

/**
 * Returns the profile id.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Profile id.
 */
export const getProfileId = state => getResult(state.profile);

/**
 * Returns the loading status for the benefits operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Benefits operation Loading status.
 */
export const isBenefitsLoading = state =>
  getBenefitsGetter(state.profile).isLoading;

/**
 * Returns the benefits error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Benefits operation error.
 */
export const getBenefitsError = state => getBenefitsGetter(state.profile).error;

/**
 * Returns the benefits entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Benefits entity.
 */
export const getBenefits = state => getEntity(state, 'benefits');

/**
 * Returns the loading status for the preferences operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Preferences operation Loading status.
 */
export const isPreferencesLoading = state =>
  getPreferencesGetter(state.profile).isLoading;

/**
 * Returns the preferences error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Preferences operation error.
 */
export const getPreferencesError = state =>
  getPreferencesGetter(state.profile).error;

/**
 * Returns the loading status for the update preferences operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Update preferences operation Loading status.
 */
export const isUpdatingPreferences = state =>
  getUpdatePreferencesGetter(state.profile).isLoading;

/**
 * Returns the update preferences error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Update preferences operation error.
 */
export const getUpdatePreferencesError = state =>
  getUpdatePreferencesGetter(state.profile).error;

/**
 * Returns the preferences entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Preferences entity.
 */
export const getPreferences = state => getEntity(state, 'preferences');

/**
 * Returns the loading status for the titles operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Titles operation Loading status.
 */
export const isTitlesLoading = state =>
  getTitlesGetter(state.profile).isLoading;

/**
 * Returns the titles error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Titles operation error.
 */
export const getTitlesError = state => getTitlesGetter(state.profile).error;

/**
 * Returns the titles entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Titles entity.
 */
export const getTitles = state => getEntity(state, 'titles');

/**
 * Returns the specified title from titles entity .
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} titleId - Title identifier.
 *
 * @returns {object} Title details.
 */
export const getTitleById = (state, titleId) =>
  getEntity(state, 'titles', titleId);

/**
 * Returns the loading status for the credit operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Credit operation Loading status.
 */
export const isCreditLoading = state =>
  getCreditGetter(state.profile).isLoading;

/**
 * Returns the credit error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credit operation error.
 */
export const getCreditError = state => getCreditGetter(state.profile).error;

/**
 * Returns the credits entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credits entity.
 */
export const getCredit = state => getEntity(state, 'credit');

/**
 * Returns the loading status for the credit movements operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Credit movements operation Loading status.
 */
export const isCreditMovementsLoading = state =>
  getCreditMovementsGetter(state.profile).isLoading;

/**
 * Returns the credit movements error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credit movements operation error.
 */
export const getCreditMovementsError = state =>
  getCreditMovementsGetter(state.profile).error;

/**
 * Returns the credit movements entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credit movements entity.
 */
export const getCreditMovements = state => getEntity(state, 'creditMovements');

/**
 * Returns the loading status for the contacts operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Contacts operation Loading status.
 */
export const isContactsLoading = state =>
  getContactsGetter(state.profile).isLoading;

/**
 * Returns the contacts error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Contacts operation error.
 */
export const getContactsError = state => getContactsGetter(state.profile).error;

/**
 * Returns the contacts entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Contacts entity.
 */
export const getContacts = state => getEntity(state, 'contacts');
