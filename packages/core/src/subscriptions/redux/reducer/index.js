/**
 * @module subscriptions/reducer
 * @category Subscriptions
 * @subcategory Reducer
 */

import * as actionTypes from '../actionTypes';
import * as authenticationActionTypes from '../../../authentication/redux/actionTypes';
import { combineReducers } from 'redux';
import packages, { INITIAL_STATE as PACKAGES_INITIAL_STATE } from './packages';
import user, {
  INITIAL_STATE as USER_SUBSCRIPTIONS_INITIAL_STATE,
} from './user';

export const INITIAL_STATE = {
  user: USER_SUBSCRIPTIONS_INITIAL_STATE,
  packages: PACKAGES_INITIAL_STATE,
};

const reducer = combineReducers({
  user,
  packages,
});

const removeSubscriptionPackagesFromEntities = state => {
  const { subscriptionPackages, ...rest } = state;

  return rest;
};

export const entitiesMapper = {
  [actionTypes.RESET_SUBSCRIPTIONS]: removeSubscriptionPackagesFromEntities,
  [authenticationActionTypes.LOGOUT_SUCCESS]:
    removeSubscriptionPackagesFromEntities,
};

/**
 * Reducer for subscriptions state.
 *
 * @function subscriptionsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  switch (action.type) {
    case actionTypes.RESET_SUBSCRIPTIONS:
    case authenticationActionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return reducer(state, action);
  }
};
