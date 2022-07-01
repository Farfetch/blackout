import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createReducerWithResult } from '../helpers/reducerFactory';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import type * as T from './types';
import type { ReducerSwitch } from '../types';

const isNormalized = true;

export const INITIAL_STATE: T.LoyaltyState = {
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
): T.LoyaltyState['membership'] => {
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

export const getPrograms = (
  state: T.LoyaltyState,
): T.LoyaltyState['programs'] => state.programs;
export const getMembership = (
  state: T.LoyaltyState,
): T.LoyaltyState['membership'] => state.membership;
export const getReplacements = (
  state: T.LoyaltyState,
): T.LoyaltyState['replacements'] => state.replacements;
export const getConverts = (
  state: T.LoyaltyState,
): T.LoyaltyState['converts'] => state.converts;
export const getStatements = (
  state: T.LoyaltyState,
): T.LoyaltyState['statements'] => state.statements;

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
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const loyaltyReducer: ReducerSwitch<T.LoyaltyState> = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default loyaltyReducer;
