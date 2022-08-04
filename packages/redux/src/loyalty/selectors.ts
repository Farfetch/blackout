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
export const areProgramsLoading = (state: StoreState) =>
  fromReducer.getPrograms(state.loyalty as LoyaltyState).isLoading;

/**
 * Returns the membership.
 *
 * @param state - Application state.
 *
 * @returns Membership object.
 */
export const getProgramMembership = (state: StoreState) =>
  getEntities(state, 'memberships');

/**
 * Returns the membership error.
 *
 * @param state - Application state.
 *
 * @returns - Membership error.
 */
export const getProgramMembershipError = (state: StoreState) =>
  fromReducer.getMembership(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the membership.
 *
 * @param state - Application state.
 *
 * @returns - Membership id.
 */
export const getProgramMembershipResult = (state: StoreState) =>
  fromReducer.getMembership(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the membership.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isProgramMembershipLoading = (state: StoreState) =>
  fromReducer.getMembership(state.loyalty as LoyaltyState).isLoading;

/**
 * Returns the replacements.
 *
 * @param state - Application state.
 *
 * @returns Replacements object.
 */
export const getProgramMembershipReplacements = (state: StoreState) =>
  getEntities(state, 'replacements');

/**
 * Returns the replacements error.
 *
 * @param state - Application state.
 *
 * @returns - Replacements error.
 */
export const getProgramMembershipReplacementsError = (state: StoreState) =>
  fromReducer.getReplacements(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the replacements.
 *
 * @param state - Application state.
 *
 * @returns - Array of replacements ids.
 */
export const getProgramMembershipReplacementsResult = (state: StoreState) =>
  fromReducer.getReplacements(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the replacements.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const areProgramMembershipReplacementsLoading = (state: StoreState) =>
  fromReducer.getReplacements(state.loyalty as LoyaltyState).isLoading;

/**
 * Returns the statements.
 *
 * @param state - Application state.
 *
 * @returns Converts object.
 */
export const getProgramMembershipConverts = (state: StoreState) =>
  getEntities(state, 'converts');

/**
 * Returns the converts error.
 *
 * @param state - Application state.
 *
 * @returns - Converts error.
 */
export const getProgramMembershipConvertsError = (state: StoreState) =>
  fromReducer.getConverts(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the converts.
 *
 * @param state - Application state.
 *
 * @returns - Array of converts ids.
 */
export const getProgramMembershipConvertsResult = (state: StoreState) =>
  fromReducer.getConverts(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the converts.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const areProgramMembershipConvertsLoading = (state: StoreState) =>
  fromReducer.getConverts(state.loyalty as LoyaltyState).isLoading;

/**
 * Returns the statements.
 *
 * @param state - Application state.
 *
 * @returns Statements object.
 */
export const getProgramMembershipStatements = (state: StoreState) =>
  getEntities(state, 'statements');

/**
 * Returns the statements error.
 *
 * @param state - Application state.
 *
 * @returns - Statements error.
 */
export const getProgramMembershipStatementsError = (state: StoreState) =>
  fromReducer.getStatements(state.loyalty as LoyaltyState).error;

/**
 * Returns the result of the statements.
 *
 * @param state - Application state.
 *
 * @returns - Array of statements ids.
 */
export const getProgramMembershipStatementsResult = (state: StoreState) =>
  fromReducer.getStatements(state.loyalty as LoyaltyState).result;

/**
 * Returns the loading status for the statements.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const areProgramMembershipStatementsLoading = (state: StoreState) =>
  fromReducer.getStatements(state.loyalty as LoyaltyState).isLoading;
