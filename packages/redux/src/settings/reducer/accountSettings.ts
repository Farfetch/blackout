import * as actionTypes from '../actionTypes.js';
import { type AnyAction, type Reducer } from 'redux';
import type { AccountSettingsState } from '../types/index.js';

export const INITIAL_STATE: AccountSettingsState = {
  error: null,
  isLoading: {},
  result: null,
};

const accountSettingsReducer: Reducer<AccountSettingsState> = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNT_SETTINGS_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: true,
        },
        error: {
          ...state.error,
          [action.meta.hash]: null,
        },
        result: {
          ...state.result,
        },
      };
    case actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: false,
        },
        error: {
          ...state.error,
          [action.meta.hash]: null,
        },
        result: {
          ...state.result,
          [action.meta.hash]: action.payload,
        },
      };
    case actionTypes.FETCH_ACCOUNT_SETTINGS_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.hash]: false,
        },
        error: {
          ...state.error,
          [action.meta.hash]: action.payload.error,
        },
        result: {
          ...state.result,
        },
      };
    default:
      return state;
  }
};

export const getError = (state: AccountSettingsState) => state.error;
export const getIsLoading = (state: AccountSettingsState) => state.isLoading;
export const getResult = (state: AccountSettingsState) => state.result;

export default accountSettingsReducer;
