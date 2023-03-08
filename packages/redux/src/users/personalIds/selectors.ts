import {
  getDefaultPersonalId as getDefaultPersonalIdFromReducer,
  getError as getErrorFromReducer,
  getIsLoading as getIsLoadingFromReducer,
  getResult as getResultFromReducer,
} from './reducer.js';
import { getPersonalIds as getPersonalIdsFromReducer } from '../reducer.js';
import type { StoreState } from '../../types/storeState.types.js';
import type { UsersState } from '../types/state.types.js';

/**
 * Returns the loading status of the personal ids area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserPersonalIdsLoading = (state: StoreState) =>
  getIsLoadingFromReducer(getPersonalIdsFromReducer(state.users as UsersState));

/**
 * Returns the error of the personal ids area.
 *
 * @param state - Application state.
 *
 * @returns Personal Ids operation error.
 */
export const getUserPersonalIdsError = (state: StoreState) =>
  getErrorFromReducer(getPersonalIdsFromReducer(state.users as UsersState));

/**
 * Returns the result of the personal ids area.
 *
 * @param state - Application state.
 *
 * @returns Array containing the loaded personal ids.
 */
export const getUserPersonalIdsResult = (state: StoreState) =>
  getResultFromReducer(getPersonalIdsFromReducer(state.users as UsersState));

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const isUserDefaultPersonalIdLoading = (state: StoreState) =>
  getDefaultPersonalIdFromReducer(
    getPersonalIdsFromReducer(state.users as UsersState),
  ).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getUserDefaultPersonalIdError = (state: StoreState) =>
  getDefaultPersonalIdFromReducer(
    getPersonalIdsFromReducer(state.users as UsersState),
  ).error;

/**
 * @param state - Application state.
 *
 * @returns Address details result.
 */
export const getUserDefaultPersonalIdResult = (state: StoreState) =>
  getDefaultPersonalIdFromReducer(
    getPersonalIdsFromReducer(state.users as UsersState),
  ).result;
