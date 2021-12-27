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
  getUserAttributes as getUserAttributesGetter,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import type { Error } from '@farfetch/blackout-client/types';
import type { StoreState } from '../types';
import type { UserAttributesResponse } from '@farfetch/blackout-client/users/types';

/**
 * Returns the loading status for the users operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Users operation Loading status.
 */
export const areUsersLoading = (state: StoreState) => getIsLoading(state.users);

/**
 * Returns the users error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Users operation error.
 */
export const getUsersError = (state: StoreState) => getError(state.users);

/**
 * Returns the user id.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} User id.
 */
export const getUserId = (state: StoreState) => getResult(state.users);

/**
 * Returns the loading status for the benefits operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Benefits operation Loading status.
 */
export const isBenefitsLoading = (state: StoreState) =>
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
export const getBenefitsError = (state: StoreState) =>
  getBenefitsGetter(state.users).error;

/**
 * Returns the benefits entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Benefits entity.
 */
export const getBenefits = (state: StoreState) =>
  getEntities(state, 'benefits');

/**
 * Returns the loading status for the preferences operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Preferences operation Loading status.
 */
export const isPreferencesLoading = (state: StoreState) =>
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
export const getPreferencesError = (state: StoreState) =>
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
export const isUpdatingPreferences = (state: StoreState) =>
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
export const getUpdatePreferencesError = (state: StoreState) =>
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
export const getPreferences = (state: StoreState) =>
  getEntities(state, 'preferences');

/**
 * Returns the loading status for the titles operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Titles operation Loading status.
 */
export const areTitlesLoading = (state: StoreState) =>
  getTitlesGetter(state.users).isLoading;

/**
 * Returns the titles error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Titles operation error.
 */
export const getTitlesError = (state: StoreState) =>
  getTitlesGetter(state.users).error;

/**
 * Returns the titles entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Titles entity.
 */
export const getTitles = (state: StoreState) => getEntities(state, 'titles');

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
export const getTitleById = (state: StoreState, titleId: string) =>
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
export const isCreditLoading = (state: StoreState) =>
  getCreditGetter(state.users).isLoading;

/**
 * Returns the credit error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credit operation error.
 */
export const getCreditError = (state: StoreState) =>
  getCreditGetter(state.users).error;

/**
 * Returns the credits entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Credits entity.
 */
export const getCredit = (state: StoreState) => getEntities(state, 'credit');

/**
 * Returns the loading status for the credit movements operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Credit movements operation Loading status.
 */
export const isCreditMovementsLoading = (state: StoreState) =>
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
export const getCreditMovementsError = (state: StoreState) =>
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
export const getCreditMovements = (state: StoreState) =>
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
export const isContactsLoading = (state: StoreState) =>
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
export const getContactsError = (state: StoreState) =>
  getContactsGetter(state.users).error;

/**
 * Returns the contacts entity.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Contacts entity.
 */
export const getContacts = (state: StoreState) =>
  getEntities(state, 'contacts');

/**
 * Returns the loading status for the user attributes operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} User attributes operation Loading status.
 */
export const isUserAttributesLoading = (state: StoreState): boolean =>
  getUserAttributesGetter(state.users).isLoading;

/**
 * Returns the user attributes error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} User attributes operation error.
 */
export const getUserAttributesError = (state: StoreState): Error | null =>
  getUserAttributesGetter(state.users).error;

/**
 * Returns the user attributes.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} User attributes.
 */
export const getUserAttributes = (
  state: StoreState,
): UserAttributesResponse | UserAttributesResponse[] | null =>
  getUserAttributesGetter(state.users).result;
