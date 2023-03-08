import * as actionTypes from '../actionTypes.js';
import type { AnyAction, Reducer } from 'redux';
import type { ConfigurationState } from '../types/index.js';

export const INITIAL_STATE: ConfigurationState = {
  isLoading: {},
  error: {},
};

const configurationReducer: Reducer<ConfigurationState> = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_CONFIGURATION_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.code]: true,
        },
        error: {
          ...state.error,
          [action.meta.code]: null,
        },
      };
    case actionTypes.FETCH_CONFIGURATION_SUCCESS:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.code]: false,
        },
        error: {
          ...state.error,
          [action.meta.code]: null,
        },
      };
    case actionTypes.FETCH_CONFIGURATION_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.code]: false,
        },
        error: {
          ...state.error,
          [action.meta.code]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export const getError = (state: ConfigurationState) => state.error;
export const getIsLoading = (state: ConfigurationState) => state.isLoading;

export default configurationReducer;
