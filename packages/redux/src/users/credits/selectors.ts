import { getUser } from '../selectors.js';
import {
  getUserCreditMovements as getUserCreditMovementsFromReducer,
  getUserCredits as getUserCreditsFromReducer,
} from '../reducer.js';
import type { StoreState } from '../../types/storeState.types.js';
import type { UsersState } from '../types/state.types.js';

/**
 * Returns the loading status for the credit operation.
 *
 * @param state - Application state.
 *
 * @returns Credit operation Loading status.
 */
export const areUserCreditsLoading = (state: StoreState) =>
  getUserCreditsFromReducer(state.users as UsersState).isLoading;

/**
 * Returns the credit error.
 *
 * @param state - Application state.
 *
 * @returns Credit operation error.
 */
export const getUserCreditsError = (state: StoreState) =>
  getUserCreditsFromReducer(state.users as UsersState).error;

/**
 * Returns the loading status for the credit movements operation.
 *
 * @param state - Application state.
 *
 * @returns Credit movements operation Loading status.
 */
export const areUserCreditMovementsLoading = (state: StoreState) =>
  getUserCreditMovementsFromReducer(state.users as UsersState).isLoading;

/**
 * Returns the credit movements error.
 *
 * @param state - Application state.
 *
 * @returns Credit movements operation error.
 */
export const getUserCreditMovementsError = (state: StoreState) =>
  getUserCreditMovementsFromReducer(state.users as UsersState).error;

/**
 * Retrieves if the user credits have been fetched.
 *
 * Will return true if an user credits request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @param state - Application state.
 *
 * @returns isFetched status of the user credits.
 */
export const areUserCreditsFetched = (state: StoreState) =>
  (!!getUser(state)?.credits || !!getUserCreditsError(state)) &&
  !areUserCreditsLoading(state);

/**
 * Retrieves if the user credit movements have been fetched.
 *
 * Will return true if an user credits request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @param state - Application state.
 *
 * @returns isFetched status of the user credit movements.
 */
export const areUserCreditMovementsFetched = (state: StoreState) =>
  (!!getUser(state)?.creditMovements || !!getUserCreditMovementsError(state)) &&
  !areUserCreditMovementsLoading(state);
