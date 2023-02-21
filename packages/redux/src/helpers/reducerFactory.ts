import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export const createReducerWithResult =
  (
    actionType: Array<string> | string,
    initialState: CombinedState<any>,
    actionTypes: Record<string, string>,
    isNormalized = false,
    shouldResetStateOnLogout = false,
    resetActionType?: Array<string> | string,
  ) =>
  (
    state = initialState,
    action: {
      type?: string;
      payload?: any;
    } = {},
  ) => {
    const isActionTypeAnArray = Array.isArray(actionType);
    const actionTypesArray = isActionTypeAnArray ? actionType : [actionType];

    if (shouldResetStateOnLogout && action.type === LOGOUT_SUCCESS) {
      return initialState;
    }

    const resetActionTypesArray = Array.isArray(resetActionType)
      ? resetActionType
      : typeof resetActionType === 'string'
      ? [resetActionType]
      : undefined;

    if (resetActionTypesArray) {
      for (const type of resetActionTypesArray) {
        if (action.type === type) {
          return initialState;
        }
      }
    }

    for (const type of actionTypesArray) {
      switch (action.type) {
        case actionTypes[`${type}_REQUEST`]:
          return {
            error: initialState.error,
            isLoading: true,
          };
        case actionTypes[`${type}_FAILURE`]:
          return {
            error: action.payload?.error,
            isLoading: false,
          };
        case actionTypes[`${type}_SUCCESS`]:
          return {
            error: initialState.error,
            isLoading: false,
            result: isNormalized ? action.payload?.result : action.payload,
          };
        default:
          break;
      }
    }

    return state;
  };

const createReducer =
  (
    actionType: Array<string> | string,
    initialState: CombinedState<any>,
    actionTypes: Record<string, string>,
    shouldResetStateOnLogout = false,
    resetActionType?: Array<string> | string,
  ) =>
  (
    state = initialState,
    action: {
      type?: string;
      payload?: { error?: BlackoutError; result?: unknown };
    } = {},
  ) => {
    const isActionTypeAnArray = Array.isArray(actionType);
    const actionTypesArray = isActionTypeAnArray ? actionType : [actionType];

    if (shouldResetStateOnLogout && action.type === LOGOUT_SUCCESS) {
      return initialState;
    }

    const resetActionTypesArray = Array.isArray(resetActionType)
      ? resetActionType
      : typeof resetActionType === 'string'
      ? [resetActionType]
      : undefined;

    if (resetActionTypesArray) {
      for (const type of resetActionTypesArray) {
        if (action.type === type) {
          return initialState;
        }
      }
    }

    for (const type of actionTypesArray) {
      switch (action.type) {
        case actionTypes[`${type}_REQUEST`]:
          return {
            error: initialState.error,
            isLoading: true,
          };
        case actionTypes[`${type}_FAILURE`]:
          return {
            error: action.payload?.error,
            isLoading: false,
          };
        case actionTypes[`${type}_SUCCESS`]:
          return initialState;
        default:
          break;
      }
    }

    return state;
  };

export default createReducer;
