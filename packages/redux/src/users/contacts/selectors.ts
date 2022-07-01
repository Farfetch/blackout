import { getEntities } from '../../entities';
import { getUserContacts as getUserContactsFromReducer } from '../reducer';
import type { StoreState } from '../../types/storeState.types';
import type { UsersState } from '../types/state.types';

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
