/**
 * @module products/listing/reducer
 * @category Products listing
 * @subcategory Reducer
 */
import { combineReducers } from 'redux';
import {
  DEHYDRATE_LISTING,
  GET_LISTING_FAILURE,
  GET_LISTING_REQUEST,
  GET_LISTING_SUCCESS,
  RESET_LISTING_ENTITIES,
  RESET_LISTING_STATE,
  SET_LISTING_HASH,
} from './actionTypes';

export const INITIAL_STATE = {
  error: {},
  hash: null,
  isHydrated: {},
  isLoading: {},
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case GET_LISTING_REQUEST:
      return {
        ...state,
        [action.payload.hash]: undefined,
      };
    case GET_LISTING_FAILURE:
      return {
        ...state,
        [action.payload.hash]: action.payload.error,
      };
    default:
      return state;
  }
};

const hash = (
  state = INITIAL_STATE.hash,
  /* istanbul ignore next */ action = {},
) => {
  if (action.type === SET_LISTING_HASH) {
    return action.payload.hash;
  }
  return state;
};

const isHydrated = (
  state = INITIAL_STATE.isHydrated,
  /* istanbul ignore next */ action = {},
) => {
  if (action.type === DEHYDRATE_LISTING) {
    return {
      ...state,
      [action.payload.hash]: false,
    };
  }
  return state;
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case GET_LISTING_REQUEST:
      return {
        ...state,
        [action.payload.hash]: true,
      };
    case GET_LISTING_SUCCESS:
      return {
        ...state,
        [action.payload.hash]: false,
      };
    case GET_LISTING_FAILURE:
      return {
        ...state,
        [action.payload.hash]: undefined,
      };
    default:
      return state;
  }
};

export const entitiesMapper = {
  [RESET_LISTING_ENTITIES]: state => {
    const { products, searchResults, ...rest } = state;

    return rest;
  },
};

export const getError = state => state.error;
export const getHash = state => state.hash;
export const getIsHydrated = state => state.isHydrated;
export const getIsLoading = state => state.isLoading;

const reducers = combineReducers({
  error,
  hash,
  isHydrated,
  isLoading,
});

/**
 * Reducer for products listing state.
 *
 * @function productsListingReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === RESET_LISTING_STATE) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
