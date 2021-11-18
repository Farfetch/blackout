/**
 * @module merchantsLocations/reducer
 * @category Merchants locations
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_MERCHANTS_LOCATIONS_FAILURE:
      return action.payload.error;
    case actionTypes.GET_MERCHANTS_LOCATIONS_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_MERCHANTS_LOCATIONS_REQUEST:
      return true;
    case actionTypes.GET_MERCHANTS_LOCATIONS_SUCCESS:
    case actionTypes.GET_MERCHANTS_LOCATIONS_FAILURE:
      return false;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_MERCHANTS_LOCATIONS]: state => {
    const { merchantsLocations, ...rest } = state;

    return rest;
  },
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;

const reducers = combineReducers({
  error,
  isLoading,
});

/**
 * Reducer for merchants locations state.
 *
 * @function merchantsLocationsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_MERCHANTS_LOCATIONS) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
