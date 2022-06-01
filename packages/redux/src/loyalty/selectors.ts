import * as fromReducer from './reducer';
import { getEntities } from '../entities/selectors';
import type {
  ConvertsEntity,
  MembershipEntity,
  ProgramsEntity,
  ReplacementsEntity,
  StatementsEntity,
} from '../entities/types';
import type { State } from './types';
import type { StoreState } from '../types';

/**
 * Returns the user's programs.
 *
 * @param state - Application state.
 *
 * @returns Programs object.
 */
export const getPrograms = (state: StoreState): ProgramsEntity =>
  getEntities(state, 'programs');

/**
 * Returns the programs error.
 *
 * @param state - Application state.
 *
 * @returns - Programs error.
 */
export const getProgramsError = (
  state: StoreState,
): State['programs']['error'] => fromReducer.getPrograms(state.loyalty).error;

/**
 * Returns the result of the programs.
 *
 * @param state - Application state.
 *
 * @returns - Array of programs ids.
 */
export const getProgramsResult = (
  state: StoreState,
): State['programs']['result'] => fromReducer.getPrograms(state.loyalty).result;

/**
 * Returns the loading status for the programs.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isProgramsLoading = (
  state: StoreState,
): State['programs']['isLoading'] =>
  fromReducer.getPrograms(state.loyalty).isLoading;

/**
 * Returns the membership.
 *
 * @param state - Application state.
 *
 * @returns Membership object.
 */
export const getMembership = (state: StoreState): MembershipEntity =>
  getEntities(state, 'membership');

/**
 * Returns the membership error.
 *
 * @param state - Application state.
 *
 * @returns - Membership error.
 */
export const getMembershipError = (
  state: StoreState,
): State['membership']['error'] =>
  fromReducer.getMembership(state.loyalty).error;

/**
 * Returns the result of the membership.
 *
 * @param state - Application state.
 *
 * @returns - Membership id.
 */
export const getMembershipResult = (
  state: StoreState,
): State['membership']['result'] =>
  fromReducer.getMembership(state.loyalty).result;

/**
 * Returns the loading status for the membership.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isMembershipLoading = (
  state: StoreState,
): State['membership']['isLoading'] =>
  fromReducer.getMembership(state.loyalty).isLoading;

/**
 * Returns the replacements.
 *
 * @param state - Application state.
 *
 * @returns Replacements object.
 */
export const getReplacements = (state: StoreState): ReplacementsEntity =>
  getEntities(state, 'replacements');

/**
 * Returns the replacements error.
 *
 * @param state - Application state.
 *
 * @returns - Replacements error.
 */
export const getReplacementsError = (
  state: StoreState,
): State['replacements']['error'] =>
  fromReducer.getReplacements(state.loyalty).error;

/**
 * Returns the result of the replacements.
 *
 * @param state - Application state.
 *
 * @returns - Array of replacements ids.
 */
export const getReplacementsResult = (
  state: StoreState,
): State['replacements']['result'] =>
  fromReducer.getReplacements(state.loyalty).result;

/**
 * Returns the loading status for the replacements.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isReplacementsLoading = (
  state: StoreState,
): State['replacements']['isLoading'] =>
  fromReducer.getReplacements(state.loyalty).isLoading;

/**
 * Returns the statements.
 *
 * @param state - Application state.
 *
 * @returns Converts object.
 */
export const getConverts = (state: StoreState): ConvertsEntity =>
  getEntities(state, 'converts');

/**
 * Returns the converts error.
 *
 * @param state - Application state.
 *
 * @returns - Converts error.
 */
export const getConvertsError = (
  state: StoreState,
): State['converts']['error'] => fromReducer.getConverts(state.loyalty).error;

/**
 * Returns the result of the converts.
 *
 * @param state - Application state.
 *
 * @returns - Array of converts ids.
 */
export const getConvertsResult = (
  state: StoreState,
): State['converts']['result'] => fromReducer.getConverts(state.loyalty).result;

/**
 * Returns the loading status for the converts.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isConvertsLoading = (
  state: StoreState,
): State['converts']['isLoading'] =>
  fromReducer.getConverts(state.loyalty).isLoading;

/**
 * Returns the statements.
 *
 * @param state - Application state.
 *
 * @returns Statements object.
 */
export const getStatements = (state: StoreState): StatementsEntity =>
  getEntities(state, 'statements');

/**
 * Returns the statements error.
 *
 * @param state - Application state.
 *
 * @returns - Statements error.
 */
export const getStatementsError = (
  state: StoreState,
): State['statements']['error'] =>
  fromReducer.getStatements(state.loyalty).error;

/**
 * Returns the result of the statements.
 *
 * @param state - Application state.
 *
 * @returns - Array of statements ids.
 */
export const getStatementsResult = (
  state: StoreState,
): State['statements']['result'] =>
  fromReducer.getStatements(state.loyalty).result;

/**
 * Returns the loading status for the statements.
 *
 * @param state - Application state.
 *
 * @returns - Loading status.
 */
export const isStatementsLoading = (
  state: StoreState,
): State['statements']['isLoading'] =>
  fromReducer.getStatements(state.loyalty).isLoading;
