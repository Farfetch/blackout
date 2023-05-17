import {
  type AddressEntity,
  getEntities,
  getEntityById,
} from '../../entities/index.js';
import {
  getAddresses as getAddressesFromReducer,
  getAddress as getAddressFromReducer,
  getDefaultAddressDetails as getDefaultAddressDetailsFromReducer,
  getError as getErrorFromReducer,
  getIsLoading as getIsLoadingFromReducer,
  getResult as getResultFromReducer,
} from './reducer.js';
import { getAddresses as getAddressesFromUsersReducer } from '../reducer.js';
import type { StoreState } from '../../types/index.js';
import type { UsersState } from '../types/index.js';

/**
 * Returns the result of the user addresses area.
 *
 * @param state - Application state.
 *
 * @returns Array containing the loaded addresses id.
 */
export const getUserAddressesResult = (state: StoreState) =>
  getResultFromReducer(getAddressesFromUsersReducer(state.users as UsersState));

/**
 * Returns the error of the user addresses area.
 *
 * @param state - Application state.
 *
 * @returns Address information object.
 */
export const getUserAddressesError = (state: StoreState) =>
  getErrorFromReducer(getAddressesFromUsersReducer(state.users as UsersState));

/**
 * Returns the loading status of the user addresses area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserAddressesLoading = (state: StoreState) =>
  getIsLoadingFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  );

/**
 * Returns the fetched status of the user addresses area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserAddressesFetched = (state: StoreState) =>
  (getUserAddressesResult(state) !== null ||
    getUserAddressesError(state) !== null) &&
  !areUserAddressesLoading(state);

/**
 * Returns the addresses entity that contains all user addresses.
 *
 * @param state - Application state.
 *
 * @returns Object containing all the currently loaded addresses.
 */
export const getUserAddresses = (state: StoreState) =>
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
) => getEntityById(state, 'addresses', addressId);

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserAddressesListLoading = (state: StoreState) =>
  getAddressesFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getUserAddressesListError = (state: StoreState) =>
  getAddressesFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).error;

/**
 * @param state     - Application state.
 * @param addressId - Address identifier.
 *
 * @returns Loader status.
 */
export const isUserAddressLoading = (
  state: StoreState,
  addressId: AddressEntity['id'],
) =>
  getAddressFromReducer(getAddressesFromUsersReducer(state.users as UsersState))
    .isLoading[addressId];

/**
 * Returns the fetched status of the user addresses area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isUserAddressFetched = (
  state: StoreState,
  addressId: AddressEntity['id'],
) => {
  const userAddresses = getUserAddressesResult(state);
  const hasUserAddressInResult =
    userAddresses != null && userAddresses.includes(addressId);

  return (
    (hasUserAddressInResult ||
      getUserAddressError(state, addressId) !== undefined) &&
    !isUserAddressLoading(state, addressId)
  );
};

/**
 * @param state     - Application state.
 * @param addressId - Address identifier.
 *
 * @returns Error details.
 */
export const getUserAddressError = (
  state: StoreState,
  addressId: AddressEntity['id'],
) =>
  getAddressFromReducer(getAddressesFromUsersReducer(state.users as UsersState))
    .error[addressId];

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserDefaultAddressDetailsLoading = (state: StoreState) =>
  getDefaultAddressDetailsFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getUserDefaultAddressDetailsError = (state: StoreState) =>
  getDefaultAddressDetailsFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).error;

/**
 * @param state - Application state.
 *
 * @returns Address details result.
 */
export const getUserDefaultAddressDetailsResult = (state: StoreState) =>
  getDefaultAddressDetailsFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).result;
