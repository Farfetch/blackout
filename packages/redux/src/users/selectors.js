/**
 * @module users/selectors
 * @category Users
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
import { getEntities, getEntityById } from '../entities/selectors';

/**
 * Returns the loading status for the users operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Users operation Loading status.
 */
export const areUsersLoading = state => getIsLoading(state.users);

/**
 * Returns the users error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Users operation error.
 */
export const getUsersError = state => getError(state.users);

/**
 * Returns the user id.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} User id.
 */
export const getUserId = state => getResult(state.users);

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
  getBenefitsGetter(state.users).isLoading;

/**
 * Returns the benefits error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Benefits operation error.
 */
export const getBenefitsError = state => getBenefitsGetter(state.users).error;

/**
 * Returns the benefits entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Benefits entity.
 */
export const getBenefits = state => getEntities(state, 'benefits');

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
  getPreferencesGetter(state.users).isLoading;

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
  getPreferencesGetter(state.users).error;

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
  getUpdatePreferencesGetter(state.users).isLoading;

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
  getUpdatePreferencesGetter(state.users).error;

/**
 * Returns the preferences entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Preferences entity.
 */
export const getPreferences = state => getEntities(state, 'preferences');

/**
 * Returns the loading status for the titles operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Titles operation Loading status.
 */
export const areTitlesLoading = state => getTitlesGetter(state.users).isLoading;

/**
 * Returns the titles error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Titles operation error.
 */
export const getTitlesError = state => getTitlesGetter(state.users).error;

/**
 * Returns the titles entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Titles entity.
 */
export const getTitles = state => getEntities(state, 'titles');

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
  getEntityById(state, 'titles', titleId);

/**
 * Returns the loading status for the credit operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Credit operation Loading status.
 */
export const isCreditLoading = state => getCreditGetter(state.users).isLoading;

/**
 * Returns the credit error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credit operation error.
 */
export const getCreditError = state => getCreditGetter(state.users).error;

/**
 * Returns the credits entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credits entity.
 */
export const getCredit = state => getEntities(state, 'credit');

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
  getCreditMovementsGetter(state.users).isLoading;

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
  getCreditMovementsGetter(state.users).error;

/**
 * Returns the credit movements entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credit movements entity.
 */
export const getCreditMovements = state =>
  getEntities(state, 'creditMovements');

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
  getContactsGetter(state.users).isLoading;

/**
 * Returns the contacts error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Contacts operation error.
 */
export const getContactsError = state => getContactsGetter(state.users).error;

/**
 * Returns the contacts entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Contacts entity.
 */
export const getContacts = state => getEntities(state, 'contacts');
