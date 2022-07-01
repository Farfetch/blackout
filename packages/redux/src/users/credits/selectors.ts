import {
  getUserCreditMovements as getUserCreditMovementsFromReducer,
  getUserCredits as getUserCreditsFromReducer,
} from '../reducer';
import type { StoreState } from '../../types/storeState.types';
import type { UsersState } from '../types/state.types';

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
