/**
 * @module merchantsLocations/reducer
 * @category Merchants locations
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import type {
  FetchMerchantsLocationsAction,
  FetchMerchantsLocationsFailureAction,
  FetchMerchantsLocationsRequestAction,
  ResetMerchantsLocationsStateAction,
  State,
} from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: State = {
  error: null,
  isLoading: false,
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchMerchantsLocationsFailureAction
    | FetchMerchantsLocationsRequestAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: FetchMerchantsLocationsAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST:
      return true;
    case actionTypes.FETCH_MERCHANTS_LOCATIONS_SUCCESS:
    case actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE:
      return false;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_MERCHANTS_LOCATIONS_STATE as typeof actionTypes.RESET_MERCHANTS_LOCATIONS_STATE]:
    (state: StoreState['entities']): StoreState['entities'] => {
      const { merchantsLocations, ...rest } = state;

      return rest;
    },
};

export const getError = (state: State): State['error'] => state.error;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;

const reducers = combineReducers({
  error,
  isLoading,
});

/**
 * Reducer for merchants locations state.
 *
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const merchantsLocationsReducer = (
  state: State,
  action: FetchMerchantsLocationsAction | ResetMerchantsLocationsStateAction,
): State => {
  if (action.type === actionTypes.RESET_MERCHANTS_LOCATIONS_STATE) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default merchantsLocationsReducer;
