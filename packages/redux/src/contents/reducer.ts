import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import type { ContentsState } from './types/index.js';

export const INITIAL_STATE_CONTENT: ContentsState = {
  searchResults: {},
  contentTypes: {
    error: undefined,
    isLoading: false,
    result: null,
  },
  metadata: {
    error: {},
    isLoading: {},
    result: null,
  },
};

const searchResults = (
  state = INITIAL_STATE_CONTENT.searchResults,
  action: AnyAction,
): ContentsState['searchResults'] => {
  switch (action.type) {
    case actionTypes.FETCH_CONTENTS_REQUEST:
    case actionTypes.FETCH_CONTENT_PAGES_REQUEST:
    case actionTypes.FETCH_COMMERCE_PAGES_REQUEST:
      return {
        ...state,
        [action.payload.hash]: {
          error: null,
          isLoading: true,
        },
      };
    case actionTypes.FETCH_CONTENTS_SUCCESS:
    case actionTypes.FETCH_CONTENT_PAGES_SUCCESS:
    case actionTypes.FETCH_COMMERCE_PAGES_SUCCESS:
      return {
        ...state,
        [action.payload.hash]: {
          isLoading: false,
          result: action.payload.result,
        },
      };
    case actionTypes.FETCH_CONTENTS_FAILURE:
    case actionTypes.FETCH_CONTENT_PAGES_FAILURE:
    case actionTypes.FETCH_COMMERCE_PAGES_FAILURE:
      return {
        ...state,
        [action.payload.hash]: {
          isLoading: undefined,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const contentTypes = (
  state = INITIAL_STATE_CONTENT.contentTypes,
  action: AnyAction,
): ContentsState['contentTypes'] => {
  switch (action.type) {
    case actionTypes.FETCH_CONTENT_TYPES_REQUEST:
      return {
        isLoading: true,
        error: INITIAL_STATE_CONTENT.contentTypes.error,
      };
    case actionTypes.FETCH_CONTENT_TYPES_SUCCESS:
      return {
        result: action.payload,
        isLoading: false,
      };
    case actionTypes.FETCH_CONTENT_TYPES_FAILURE:
      return {
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

const metadata = (
  state = INITIAL_STATE_CONTENT.metadata,
  action: AnyAction,
): ContentsState['metadata'] => {
  switch (action.type) {
    case actionTypes.FETCH_SEO_METADATA_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.pathname]: true,
        },
        error: {
          ...state.error,
          [action.payload.pathname]: null,
        },
      };
    case actionTypes.FETCH_SEO_METADATA_SUCCESS:
      return {
        ...state,
        result: {
          ...state.result,
          [action.payload.pathname]: action.payload.result,
        },
        isLoading: {
          ...state.isLoading,
          [action.payload.pathname]: false,
        },
      };
    case actionTypes.FETCH_SEO_METADATA_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.pathname]: undefined,
        },
        error: {
          ...state.error,
          [action.payload.pathname]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export const getContentResult = (
  state: ContentsState,
): ContentsState['searchResults'] => state.searchResults;
export const getContentTypes = (
  state: ContentsState,
): ContentsState['contentTypes'] => state.contentTypes;
export const getSEOmetadata = (
  state: ContentsState,
): ContentsState['metadata'] => state.metadata;
export const getContentTypesError = (
  state: ContentsState,
): ContentsState['contentTypes']['error'] => state.contentTypes.error;

const reducers = combineReducers({
  searchResults,
  contentTypes,
  metadata,
});

/**
 * Reducer for contents state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const contentsReducer: Reducer<ContentsState> = (state, action) => {
  if (action.type === actionTypes.RESET_CONTENTS) {
    return reducers(INITIAL_STATE_CONTENT, action);
  }

  return reducers(state, action);
};

export default contentsReducer;
