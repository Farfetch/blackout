import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { FormsResult, FormsState } from './types/index.js';

export const INITIAL_STATE: FormsState = {
  result: {},
  error: {},
  isLoading: {},
  isSubmitFormLoading: {},
  submitFormError: {},
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_FORM_SCHEMA_REQUEST:
      return {
        ...state,
        [action.meta.schemaCode]: true,
      };
    case actionTypes.FETCH_FORM_SCHEMA_FAILURE:
      return {
        ...state,
        [action.meta.schemaCode]: false,
      };
    case actionTypes.FETCH_FORM_SCHEMA_SUCCESS:
      return {
        ...state,
        [action.meta.schemaCode]: false,
      };
    default:
      return state;
  }
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_FORM_SCHEMA_FAILURE:
      return {
        ...state,
        [action.meta.schemaCode]: action.payload?.error,
      };
    case actionTypes.FETCH_FORM_SCHEMA_REQUEST:
      return {
        ...state,
        [action.meta.schemaCode]: null,
      };
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): FormsResult => {
  switch (action.type) {
    case actionTypes.FETCH_FORM_SCHEMA_SUCCESS:
      return {
        ...state,
        [action.meta.schemaCode]: action.payload,
      };
    default:
      return state;
  }
};

const isSubmitFormLoading = (
  state = INITIAL_STATE.isSubmitFormLoading,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.SUBMIT_FORM_REQUEST:
      return {
        ...state,
        [action.meta.schemaCode]: true,
      };
    case actionTypes.SUBMIT_FORM_FAILURE:
      return {
        ...state,
        [action.meta.schemaCode]: false,
      };
    case actionTypes.SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        [action.meta.schemaCode]: false,
      };
    default:
      return state;
  }
};

const submitFormError = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SUBMIT_FORM_FAILURE:
      return {
        ...state,
        [action.meta.schemaCode]: action.payload?.error,
      };
    case actionTypes.SUBMIT_FORM_REQUEST:
      return {
        ...state,
        [action.meta.schemaCode]: null,
      };
    default:
      return state;
  }
};

export const getFormsSchemas = (
  state: FormsState = INITIAL_STATE,
): FormsState['result'] => state.result;
export const getFormsError = (
  state: FormsState = INITIAL_STATE,
): FormsState['error'] => state.error;
export const getFormsIsLoading = (
  state: FormsState = INITIAL_STATE,
): FormsState['isLoading'] => state.isLoading;
export const getSubmitFormDataIsLoading = (
  state: FormsState = INITIAL_STATE,
): FormsState['isSubmitFormLoading'] => state.isSubmitFormLoading;
export const getSubmitFormDataError = (
  state: FormsState = INITIAL_STATE,
): FormsState['submitFormError'] => state.submitFormError;

const reducers = combineReducers({
  isLoading,
  error,
  result,
  isSubmitFormLoading,
  submitFormError,
});

/**
 * Reducer for forms state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */

const formsReducer: Reducer<FormsState> = (state = INITIAL_STATE, action) => {
  if (action.type === actionTypes.RESET_FORM_SCHEMAS) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default formsReducer;
