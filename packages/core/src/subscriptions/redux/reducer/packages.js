import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';
import defaultTo from 'lodash/defaultTo';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
  result: null,
};

const error = (state = INITIAL_STATE.error, action) => {
  action = defaultTo(action, {});

  switch (action.type) {
    case actionTypes.GET_SUBSCRIPTION_PACKAGES_FAILURE:
      return action.payload.error;
    case actionTypes.GET_SUBSCRIPTION_PACKAGES_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action) => {
  action = defaultTo(action, {});

  switch (action.type) {
    case actionTypes.GET_SUBSCRIPTION_PACKAGES_REQUEST:
      return true;
    case actionTypes.GET_SUBSCRIPTION_PACKAGES_SUCCESS:
    case actionTypes.GET_SUBSCRIPTION_PACKAGES_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action) => {
  action = defaultTo(action, {});

  switch (action.type) {
    case actionTypes.GET_SUBSCRIPTION_PACKAGES_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getPackagesError = state => state.error;
export const getPackagesIsLoading = state => state.isLoading;
export const getPackages = state => state.result;

export default combineReducers({
  error,
  isLoading,
  result,
});
