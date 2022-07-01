import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export const validateReset = (
  type: string | string[],
  action: { type?: string },
  actionTypes: Record<string, string>,
): boolean => {
  const resetAction = actionTypes[`RESET_${type}`];
  const isThereAResetAction = !!resetAction;

  return isThereAResetAction && resetAction === action.type;
};

export const createReducerWithResult =
  (
    actionType: Array<string> | string,
    initialState: CombinedState<any>,
    actionTypes: Record<string, string>,
    isNormalized = false,
    shouldResetState = false,
  ) =>
  (
    state = initialState,
    action: {
      type?: string;
      payload?: { error: BlackoutError; result: any };
    } = {},
  ): CombinedState<any> => {
    const isActionTypeAnArray = Array.isArray(actionType);
    const actionTypesArray = isActionTypeAnArray ? actionType : [actionType];

    if (shouldResetState && action.type === LOGOUT_SUCCESS) {
      return initialState;
    }

    for (const type of actionTypesArray) {
      if (validateReset(type, action, actionTypes)) {
        return {
          error: initialState.error,
          result: initialState?.result,
        };
      }

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
    shouldResetState = false,
  ) =>
  (
    state = initialState,
    action: { type?: string; payload?: { error: BlackoutError } } = {},
  ): CombinedState<any> => {
    const isActionTypeAnArray = Array.isArray(actionType);
    const actionTypesArray = isActionTypeAnArray ? actionType : [actionType];

    if (shouldResetState && action.type === LOGOUT_SUCCESS) {
      return initialState;
    }

    for (const type of actionTypesArray) {
      if (validateReset(type, action, actionTypes)) {
        return {
          error: initialState.error,
          result: initialState?.result,
        };
      }

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
