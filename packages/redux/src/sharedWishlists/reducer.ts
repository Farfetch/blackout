import * as actionTypes from './actionTypes';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import type { SharedWishlistState } from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: SharedWishlistState = {
  error: null,
  isLoading: false,
  result: null,
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_SHARED_WISHLIST_SUCCESS:
    case actionTypes.FETCH_SHARED_WISHLIST_SUCCESS:
    case actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_SHARED_WISHLIST_FAILURE:
    case actionTypes.FETCH_SHARED_WISHLIST_FAILURE:
    case actionTypes.UPDATE_SHARED_WISHLIST_FAILURE:
    case actionTypes.REMOVE_SHARED_WISHLIST_FAILURE:
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

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
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
  [actionTypes.RESET_SHARED_WISHLIST_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
  ) => {
    if (!state) {
      return state;
    }

    const { sharedWishlists, sharedWishlistItems, ...rest } = state;

    return rest;
  },
  [LOGOUT_SUCCESS]: (state: NonNullable<StoreState['entities']>) => {
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
export const getError = (
  state: SharedWishlistState,
): SharedWishlistState['error'] => state.error;
export const getResult = (
  state: SharedWishlistState,
): SharedWishlistState['result'] => state.result;
export const getIsLoading = (
  state: SharedWishlistState,
): SharedWishlistState['isLoading'] => state.isLoading;

//
// Combining and exporting
//
const reducer = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for wishlists state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const sharedWishlistsReducer: Reducer<SharedWishlistState> = (
  state,
  action,
) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  if (action.type === actionTypes.RESET_SHARED_WISHLIST_STATE) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    }

    const reducerFn = (
      acc: SharedWishlistState,
      field: keyof SharedWishlistState,
    ) => {
      if (!state) {
        return state;
      }

      return { ...acc, [field]: INITIAL_STATE[field] };
    };

    return fieldsToReset.reduce(reducerFn, state);
  }

  return reducer(state, action);
};

export default sharedWishlistsReducer;
