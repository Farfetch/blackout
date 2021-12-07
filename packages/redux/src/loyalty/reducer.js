/**
 * @module loyalty/reducer
 * @category Loyalty
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult } from '../helpers';

const isNormalized = true;

const INITIAL_STATE = {
  programs: {
    error: null,
    result: null,
    isLoading: false,
  },
  membership: {
    error: null,
    result: null,
    isLoading: false,
  },
  replacements: {
    error: null,
    result: null,
    isLoading: false,
  },
  converts: {
    error: null,
    result: null,
    isLoading: false,
  },
  statements: {
    error: null,
    result: null,
    isLoading: false,
  },
};

export const programs = createReducerWithResult(
  'GET_PROGRAMS',
  INITIAL_STATE.programs,
  actionTypes,
  isNormalized,
);

export const replacements = createReducerWithResult(
  'REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT',
  INITIAL_STATE.replacements,
  actionTypes,
  isNormalized,
);

export const converts = createReducerWithResult(
  'CREATE_PROGRAM_MEMBERSHIP_CONVERT',
  INITIAL_STATE.converts,
  actionTypes,
  isNormalized,
);
export const statements = createReducerWithResult(
  'GET_PROGRAM_MEMBERSHIP_STATEMENTS',
  INITIAL_STATE.statements,
  actionTypes,
  isNormalized,
);

export const membership = (state = INITIAL_STATE.membership, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PROGRAM_USERS_MEMBERSHIP_REQUEST:
    case actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE.membership.error,
      };
    case actionTypes.GET_PROGRAM_USERS_MEMBERSHIP_SUCCESS:
    case actionTypes.CREATE_PROGRAM_MEMBERSHIP_SUCCESS:
      return {
        error: INITIAL_STATE.membership.error,
        result: action.payload.result,
        isLoading: false,
      };
    case actionTypes.GET_PROGRAM_USERS_MEMBERSHIP_FAILURE:
    case actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE:
      return {
        error: action.payload.error,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const getPrograms = state => state.programs;
export const getMembership = state => state.membership;
export const getReplacements = state => state.replacements;
export const getConverts = state => state.converts;
export const getStatements = state => state.statements;

/**
 * Reducer for loyalty state.
 *
 * @function loyaltyReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default combineReducers({
  programs,
  membership,
  replacements,
  converts,
  statements,
});
