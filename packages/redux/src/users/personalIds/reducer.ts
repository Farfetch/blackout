import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { createReducerWithResult } from '../../helpers/reducerFactory.js';
import type * as T from './types/index.js';

export const INITIAL_STATE: T.UserPersonalIdsState = {
  result: null,
  error: null,
  isLoading: false,
  defaultPersonalId: {
    result: null,
    error: null,
    isLoading: false,
  },
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AnyAction,
): T.UserPersonalIdsState['isLoading'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST:
    case actionTypes.CREATE_USER_PERSONAL_ID_REQUEST:
    case actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST:
    case actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST:
    case actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_REQUEST:
    case actionTypes.FETCH_USER_PERSONAL_ID_REQUEST:
    case actionTypes.UPDATE_USER_PERSONAL_ID_REQUEST:
    case actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST:
      return true;
    case actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE:
    case actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS:
    case actionTypes.CREATE_USER_PERSONAL_ID_FAILURE:
    case actionTypes.CREATE_USER_PERSONAL_ID_SUCCESS:
    case actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE:
    case actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_SUCCESS:
    case actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE:
    case actionTypes.SET_USER_DEFAULT_PERSONAL_ID_SUCCESS:
    case actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_FAILURE:
    case actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_SUCCESS:
    case actionTypes.FETCH_USER_PERSONAL_ID_FAILURE:
    case actionTypes.FETCH_USER_PERSONAL_ID_SUCCESS:
    case actionTypes.UPDATE_USER_PERSONAL_ID_FAILURE:
    case actionTypes.UPDATE_USER_PERSONAL_ID_SUCCESS:
    case actionTypes.REMOVE_USER_PERSONAL_ID_FAILURE:
    case actionTypes.REMOVE_USER_PERSONAL_ID_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

type ErrorAction =
  | T.FetchUserPersonalIdsFailureAction
  | T.CreateUserPersonalIdFailureAction
  | T.FetchUserDefaultPersonalIdFailureAction
  | T.SetUserDefaultPersonalIdFailureAction;

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): T.UserPersonalIdsState['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PERSONAL_IDS_REQUEST:
    case actionTypes.CREATE_USER_PERSONAL_ID_REQUEST:
    case actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_REQUEST:
    case actionTypes.SET_USER_DEFAULT_PERSONAL_ID_REQUEST:
    case actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_REQUEST:
    case actionTypes.FETCH_USER_PERSONAL_ID_REQUEST:
    case actionTypes.UPDATE_USER_PERSONAL_ID_REQUEST:
    case actionTypes.REMOVE_USER_PERSONAL_ID_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.FETCH_USER_PERSONAL_IDS_FAILURE:
    case actionTypes.CREATE_USER_PERSONAL_ID_FAILURE:
    case actionTypes.FETCH_USER_DEFAULT_PERSONAL_ID_FAILURE:
    case actionTypes.SET_USER_DEFAULT_PERSONAL_ID_FAILURE:
    case actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_FAILURE:
    case actionTypes.FETCH_USER_PERSONAL_ID_FAILURE:
    case actionTypes.UPDATE_USER_PERSONAL_ID_FAILURE:
    case actionTypes.REMOVE_USER_PERSONAL_ID_FAILURE:
      return (action as ErrorAction).payload.error;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): T.UserPersonalIdsState['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PERSONAL_IDS_SUCCESS:
      return (action as T.FetchUserPersonalIdsSuccessAction).payload;
    case actionTypes.FETCH_USER_PERSONAL_ID_SUCCESS:
      let currentResult = state;

      if (!currentResult || !Array.isArray(currentResult)) {
        currentResult = [];
      }

      const actionSafe = action as T.FetchUserPersonalIdSuccessAction;
      const newResult = [...currentResult];

      const index = currentResult.findIndex(
        personalId => personalId?.id === actionSafe.payload.id,
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

const defaultPersonalId = createReducerWithResult(
  'FETCH_USER_DEFAULT_PERSONAL_ID',
  INITIAL_STATE.defaultPersonalId,
  actionTypes,
);

export const getError = (
  state: T.UserPersonalIdsState,
): T.UserPersonalIdsState['error'] => state.error;
export const getIsLoading = (
  state: T.UserPersonalIdsState,
): T.UserPersonalIdsState['isLoading'] => state.isLoading;
export const getResult = (
  state: T.UserPersonalIdsState,
): T.UserPersonalIdsState['result'] => state.result;
export const getDefaultPersonalId = (
  state: T.UserPersonalIdsState,
): T.UserPersonalIdsState['defaultPersonalId'] => state.defaultPersonalId;

const reducer = combineReducers({
  isLoading,
  result,
  error,
  defaultPersonalId,
});

/**
 * Reducer for personal ids state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const personalIdsReducer: Reducer<T.UserPersonalIdsState> = (state, action) => {
  if (action.type === actionTypes.RESET_USER_PERSONAL_IDS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default personalIdsReducer;
