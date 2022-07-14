import {
  getUserAddresses as addressesGetter,
  getUserAddress as addressGetter,
  getUserBenefits as getBenefitsGetter,
  getUserContacts as getContactsGetter,
  getUserCredit as getCreditGetter,
  getUserCreditMovements as getCreditMovementsGetter,
  getError,
  getIsLoading,
  getUserPreferences as getPreferencesGetter,
  getResult,
  getUserTitles as getTitlesGetter,
  getUserAttributes as getUserAttributesGetter,
  getUserDefaultAddressDetails,
  getUserPreferencesUpdate as getUserPreferencesUpdateGetter,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import type { AddressEntity, AddressesEntity } from '../entities/types';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { State } from './types';
import type { StoreState } from '../types';
import type { UserAttributesResponse } from '@farfetch/blackout-client/src/users/attributes/types';

/**
 * Returns the loading status for the users operations.
 *
 * @param state - Application state.
 *
 * @returns User operation Loading status.
 */
export const areUsersLoading = (state: StoreState) => getIsLoading(state.users);

/**
 * Returns the users error.
 *
 * @param state - Application state.
 *
 * @returns User operation error.
 */
export const getUserError = (state: StoreState) => getError(state.users);

/**
 * Returns the user id.
 *
 * @param state - Application state.
 *
 * @returns User id.
 */
export const getUserId = (state: StoreState) => getResult(state.users);

/**
 * Returns the loading status for the benefits operation.
 *
 * @param state - Application state.
 *
 * @returns Benefits operation Loading status.
 */
export const isUserBenefitsLoading = (state: StoreState) =>
  getBenefitsGetter(state.users).isLoading;

/**
 * Returns the benefits error.
 *
 * @param state - Application state.
 *
 * @returns Benefits operation error.
 */
export const getUserBenefitsError = (state: StoreState) =>
  getBenefitsGetter(state.users).error;

/**
 * Returns the benefits entity.
 *
 * @param state - Application state.
 *
 * @returns Benefits entity.
 */
export const getUserBenefits = (state: StoreState) =>
  getEntities(state, 'benefits');

/**
 * Returns the loading status for the preferences operation.
 *
 * @param state - Application state.
 *
 * @returns Preferences operation Loading status.
 */
export const isUserPreferencesLoading = (state: StoreState) =>
  getPreferencesGetter(state.users).isLoading;

/**
 * Returns the preferences error.
 *
 * @param state - Application state.
 *
 * @returns Preferences operation error.
 */
export const getUserPreferencesError = (state: StoreState) =>
  getPreferencesGetter(state.users).error;

/**
 * Returns the loading status for the update preferences operation.
 *
 * @param state - Application state.
 *
 * @returns Update preferences operation Loading status.
 */
export const isUserPreferencesUpdating = (state: StoreState) =>
  getUserPreferencesUpdateGetter(state.users).isLoading;

/**
 * Returns the update preferences error.
 *
 * @param state - Application state.
 *
 * @returns Update preferences operation error.
 */
export const getUserPreferencesUpdatingError = (state: StoreState) =>
  getUserPreferencesUpdateGetter(state.users).error;

/**
 * Returns the preferences entity.
 *
 * @param state - Application state.
 *
 * @returns Preferences entity.
 */
export const getUserPreferences = (state: StoreState) =>
  getEntities(state, 'preferences');

/**
 * Returns the loading status for the titles operation.
 *
 * @param state - Application state.
 *
 * @returns Titles operation Loading status.
 */
export const areUserTitlesLoading = (state: StoreState) =>
  getTitlesGetter(state.users).isLoading;

/**
 * Returns the titles error.
 *
 * @param state - Application state.
 *
 * @returns Titles operation error.
 */
export const getUserTitlesError = (state: StoreState) =>
  getTitlesGetter(state.users).error;

/**
 * Returns the titles entity.
 *
 * @param state - Application state.
 *
 * @returns Titles entity.
 */
export const getUserTitles = (state: StoreState) =>
  getEntities(state, 'titles');

/**
 * Returns the specified title from titles entity .
 *
 * @param state   - Application state.
 * @param titleId - Title identifier.
 *
 * @returns Title details.
 */
export const getUserTitleById = (state: StoreState, titleId: string) =>
  getEntityById(state, 'titles', titleId);

/**
 * Returns the loading status for the credit operation.
 *
 * @param state - Application state.
 *
 * @returns Credit operation Loading status.
 */
export const isUserCreditLoading = (state: StoreState) =>
  getCreditGetter(state.users).isLoading;

/**
 * Returns the credit error.
 *
 * @param state - Application state.
 *
 * @returns Credit operation error.
 */
export const getUserCreditError = (state: StoreState) =>
  getCreditGetter(state.users).error;

/**
 * Returns the credits entity.
 *
 * @param state - Application state.
 *
 * @returns Credits entity.
 */
export const getUserCredit = (state: StoreState) =>
  getEntities(state, 'credit');

/**
 * Returns the loading status for the credit movements operation.
 *
 * @param state - Application state.
 *
 * @returns Credit movements operation Loading status.
 */
export const isUserCreditMovementsLoading = (state: StoreState) =>
  getCreditMovementsGetter(state.users).isLoading;

/**
 * Returns the credit movements error.
 *
 * @param state - Application state.
 *
 * @returns Credit movements operation error.
 */
export const getUserCreditMovementsError = (state: StoreState) =>
  getCreditMovementsGetter(state.users).error;

/**
 * Returns the credit movements entity.
 *
 * @param state - Application state.
 *
 * @returns Credit movements entity.
 */
export const getUserCreditMovements = (state: StoreState) =>
  getEntities(state, 'creditMovements');

/**
 * Returns the loading status for the contacts operation.
 *
 * @param state - Application state.
 *
 * @returns Contacts operation Loading status.
 */
export const isUserContactsLoading = (state: StoreState) =>
  getContactsGetter(state.users).isLoading;

/**
 * Returns the contacts error.
 *
 * @param state - Application state.
 *
 * @returns Contacts operation error.
 */
export const getUserContactsError = (state: StoreState) =>
  getContactsGetter(state.users).error;

/**
 * Returns the contacts entity.
 *
 * @param state - Application state.
 *
 * @returns Contacts entity.
 */
export const getUserContacts = (state: StoreState) =>
  getEntities(state, 'contacts');

/**
 * Returns the loading status for the user attributes operation.
 *
 * @param state - Application state.
 *
 * @returns User attributes operation Loading status.
 */
export const isUserAttributesLoading = (state: StoreState): boolean =>
  getUserAttributesGetter(state.users).isLoading;

/**
 * Returns the user attributes error.
 *
 * @param state - Application state.
 *
 * @returns User attributes operation error.
 */
export const getUserAttributesError = (
  state: StoreState,
): BlackoutError | null => getUserAttributesGetter(state.users).error;

/**
 * Returns the user attributes.
 *
 * @param state - Application state.
 *
 * @returns User attributes.
 */
export const getUserAttributes = (
  state: StoreState,
): UserAttributesResponse | UserAttributesResponse[] | null =>
  getUserAttributesGetter(state.users).result;

/**
 * Returns the result of the addresses area.
 *
 * @param state - Application state.
 *
 * @returns Array containing the loaded addresses id.
 */
export const getAddressesResult = (state: StoreState): State['result'] =>
  addressesGetter(state.users).result;
/**
 * Returns the addresses entity that contains all user addresses.
 *
 * @param state - Application state.
 *
 * @returns Object containing all the currently loaded addresses.
 */
export const getUserAddresses = (state: StoreState): AddressesEntity =>
  getEntities(state, 'addresses');

/**
 * Returns a specific address with the specified 'addressId'.
 *
 * @param state     - Application state.
 * @param addressId - Address id.
 *
 * @returns Address information object.
 */
export const getUserAddress = (
  state: StoreState,
  addressId: AddressEntity['id'],
): AddressEntity | undefined => getEntityById(state, 'addresses', addressId);

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isUserAddressesLoading = (
  state: StoreState,
): State['addresses']['isLoading'] => addressesGetter(state.users).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getUserAddressesError = (
  state: StoreState,
): State['addresses']['error'] => addressesGetter(state.users).error;

/**
 * @param state     - Application state.
 * @param addressId - Address identifier.
 *
 * @returns Loader status.
 */
export const isUserAddressLoading = (
  state: StoreState,
  addressId: AddressEntity['id'],
): boolean | undefined => addressGetter(state.users).isLoading[addressId];

/**
 * @param state     - Application state.
 * @param addressId - Address identifier.
 *
 * @returns Error details.
 */
export const getUserAddressError = (
  state: StoreState,
  addressId: AddressEntity['id'],
): BlackoutError | null | undefined =>
  addressGetter(state.users).error[addressId];

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isUserDefaultAddressLoading = (
  state: StoreState,
): State['defaultAddress']['isLoading'] =>
  getUserDefaultAddressDetails(state.users).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getUserDefaultAddressError = (
  state: StoreState,
): State['defaultAddress']['error'] =>
  getUserDefaultAddressDetails(state.users).error;

/**
 * @param state - Application state.
 *
 * @returns Address details result.
 */
export const getUserDefaultAddressResult = (
  state: StoreState,
): State['defaultAddress']['result'] =>
  getUserDefaultAddressDetails(state.users).result;
