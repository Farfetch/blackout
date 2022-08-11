import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { ReducerSwitch } from '../types';
import type { StaffMembersState } from './types';

export const INITIAL_STATE: StaffMembersState = {
  error: {},
  isLoading: {},
  result: {},
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
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

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
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

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
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

export const getError = (
  state: StaffMembersState,
): StaffMembersState['error'] => state.error;
export const getIsLoading = (
  state: StaffMembersState,
): StaffMembersState['isLoading'] => state.isLoading;
export const getResult = (
  state: StaffMembersState,
): StaffMembersState['result'] => state.result;

/**
 * Reducer for staff members.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const staffMembersReducer: ReducerSwitch<StaffMembersState, AnyAction> =
  combineReducers({
    error,
    isLoading,
    result,
  });

export default staffMembersReducer;
