import {
  getError,
  getIsLoading,
  getResult,
  getUserClosetItems,
} from './reducer.js';
import { getUserClosets as getUserClosetsFromReducer } from '../reducer.js';
import type { StoreState } from '../../types/storeState.types.js';
import type { UsersState } from '../types/state.types.js';

/**
 * Returns the user closets result from the application state.
 *
 * @param state - Application state.
 *
 * @returns Returns user closet result.
 */
export const getUserClosets = (state: StoreState) =>
  getResult(getUserClosetsFromReducer(state.users as UsersState));

/**
 * Returns the user closets error.
 *
 * @param state - Application state.
 *
 * @returns User closet error.
 */
export const getUserClosetsError = (state: StoreState) =>
  getError(getUserClosetsFromReducer(state.users as UsersState));

/**
 * Returns the loading status of the user closets area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserClosetsLoading = (state: StoreState) =>
  getIsLoading(getUserClosetsFromReducer(state.users as UsersState));

/**
 * Retrieves if the user closets has been fetched.
 *
 * Will return true if an user closets request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @param state - Application state.
 *
 * @returns isFetched status of the user closets.
 */
export const areUserClosetsFetched = (state: StoreState) =>
  (!!getUserClosets(state) || !!getUserClosetsError(state)) &&
  !areUserClosetsLoading(state);

/**
 * Returns the user closet items result from the application state.
 *
 * @param state - Application state.
 *
 * @returns User closet items result.
 */
export const getUserClosetItemsResult = (state: StoreState) =>
  getUserClosetItems(getUserClosetsFromReducer(state.users as UsersState))
    .result;

/**
 * Returns the user closet items error.
 *
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getUserClosetItemsError = (state: StoreState) =>
  getUserClosetItems(getUserClosetsFromReducer(state.users as UsersState))
    .error;

/**
 * Returns the loading status of the user closet items area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserClosetItemsLoading = (state: StoreState) =>
  getUserClosetItems(getUserClosetsFromReducer(state.users as UsersState))
    .isLoading;

/**
 * Retrieves if the user closet items were fetched.
 *
 * Will return true if an user closet items request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @param state - Application state.
 *
 * @returns isFetched status of the user closet items.
 */
export const areUserClosetItemsFetched = (state: StoreState) =>
  (!!getUserClosetItemsResult(state) || !!getUserClosetItemsError(state)) &&
  !areUserClosetItemsLoading(state);
