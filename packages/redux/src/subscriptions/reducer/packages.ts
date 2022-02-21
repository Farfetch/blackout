import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { PackagesState } from '../types';
import type { ReducerSwitch } from '../../types';

export const INITIAL_STATE: PackagesState = {
  error: null,
  isLoading: false,
  result: null,
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST:
      return true;
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS:
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getPackagesError = (
  state: PackagesState | undefined,
): PackagesState['error'] | undefined => state?.error;
export const getPackagesIsLoading = (
  state: PackagesState | undefined,
): PackagesState['isLoading'] | undefined => state?.isLoading;
export const getPackages = (
  state: PackagesState | undefined,
): PackagesState['result'] | undefined => state?.result;

const reducers = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for Subscription Packages state.
 *
 * @param state - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const packagesSubscriptionReducer: ReducerSwitch<PackagesState, AnyAction> = (
  state = INITIAL_STATE,
  action,
): PackagesState => {
  return reducers(state, action);
};

export default packagesSubscriptionReducer;
