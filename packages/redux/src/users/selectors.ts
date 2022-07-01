import { getError, getIsLoading } from './reducer';
import type { StoreState } from '../types';
import type { UsersState } from './types';

/** Common selectors */

/**
 * Returns the loading status for the user operations.
 *
 * @param state - Application state.
 *
 * @returns User operation Loading status.
 */
export const isUserLoading = (state: StoreState) =>
  getIsLoading(state.users as UsersState);

// isAuthenticationLoading is an alias to isUserLoading
export const isAuthenticationLoading = isUserLoading;

/**
 * Returns the users error.
 *
 * @param state - Application state.
 *
 * @returns User operation error.
 */
export const getUserError = (state: StoreState) =>
  getError(state.users as UsersState);

// getAuthenticationError is an alias to getUserError
export const getAuthenticationError = getUserError;

export * from './addresses/selectors';
export * from './attributes/selectors';
export * from './authentication/selectors';
export * from './benefits/selectors';
export * from './contacts/selectors';
export * from './credits/selectors';
export * from './preferences/selectors';
export * from './titles/selectors';
