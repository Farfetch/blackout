import * as fromReducer from './reducer';
import { getEntities } from '../entities/selectors';
import type { LoyaltyState } from './types';
import type { StoreState } from '../types';

/**
 * Returns the user's programs.
 *
 * @param state - Application state.
 *
 * @returns Programs object.
 */
export const getPrograms = (state: StoreState) =>
  getEntities(state, 'programs');

/**
 * Returns the programs error.
 *
 * @param state - Application state.
 *
 * @returns - Programs error.
 */
export const getProgramsError = (state: StoreState) =>
  fromReducer.getPrograms(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the programs.
 *
 * @param state - Application state.
 *
 * @returns - Array of programs ids.
 */
export const getProgramsResult = (state: StoreState) =>
  fromReducer.getPrograms(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the programs.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isProgramsLoading = (state: StoreState) =>
  fromReducer.getPrograms(state.loyalty as LoyaltyState).isLoading;

/**
 * Returns the membership.
 *
 * @param state - Application state.
 *
 * @returns Membership object.
 */
export const getMembership = (state: StoreState) =>
  getEntities(state, 'membership');

/**
 * Returns the membership error.
 *
 * @param state - Application state.
 *
 * @returns - Membership error.
 */
export const getMembershipError = (state: StoreState) =>
  fromReducer.getMembership(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the membership.
 *
 * @param state - Application state.
 *
 * @returns - Membership id.
 */
export const getMembershipResult = (state: StoreState) =>
  fromReducer.getMembership(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the membership.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isMembershipLoading = (state: StoreState) =>
  fromReducer.getMembership(state.loyalty as LoyaltyState).isLoading;

/**
 * Returns the replacements.
 *
 * @param state - Application state.
 *
 * @returns Replacements object.
 */
export const getReplacements = (state: StoreState) =>
  getEntities(state, 'replacements');

/**
 * Returns the replacements error.
 *
 * @param state - Application state.
 *
 * @returns - Replacements error.
 */
export const getReplacementsError = (state: StoreState) =>
  fromReducer.getReplacements(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the replacements.
 *
 * @param state - Application state.
 *
 * @returns - Array of replacements ids.
 */
export const getReplacementsResult = (state: StoreState) =>
  fromReducer.getReplacements(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the replacements.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isReplacementsLoading = (state: StoreState) =>
  fromReducer.getReplacements(state.loyalty as LoyaltyState).isLoading;

/**
 * Returns the statements.
 *
 * @param state - Application state.
 *
 * @returns Converts object.
 */
export const getConverts = (state: StoreState) =>
  getEntities(state, 'converts');

/**
 * Returns the converts error.
 *
 * @param state - Application state.
 *
 * @returns - Converts error.
 */
export const getConvertsError = (state: StoreState) =>
  fromReducer.getConverts(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the converts.
 *
 * @param state - Application state.
 *
 * @returns - Array of converts ids.
 */
export const getConvertsResult = (state: StoreState) =>
  fromReducer.getConverts(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the converts.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isConvertsLoading = (state: StoreState) =>
  fromReducer.getConverts(state.loyalty as LoyaltyState).isLoading;

/**
 * Returns the statements.
 *
 * @param state - Application state.
 *
 * @returns Statements object.
 */
export const getStatements = (state: StoreState) =>
  getEntities(state, 'statements');

/**
 * Returns the statements error.
 *
 * @param state - Application state.
 *
 * @returns - Statements error.
 */
export const getStatementsError = (state: StoreState) =>
  fromReducer.getStatements(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the statements.
 *
 * @param state - Application state.
 *
 * @returns - Array of statements ids.
 */
export const getStatementsResult = (state: StoreState) =>
  fromReducer.getStatements(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the statements.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isStatementsLoading = (state: StoreState) =>
  fromReducer.getStatements(state.loyalty as LoyaltyState).isLoading;
