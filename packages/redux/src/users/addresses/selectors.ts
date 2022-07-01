import {
  AddressEntity,
  AddressesEntity,
  getEntities,
  getEntityById,
} from '../../entities';
import {
  getAddresses as getAddressesFromReducer,
  getAddress as getAddressFromReducer,
  getDefaultAddressDetails as getDefaultAddressDetailsFromReducer,
  getError as getErrorFromReducer,
  getIsLoading as getIsLoadingFromReducer,
  getResult as getResultFromReducer,
} from './reducer';
import { getAddresses as getAddressesFromUsersReducer } from '../reducer';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { StoreState } from '../../types';
import type { UserAddressesState } from './types';
import type { UsersState } from '../types';

/**
 * Returns the result of the user addresses area.
 *
 * @param state - Application state.
 *
 * @returns Array containing the loaded addresses id.
 */
export const getUserAddressesResult = (
  state: StoreState,
): UserAddressesState['result'] =>
  getResultFromReducer(getAddressesFromUsersReducer(state.users as UsersState));

/**
 * Returns the error of the user addresses area.
 *
 * @param state - Application state.
 *
 * @returns Address information object.
 */
export const getUserAddressesError = (
  state: StoreState,
): UserAddressesState['error'] =>
  getErrorFromReducer(getAddressesFromUsersReducer(state.users as UsersState));

/**
 * Returns the loading status of the user addresses area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserAddressesLoading = (
  state: StoreState,
): UserAddressesState['isLoading'] =>
  getIsLoadingFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  );

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
export const areUserAddressesListLoading = (
  state: StoreState,
): UserAddressesState['addresses']['isLoading'] =>
  getAddressesFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getUserAddressesListError = (
  state: StoreState,
): UserAddressesState['addresses']['error'] =>
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
):
  | UserAddressesState['address']['isLoading'][AddressEntity['id']]
  | undefined =>
  getAddressFromReducer(getAddressesFromUsersReducer(state.users as UsersState))
    .isLoading[addressId];

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
  getAddressFromReducer(getAddressesFromUsersReducer(state.users as UsersState))
    .error[addressId];

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isUserDefaultAddressDetailsLoading = (
  state: StoreState,
): UserAddressesState['defaultAddressDetails']['isLoading'] =>
  getDefaultAddressDetailsFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getUserDefaultAddressDetailsError = (
  state: StoreState,
): UserAddressesState['defaultAddressDetails']['error'] =>
  getDefaultAddressDetailsFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).error;

/**
 * @param state - Application state.
 *
 * @returns Address details result.
 */
export const getUserDefaultAddressDetailsResult = (
  state: StoreState,
): UserAddressesState['defaultAddressDetails']['result'] =>
  getDefaultAddressDetailsFromReducer(
    getAddressesFromUsersReducer(state.users as UsersState),
  ).result;
