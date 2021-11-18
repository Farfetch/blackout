/**
 * @module staffMembers/reducer
 * @category Staff Members
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
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
  /* istanbul ignore next */ action = {},
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
  /* istanbul ignore next */ action = {},
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

export const getStaffMembersError = state => state.error;
export const getAreStaffMembersLoading = state => state.isLoading;
export const getStaffMembers = state => state.result;

/**
 * Reducer for staff members.
 *
 * @function staffMembersReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default combineReducers({
  error,
  isLoading,
  result,
});
