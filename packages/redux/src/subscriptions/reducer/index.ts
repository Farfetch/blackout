import * as actionTypes from '../actionTypes';
import * as authenticationActionTypes from '../../authentication/actionTypes';
import { AnyAction, combineReducers } from 'redux';
import packages, { INITIAL_STATE as PACKAGES_INITIAL_STATE } from './packages';
import user, {
  INITIAL_STATE as USER_SUBSCRIPTIONS_INITIAL_STATE,
} from './user';
import type { ReducerSwitch, StoreState } from '../../types';
import type { SubscriptionState } from './../types';

export const INITIAL_STATE: SubscriptionState = {
  user: USER_SUBSCRIPTIONS_INITIAL_STATE,
  packages: PACKAGES_INITIAL_STATE,
};

const reducer = combineReducers({
  user,
  packages,
});

const removeSubscriptionPackagesFromEntities = (
  state: StoreState['entities'],
) => ({ ...state, subscriptionPackages: undefined });

export const entitiesMapper = {
  [actionTypes.RESET_SUBSCRIPTIONS]: removeSubscriptionPackagesFromEntities,
  [authenticationActionTypes.LOGOUT_SUCCESS]:
    removeSubscriptionPackagesFromEntities,
};

/**
 * Reducer for subscriptions state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const subscriptionReducer: ReducerSwitch<SubscriptionState, AnyAction> = (
  state = INITIAL_STATE,
  action,
): SubscriptionState => {
  switch (action.type) {
    case actionTypes.RESET_SUBSCRIPTIONS:
    case authenticationActionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return reducer(state, action);
  }
};

export default subscriptionReducer;
