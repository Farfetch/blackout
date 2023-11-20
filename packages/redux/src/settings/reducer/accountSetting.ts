import * as actionTypes from '../actionTypes.js';
import { type AnyAction, type Reducer } from 'redux';
import type { AccountSettingState } from '../types/index.js';

export const INITIAL_STATE: AccountSettingState = {
  error: null,
  isLoading: {},
  result: null,
};

const accountSettingReducer: Reducer<AccountSettingState> = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNT_SETTING_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.id]: true,
        },
        error: {
          ...state.error,
          [action.meta.id]: null,
        },
        result: {
          ...state.result,
        },
      };
    case actionTypes.FETCH_ACCOUNT_SETTING_SUCCESS:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.id]: false,
        },
        error: {
          ...state.error,
          [action.meta.id]: null,
        },
        result: {
          ...state.result,
          [action.meta.id]: action.payload,
        },
      };
    case actionTypes.FETCH_ACCOUNT_SETTING_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.id]: false,
        },
        error: {
          ...state.error,
          [action.meta.id]: action.payload.error,
        },
        result: {
          ...state.result,
        },
      };
    default:
      return state;
  }
};

export const getError = (state: AccountSettingState) => state.error;
export const getIsLoading = (state: AccountSettingState) => state.isLoading;
export const getResult = (state: AccountSettingState) => state.result;

export default accountSettingReducer;
