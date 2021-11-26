/**
 * @module staffMembers/reducer
 * @category Staff Members
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type {
  FetchStaffMemberAction,
  FetchStaffMemberFailureAction,
  FetchStaffMemberSuccessAction,
  State,
} from './types';
import type { ReducerSwitch } from '../types';

export const INITIAL_STATE: State = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (
  state = INITIAL_STATE.error,
  action: FetchStaffMemberSuccessAction | FetchStaffMemberFailureAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_STAFF_MEMBER_SUCCESS:
      return {
        ...state,
        [action.meta.id]: undefined,
      };
    case actionTypes.FETCH_STAFF_MEMBER_FAILURE:
      return {
        ...state,
        [action.meta.id]: action.payload.error,
      };
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchStaffMemberAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_STAFF_MEMBER_REQUEST:
      return {
        ...state,
        [action.meta.id]: true,
      };
    case actionTypes.FETCH_STAFF_MEMBER_SUCCESS:
      return {
        ...state,
        [action.meta.id]: false,
      };
    case actionTypes.FETCH_STAFF_MEMBER_FAILURE:
      return {
        ...state,
        [action.meta.id]: undefined,
      };
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: FetchStaffMemberSuccessAction | AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_STAFF_MEMBER_SUCCESS:
      return {
        ...state,
        [action.meta.id]: action.payload.result,
      };
    default:
      return state;
  }
};

export const getError = (state: State): State['error'] => state.error;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;
export const getResult = (state: State): State['result'] => state.result;

/**
 * Reducer for staff members.
 *
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const staffMembersReducer: ReducerSwitch<State, FetchStaffMemberAction> =
  combineReducers({
    error,
    isLoading,
    result,
  });

export default staffMembersReducer;
