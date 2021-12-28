/**
 * @module loyalty/reducer
 * @category Loyalty
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult } from '../helpers';
import type * as T from './types';
import type { ProgramMembership } from '@farfetch/blackout-client/src/loyalty/types';
import type { ReducerSwitch, StateWithResult } from '../types';

const isNormalized = true;

export const INITIAL_STATE: T.State = {
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
  'FETCH_PROGRAMS',
  INITIAL_STATE.programs,
  actionTypes,
  isNormalized,
);

export const replacements = createReducerWithResult(
  'CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT',
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
  'FETCH_PROGRAM_MEMBERSHIP_STATEMENTS',
  INITIAL_STATE.statements,
  actionTypes,
  isNormalized,
);

export const membership = (
  state = INITIAL_STATE.membership,
  action: T.FetchProgramUsersMembershipAction | T.CreateProgramMembershipAction,
): StateWithResult<ProgramMembership> => {
  switch (action.type) {
    case actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST:
    case actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: INITIAL_STATE.membership.error,
      };
    case actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_SUCCESS:
    case actionTypes.CREATE_PROGRAM_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        error: INITIAL_STATE.membership.error,
        result: action.payload.result,
        isLoading: false,
      };
    case actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE:
    case actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const getPrograms = (state: T.State): T.State['programs'] =>
  state.programs;
export const getMembership = (state: T.State): T.State['membership'] =>
  state.membership;
export const getReplacements = (state: T.State): T.State['replacements'] =>
  state.replacements;
export const getConverts = (state: T.State): T.State['converts'] =>
  state.converts;
export const getStatements = (state: T.State): T.State['statements'] =>
  state.statements;

const reducers = combineReducers({
  programs,
  membership,
  replacements,
  converts,
  statements,
});

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

const loyaltyReducer: ReducerSwitch<T.State> = (state, action) =>
  reducers(state, action);

export default loyaltyReducer;
