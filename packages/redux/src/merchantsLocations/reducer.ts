import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import type {
  FetchMerchantsLocationsAction,
  FetchMerchantsLocationsFailureAction,
  FetchMerchantsLocationsRequestAction,
  MerchantsLocationsState,
  ResetMerchantsLocationsStateAction,
} from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: MerchantsLocationsState = {
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
  [actionTypes.RESET_MERCHANTS_LOCATIONS_STATE]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    const { merchantsLocations, ...rest } = state as NonNullable<
      StoreState['entities']
    >;
    return rest;
  },
};

export const getError = (
  state: MerchantsLocationsState,
): MerchantsLocationsState['error'] => state.error;
export const getIsLoading = (
  state: MerchantsLocationsState,
): MerchantsLocationsState['isLoading'] => state.isLoading;

const reducers = combineReducers({
  error,
  isLoading,
});

/**
 * Reducer for merchants locations state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const merchantsLocationsReducer = (
  state: MerchantsLocationsState,
  action: FetchMerchantsLocationsAction | ResetMerchantsLocationsStateAction,
): MerchantsLocationsState => {
  if (action.type === actionTypes.RESET_MERCHANTS_LOCATIONS_STATE) {
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default merchantsLocationsReducer;
