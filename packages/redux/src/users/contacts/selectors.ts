import { getEntities } from '../../entities/index.js';
import { getUserContacts as getUserContactsFromReducer } from '../reducer.js';
import type { StoreState } from '../../types/storeState.types.js';
import type { UsersState } from '../types/state.types.js';

/**
 * Returns the loading status for the contacts operation.
 *
 * @param state - Application state.
 *
 * @returns Contacts operation Loading status.
 */
export const areUserContactsLoading = (state: StoreState) =>
  getUserContactsFromReducer(state.users as UsersState).isLoading;

/**
 * Returns the contacts error.
 *
 * @param state - Application state.
 *
 * @returns Contacts operation error.
 */
export const getUserContactsError = (state: StoreState) =>
  getUserContactsFromReducer(state.users as UsersState).error;

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
 * Returns the fetched status of the user contacts area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areUserContactsFetched = (state: StoreState) =>
  (getUserContacts(state) !== undefined ||
    getUserContactsError(state) !== null) &&
  !areUserContactsLoading(state);
