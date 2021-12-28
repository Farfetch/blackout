/**
 * @module loyalty/selectors
 * @category Loyalty
 * @subcategory Selectors
 */

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
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Programs object.
 */
export const getPrograms = (state: StoreState): ProgramsEntity =>
  getEntities(state, 'programs');

/**
 * Returns the programs error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Programs error.
 */
export const getProgramsError = (
  state: StoreState,
): State['programs']['error'] => fromReducer.getPrograms(state.loyalty).error;

/**
 * Returns the result of the programs.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {Array}         - Array of programs ids.
 */
export const getProgramsResult = (
  state: StoreState,
): State['programs']['result'] => fromReducer.getPrograms(state.loyalty).result;

/**
 * Returns the loading status for the programs.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {boolean}       - Loading status.
 */
export const isProgramsLoading = (
  state: StoreState,
): State['programs']['isLoading'] =>
  fromReducer.getPrograms(state.loyalty).isLoading;

/**
 * Returns the membership.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Membership object.
 */
export const getMembership = (state: StoreState): MembershipEntity =>
  getEntities(state, 'membership');

/**
 * Returns the membership error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Membership error.
 */
export const getMembershipError = (
  state: StoreState,
): State['membership']['error'] =>
  fromReducer.getMembership(state.loyalty).error;

/**
 * Returns the result of the membership.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {number}         - Membership id.
 */
export const getMembershipResult = (
  state: StoreState,
): State['membership']['result'] =>
  fromReducer.getMembership(state.loyalty).result;

/**
 * Returns the loading status for the membership.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {boolean}       - Loading status.
 */
export const isMembershipLoading = (
  state: StoreState,
): State['membership']['isLoading'] =>
  fromReducer.getMembership(state.loyalty).isLoading;

/**
 * Returns the replacements.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Replacements object.
 */
export const getReplacements = (state: StoreState): ReplacementsEntity =>
  getEntities(state, 'replacements');

/**
 * Returns the replacements error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Replacements error.
 */
export const getReplacementsError = (
  state: StoreState,
): State['replacements']['error'] =>
  fromReducer.getReplacements(state.loyalty).error;

/**
 * Returns the result of the replacements.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {Array}         - Array of replacements ids.
 */
export const getReplacementsResult = (
  state: StoreState,
): State['replacements']['result'] =>
  fromReducer.getReplacements(state.loyalty).result;

/**
 * Returns the loading status for the replacements.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {boolean}       - Loading status.
 */
export const isReplacementsLoading = (
  state: StoreState,
): State['replacements']['isLoading'] =>
  fromReducer.getReplacements(state.loyalty).isLoading;

/**
 * Returns the statements.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Converts object.
 */
export const getConverts = (state: StoreState): ConvertsEntity =>
  getEntities(state, 'converts');

/**
 * Returns the converts error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Converts error.
 */
export const getConvertsError = (
  state: StoreState,
): State['converts']['error'] => fromReducer.getConverts(state.loyalty).error;

/**
 * Returns the result of the converts.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {Array}         - Array of converts ids.
 */
export const getConvertsResult = (
  state: StoreState,
): State['converts']['result'] => fromReducer.getConverts(state.loyalty).result;

/**
 * Returns the loading status for the converts.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {boolean}       - Loading status.
 */
export const isConvertsLoading = (
  state: StoreState,
): State['converts']['isLoading'] =>
  fromReducer.getConverts(state.loyalty).isLoading;

/**
 * Returns the statements.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Statements object.
 */
export const getStatements = (state: StoreState): StatementsEntity =>
  getEntities(state, 'statements');

/**
 * Returns the statements error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Statements error.
 */
export const getStatementsError = (
  state: StoreState,
): State['statements']['error'] =>
  fromReducer.getStatements(state.loyalty).error;

/**
 * Returns the result of the statements.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {Array}         - Array of statements ids.
 */
export const getStatementsResult = (
  state: StoreState,
): State['statements']['result'] =>
  fromReducer.getStatements(state.loyalty).result;

/**
 * Returns the loading status for the statements.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {boolean}       - Loading status.
 */
export const isStatementsLoading = (
  state: StoreState,
): State['statements']['isLoading'] =>
  fromReducer.getStatements(state.loyalty).isLoading;
