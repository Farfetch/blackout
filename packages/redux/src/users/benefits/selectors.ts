import { getEntities } from '../../entities/index.js';
import { getUserBenefits as getUserBenefitsFromReducer } from '../reducer.js';
import type { StoreState } from '../../types/storeState.types.js';
import type { UsersState } from '../types/state.types.js';

/**
 * Returns the loading status for the user benefits operation.
 *
 * @param state - Application state.
 *
 * @returns Benefits operation Loading status.
 */
export const areUserBenefitsLoading = (state: StoreState) =>
  getUserBenefitsFromReducer(state.users as UsersState).isLoading;

/**
 * Returns the benefits error.
 *
 * @param state - Application state.
 *
 * @returns Benefits operation error.
 */
export const getUserBenefitsError = (state: StoreState) =>
  getUserBenefitsFromReducer(state.users as UsersState).error;

/**
 * Returns the benefits entity.
 *
 * @param state - Application state.
 *
 * @returns Benefits entity.
 */
export const getUserBenefits = (state: StoreState) =>
  getEntities(state, 'benefits');
