/**
 * @module forms/reducer
 * @category Forms
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  result: {},
  error: {},
  isLoading: {},
  isSubmitFormLoading: {},
  submitFormError: {},
};

const isLoading = (state = INITIAL_STATE.isLoading, action) => {
  switch (action.type) {
    case actionTypes.GET_FORM_SCHEMA_REQUEST:
      return {
        ...state,
        [action.meta.schemaCode]: true,
      };
    case actionTypes.GET_FORM_SCHEMA_FAILURE:
      return {
        ...state,
        [action.meta.schemaCode]: false,
      };
    case actionTypes.GET_FORM_SCHEMA_SUCCESS:
      return {
        ...state,
        [action.meta.schemaCode]: false,
      };
    default:
      return state;
  }
};

const error = (state = INITIAL_STATE.error, action) => {
  switch (action.type) {
    case actionTypes.GET_FORM_SCHEMA_FAILURE:
      return {
        ...state,
        [action.meta.schemaCode]: action.payload.error,
      };
    case actionTypes.GET_FORM_SCHEMA_REQUEST:
      return {
        ...state,
        [action.meta.schemaCode]: null,
      };
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action) => {
  switch (action.type) {
    case actionTypes.GET_FORM_SCHEMA_SUCCESS:
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
  action,
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

const submitFormError = (state = INITIAL_STATE.error, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_FORM_FAILURE:
      return {
        ...state,
        [action.meta.schemaCode]: action.payload.error,
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

export const getFormsSchemas = state => state.result;
export const getFormsError = state => state.error;
export const getFormsIsLoading = state => state.isLoading;
export const getPostFormDataIsLoading = state => state.isSubmitFormLoading;
export const getPostFormDataError = state => state.submitFormError;

const forms = combineReducers({
  isLoading,
  error,
  result,
  isSubmitFormLoading,
  submitFormError,
});

/**
 * Reducer for forms state.
 *
 * @function formsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_SCHEMAS) {
    state = INITIAL_STATE;
  }

  return forms(state, action);
};
