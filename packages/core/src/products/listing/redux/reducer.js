/**
 * @module products/listing/reducer
 * @category Products listing
 * @subcategory Reducer
 */
import { combineReducers } from 'redux';
import {
  DEHYDRATE_LISTING,
  GET_LISTING_FACETS_FAILURE,
  GET_LISTING_FACETS_REQUEST,
  GET_LISTING_FACETS_SUCCESS,
  GET_LISTING_FAILURE,
  GET_LISTING_REQUEST,
  GET_LISTING_SUCCESS,
  RESET_LISTING_ENTITIES,
  RESET_LISTING_FACETS,
  RESET_LISTING_STATE,
  SET_LISTING_HASH,
} from './actionTypes';

export const INITIAL_STATE = {
  error: {},
  hash: null,
  isHydrated: {},
  isLoading: {},
  listingFacets: {
    isLoading: false,
    error: null,
    result: [],
  },
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

const listingFacets = (state = INITIAL_STATE.listingFacets, action = {}) => {
  switch (action.type) {
    case GET_LISTING_FACETS_REQUEST:
      return {
        ...INITIAL_STATE.listingFacets,
        isLoading: true,
      };
    case GET_LISTING_FACETS_SUCCESS:
      return {
        ...INITIAL_STATE.listingFacets,
        result: action.payload.result,
      };
    case GET_LISTING_FACETS_FAILURE:
      return {
        ...INITIAL_STATE.listingFacets,
        error: action.payload.error,
      };
    case RESET_LISTING_FACETS:
      return INITIAL_STATE.listingFacets;
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getHash = state => state.hash;
export const getIsHydrated = state => state.isHydrated;
export const getIsLoading = state => state.isLoading;
export const getListingFacetsState = state => state.listingFacets;

const reducers = combineReducers({
  error,
  hash,
  isHydrated,
  isLoading,
  listingFacets,
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
