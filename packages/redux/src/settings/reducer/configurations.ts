import * as actionTypes from '../actionTypes';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import configurationReducer, {
  INITIAL_STATE as CONFIGURATION_INITIAL_STATE,
} from './configuration';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { ConfigurationsState } from '../types';
import type { StoreState } from '../../types';

export const INITIAL_STATE: ConfigurationsState = {
  error: null,
  isLoading: false,
  result: null,
  configuration: CONFIGURATION_INITIAL_STATE,
};

const error = (
  state: BlackoutError | null = INITIAL_STATE.error,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_CONFIGURATIONS_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_CONFIGURATIONS_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_CONFIGURATIONS_REQUEST:
      return true;
    case actionTypes.FETCH_CONFIGURATIONS_SUCCESS:
    case actionTypes.FETCH_CONFIGURATIONS_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_CONFIGURATIONS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_CONFIGURATIONS_STATE]: (
    state: NonNullable<StoreState['entities']>,
  ) => {
    if (!state) {
      return state;
    }

    const { configurations, ...rest } = state;

    return rest;
  },
};

export const getError = (state: ConfigurationsState) => state.error;
export const getIsLoading = (state: ConfigurationsState) => state.isLoading;
export const getResult = (state: ConfigurationsState) => state.result;

const reducers = combineReducers({
  error,
  isLoading,
  result,
  configuration: configurationReducer,
});

/**
 * Reducer for configurations state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const settingsReducer: Reducer<ConfigurationsState> = (state, action) => {
  if (action.type === actionTypes.RESET_CONFIGURATIONS_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default settingsReducer;
