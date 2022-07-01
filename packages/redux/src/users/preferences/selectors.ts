import { getEntities } from '../../entities';
import {
  getUserPreferences as getUserPreferencesFromReducer,
  getUserPreferencesUpdate,
} from '../reducer';
import type { StoreState } from '../../types/storeState.types';
import type { UsersState } from '../types/state.types';

/**
 * Returns the loading status for the preferences operation.
 *
 * @param state - Application state.
 *
 * @returns Preferences operation Loading status.
 */
export const areUserPreferencesLoading = (state: StoreState) =>
  getUserPreferencesFromReducer(state.users as UsersState).isLoading;

/**
 * Returns the preferences error.
 *
 * @param state - Application state.
 *
 * @returns Preferences operation error.
 */
export const getUserPreferencesError = (state: StoreState) =>
  getUserPreferencesFromReducer(state.users as UsersState).error;

/**
 * Returns the loading status for the update preferences operation.
 *
 * @param state - Application state.
 *
 * @returns Update preferences operation Loading status.
 */
export const areUserPreferencesUpdating = (state: StoreState) =>
  getUserPreferencesUpdate(state.users as UsersState).isLoading;

/**
 * Returns the update preferences error.
 *
 * @param state - Application state.
 *
 * @returns Update preferences operation error.
 */
export const getUserPreferencesUpdateError = (state: StoreState) =>
  getUserPreferencesUpdate(state.users as UsersState).error;

/**
 * Returns the preferences entity.
 *
 * @param state - Application state.
 *
 * @returns Preferences entity.
 */
export const getUserPreferences = (state: StoreState) =>
  getEntities(state, 'preferences');
