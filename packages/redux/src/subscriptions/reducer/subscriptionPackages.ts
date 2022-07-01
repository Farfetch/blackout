import * as actionTypes from '../actionTypes';
import * as authenticationActionTypes from '../../users/authentication/actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type { ReducerSwitch, StoreState } from '../../types';
import type { SubscriptionsState } from '../types';

type SubscriptionPackagesState = SubscriptionsState['packages'];

export const INITIAL_STATE: SubscriptionPackagesState = {
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
      return false;
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

export const getSubscriptionPackagesError = (
  state: SubscriptionPackagesState = INITIAL_STATE,
): SubscriptionPackagesState['error'] => state.error;

export const getSubscriptionPackagesIsLoading = (
  state: SubscriptionPackagesState = INITIAL_STATE,
): SubscriptionPackagesState['isLoading'] => state.isLoading;

export const getSubscriptionPackages = (
  state: SubscriptionPackagesState = INITIAL_STATE,
): SubscriptionPackagesState['result'] => state.result;

const reducer = combineReducers({
  error,
  isLoading,
  result,
});

const removeSubscriptionPackagesFromEntities = (
  state: NonNullable<StoreState['entities']>,
) => ({ ...state, subscriptionPackages: undefined });

export const subscriptionPackagesEntitiesMapper = {
  [actionTypes.RESET_SUBSCRIPTIONS]: removeSubscriptionPackagesFromEntities,
  [authenticationActionTypes.LOGOUT_SUCCESS]:
    removeSubscriptionPackagesFromEntities,
};

/**
 * Reducer for Subscription Packages state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const subscriptionPackagesReducer: ReducerSwitch<
  SubscriptionPackagesState,
  AnyAction
> = (state = INITIAL_STATE, action): SubscriptionPackagesState => {
  switch (action.type) {
    case actionTypes.RESET_SUBSCRIPTIONS:
    case authenticationActionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return reducer(state, action);
  }
};

export default subscriptionPackagesReducer;
