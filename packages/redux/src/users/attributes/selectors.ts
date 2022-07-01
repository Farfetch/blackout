import { getUserAttributes as getUserAttributesFromReducer } from '../reducer';
import type { StoreState } from '../../types/storeState.types';
import type { UsersState } from '../types/state.types';

/**
 * Returns the loading status for the user attributes operation.
 *
 * @param state - Application state.
 *
 * @returns User attributes operation Loading status.
 */
export const areUserAttributesLoading = (state: StoreState) =>
  getUserAttributesFromReducer(state.users as UsersState).isLoading;

/**
 * Returns the user attributes error.
 *
 * @param state - Application state.
 *
 * @returns User attributes operation error.
 */
export const getUserAttributesError = (state: StoreState) =>
  getUserAttributesFromReducer(state.users as UsersState).error;

/**
 * Returns the user attributes.
 *
 * @param state - Application state.
 *
 * @returns User attributes.
 */
export const getUserAttributes = (state: StoreState) =>
  getUserAttributesFromReducer(state.users as UsersState).result;
