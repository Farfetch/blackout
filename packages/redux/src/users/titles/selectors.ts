import { getEntities, getEntityById } from '../../entities/index.js';
import { getUserTitles as getUserTitlesFromReducer } from '../reducer.js';
import type { StoreState } from '../../types/storeState.types.js';
import type { UsersState } from '../types/index.js';

/**
 * Returns the loading status for the titles operation.
 *
 * @param state - Application state.
 *
 * @returns Titles operation Loading status.
 */
export const areUserTitlesLoading = (state: StoreState) =>
  getUserTitlesFromReducer(state.users as UsersState).isLoading;

/**
 * Returns the titles error.
 *
 * @param state - Application state.
 *
 * @returns Titles operation error.
 */
export const getUserTitlesError = (state: StoreState) =>
  getUserTitlesFromReducer(state.users as UsersState).error;

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
