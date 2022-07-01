import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import type * as T from './types';

export const INITIAL_STATE: T.UserAttributesState = {
  result: null,
  error: null,
  isLoading: false,
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AnyAction,
): T.UserAttributesState['isLoading'] => {
  switch (action.type) {
    case actionTypes.CREATE_USER_ATTRIBUTES_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTES_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTE_REQUEST:
    case actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST:
    case actionTypes.SET_USER_ATTRIBUTE_REQUEST:
    case actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST:
      return true;
    case actionTypes.CREATE_USER_ATTRIBUTES_FAILURE:
    case actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS:
    case actionTypes.FETCH_USER_ATTRIBUTES_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS:
    case actionTypes.FETCH_USER_ATTRIBUTE_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.SET_USER_ATTRIBUTE_FAILURE:
    case actionTypes.SET_USER_ATTRIBUTE_SUCCESS:
    case actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

type ErrorAction =
  | T.CreateUserAttributesFailureAction
  | T.FetchUserAttributeFailureAction
  | T.FetchUserAttributesFailureAction
  | T.RemoveUserAttributeFailureAction
  | T.SetUserAttributeFailureAction
  | T.UpdateUserAttributeFailureAction;

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): T.UserAttributesState['error'] => {
  switch (action.type) {
    case actionTypes.CREATE_USER_ATTRIBUTES_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTES_REQUEST:
    case actionTypes.FETCH_USER_ATTRIBUTE_REQUEST:
    case actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST:
    case actionTypes.SET_USER_ATTRIBUTE_REQUEST:
    case actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.CREATE_USER_ATTRIBUTES_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTES_FAILURE:
    case actionTypes.FETCH_USER_ATTRIBUTE_FAILURE:
    case actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE:
    case actionTypes.SET_USER_ATTRIBUTE_FAILURE:
    case actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE:
      return (action as ErrorAction).payload.error;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): T.UserAttributesState['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS:
      return (action as T.FetchUserAttributesSuccessAction).payload;
    case actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS:
      let currentResult = state;

      if (!currentResult || !Array.isArray(currentResult)) {
        currentResult = [];
      }

      const actionSafe = action as T.FetchUserAttributeSuccessAction;
      const newResult = [...currentResult];

      const index = currentResult.findIndex(
        attribute => attribute?.id === actionSafe.payload.id,
      );

      if (index !== -1) {
        newResult[index] = actionSafe.payload;
      } else {
        newResult.push(actionSafe.payload);
      }

      return newResult;

    default:
      return state;
  }
};

const attributesReducer = combineReducers({
  isLoading,
  result,
  error,
});

export default attributesReducer;
