import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../../authentication/redux/actionTypes';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  result: null,
};
const result = (state = INITIAL_STATE.result, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_SHARED_WISHLIST_SUCCESS:
    case actionTypes.FETCH_SHARED_WISHLIST_SUCCESS:
    case actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const error = (state = INITIAL_STATE.error, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_SHARED_WISHLIST_FAILURE:
    case actionTypes.FETCH_SHARED_WISHLIST_FAILURE:
    case actionTypes.REMOVE_SHARED_WISHLIST_FAILURE:
    case actionTypes.UPDATE_SHARED_WISHLIST_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_SHARED_WISHLIST_REQUEST:
    case actionTypes.FETCH_SHARED_WISHLIST_REQUEST:
    case actionTypes.REMOVE_SHARED_WISHLIST_REQUEST:
    case actionTypes.UPDATE_SHARED_WISHLIST_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_SHARED_WISHLIST_REQUEST:
    case actionTypes.FETCH_SHARED_WISHLIST_REQUEST:
    case actionTypes.REMOVE_SHARED_WISHLIST_REQUEST:
    case actionTypes.UPDATE_SHARED_WISHLIST_REQUEST:
      return true;
    case actionTypes.CREATE_SHARED_WISHLIST_FAILURE:
    case actionTypes.CREATE_SHARED_WISHLIST_SUCCESS:
    case actionTypes.FETCH_SHARED_WISHLIST_FAILURE:
    case actionTypes.FETCH_SHARED_WISHLIST_SUCCESS:
    case actionTypes.REMOVE_SHARED_WISHLIST_FAILURE:
    case actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS:
    case actionTypes.UPDATE_SHARED_WISHLIST_FAILURE:
    case actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

//
// Entities mapper
//

export const entitiesMapper = {
  [actionTypes.RESET_SHARED_WISHLIST_ENTITIES]: state => {
    if (!state) {
      return state;
    }

    const { sharedWishlists, sharedWishlistItems, ...rest } = state;

    return rest;
  },
  [actionTypes.LOGOUT_SUCCESS]: state => {
    if (!state) {
      return state;
    }

    const { sharedWishlists, sharedWishlistItems, ...rest } = state;

    return rest;
  },
};

//
// Selectors from reducer
//

export const getError = state => state.error;
export const getResult = state => state.result;
export const getIsLoading = state => state.isLoading;

//
// Combining and exporting
//

const reducer = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for shared wishlists state.
 *
 * @function sharedWishlistReducer
 * @static
 * @memberof module:sharedWishlist/reducer
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  if (action.type === actionTypes.RESET_SHARED_WISHLIST_ENTITIES) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    }

    const reducerFn = (acc, field) => {
      if (!state) {
        return state;
      }
      return { ...acc, [field]: INITIAL_STATE[field] };
    };
    return fieldsToReset.reduce(reducerFn, state);
  }
  return reducer(state, action);
};
