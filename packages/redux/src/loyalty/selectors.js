/**
 * @module loyalty/selectors
 * @category Loyalty
 * @subcategory Selectors
 */

import * as fromReducer from './reducer';
import { getEntities } from '../entities/selectors';

/**
 * Returns the user's programs.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Programs object.
 */
export const getPrograms = state => getEntities(state, 'programs');

/**
 * Returns the programs error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Programs error.
 */
export const getProgramsError = state =>
  fromReducer.getPrograms(state.loyalty).error;

/**
 * Returns the result of the programs.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {Array}         - Array of payment token ids.
 */
export const getProgramsResult = state =>
  fromReducer.getPrograms(state.loyalty).result;

/**
 * Returns the loading status for the programs.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {boolean}       - Loading status.
 */
export const isProgramsLoading = state =>
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
export const getMembership = state => getEntities(state, 'membership');

/**
 * Returns the membership error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Membership error.
 */
export const getMembershipError = state =>
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
export const getMembershipResult = state =>
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
export const isMembershipLoading = state =>
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
export const getReplacements = state => getEntities(state, 'replacements');

/**
 * Returns the replacements error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Replacements error.
 */
export const getReplacementsError = state =>
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
export const getReplacementsResult = state =>
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
export const isReplacementsLoading = state =>
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
export const getConverts = state => getEntities(state, 'converts');

/**
 * Returns the converts error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Converts error.
 */
export const getConvertsError = state =>
  fromReducer.getConverts(state.loyalty).error;

/**
 * Returns the result of the converts.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {Array}         - Array of converts ids.
 */
export const getConvertsResult = state =>
  fromReducer.getConverts(state.loyalty).result;

/**
 * Returns the loading status for the converts.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {boolean}       - Loading status.
 */
export const isConvertsLoading = state =>
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
export const getStatements = state => getEntities(state, 'statements');

/**
 * Returns the statements error.
 *
 * @function
 *
 * @param {object} state    - Application state.
 *
 * @returns {object}        - Statements error.
 */
export const getStatementsError = state =>
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
export const getStatementsResult = state =>
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
export const isStatementsLoading = state =>
  fromReducer.getStatements(state.loyalty).isLoading;
