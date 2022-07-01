import * as actionTypes from '../actionTypes';
import { AnyAction, combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes';
import omit from 'lodash/omit';
import type {
  AddWishlistSetFailureAction,
  AddWishlistSetRequestAction,
  AddWishlistSetSuccessAction,
  FetchWishlistSetFailureAction,
  FetchWishlistSetRequestAction,
  FetchWishlistSetsFailureAction,
  FetchWishlistSetsRequestAction,
  FetchWishlistSetsSuccessAction,
  FetchWishlistSetSuccessAction,
  FetchWishlistSuccessAction,
  RemoveWishlistSetFailureAction,
  RemoveWishlistSetRequestAction,
  RemoveWishlistSetSuccessAction,
  UpdateWishlistSetFailureAction,
  UpdateWishlistSetRequestAction,
  UpdateWishlistSetSuccessAction,
  WishlistSetsState,
} from '../types';
import type { ReducerSwitch, StoreState } from '../../types';

export const INITIAL_STATE: WishlistSetsState = {
  error: null,
  ids: null,
  isLoading: false,
  set: {
    error: {},
    isLoading: {},
  },
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchWishlistSetsFailureAction
    | AddWishlistSetFailureAction
    | FetchWishlistSetsRequestAction
    | AddWishlistSetRequestAction
    | RemoveWishlistSetRequestAction
    | UpdateWishlistSetRequestAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_WISHLIST_SETS_FAILURE:
    case actionTypes.ADD_WISHLIST_SET_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_WISHLIST_SETS_REQUEST:
    case actionTypes.ADD_WISHLIST_SET_REQUEST:
    case actionTypes.REMOVE_WISHLIST_SET_REQUEST:
    case actionTypes.UPDATE_WISHLIST_SET_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const ids = (
  state = INITIAL_STATE.ids,
  action:
    | FetchWishlistSetsSuccessAction
    | AddWishlistSetSuccessAction
    | RemoveWishlistSetSuccessAction
    | FetchWishlistSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_WISHLIST_SETS_SUCCESS:
      return action.payload.result;
    case actionTypes.ADD_WISHLIST_SET_SUCCESS:
      return state
        ? [...state, action.payload.result]
        : [action.payload.result];
    case actionTypes.REMOVE_WISHLIST_SET_SUCCESS:
      return state?.filter(id => id !== action.meta.wishlistSetId);
    case actionTypes.FETCH_WISHLIST_SUCCESS:
      return INITIAL_STATE.ids;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | FetchWishlistSetsRequestAction
    | AddWishlistSetRequestAction
    | FetchWishlistSetsSuccessAction
    | FetchWishlistSetsFailureAction
    | AddWishlistSetSuccessAction
    | AddWishlistSetFailureAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_WISHLIST_SETS_REQUEST:
    case actionTypes.ADD_WISHLIST_SET_REQUEST:
      return true;
    case actionTypes.FETCH_WISHLIST_SETS_SUCCESS:
    case actionTypes.FETCH_WISHLIST_SETS_FAILURE:
    case actionTypes.ADD_WISHLIST_SET_SUCCESS:
    case actionTypes.ADD_WISHLIST_SET_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const set = (
  state = INITIAL_STATE.set,
  action:
    | RemoveWishlistSetRequestAction
    | FetchWishlistSetRequestAction
    | UpdateWishlistSetRequestAction
    | RemoveWishlistSetSuccessAction
    | FetchWishlistSetSuccessAction
    | UpdateWishlistSetSuccessAction
    | RemoveWishlistSetFailureAction
    | FetchWishlistSetFailureAction
    | UpdateWishlistSetFailureAction,
) => {
  switch (action.type) {
    case actionTypes.REMOVE_WISHLIST_SET_REQUEST:
    case actionTypes.FETCH_WISHLIST_SET_REQUEST:
    case actionTypes.UPDATE_WISHLIST_SET_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.wishlistSetId]: true,
        },
        error: {
          ...state.error,
          [action.meta.wishlistSetId]: null,
        },
      };
    case actionTypes.REMOVE_WISHLIST_SET_SUCCESS:
    case actionTypes.FETCH_WISHLIST_SET_SUCCESS:
    case actionTypes.UPDATE_WISHLIST_SET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.wishlistSetId]: false,
        },
      };
    case actionTypes.REMOVE_WISHLIST_SET_FAILURE:
    case actionTypes.FETCH_WISHLIST_SET_FAILURE:
    case actionTypes.UPDATE_WISHLIST_SET_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.wishlistSetId]: false,
        },
        error: {
          ...state.error,
          [action.meta.wishlistSetId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

//
// Entities mapper
//
export const entitiesMapper = {
  [actionTypes.REMOVE_WISHLIST_SET_SUCCESS as typeof actionTypes.REMOVE_WISHLIST_SET_SUCCESS]:
    (
      state: StoreState['entities'],
      { meta: { wishlistSetId } }: AnyAction,
    ): StoreState['entities'] => {
      if (!state) {
        return state;
      }

      const { wishlistSets, ...rest } = state;

      return {
        ...rest,
        wishlistSets: omit(wishlistSets, wishlistSetId),
      };
    },
  [actionTypes.RESET_WISHLIST_SETS_ENTITIES as typeof actionTypes.RESET_WISHLIST_SETS_ENTITIES]:
    (state: StoreState['entities']): StoreState['entities'] => {
      if (!state) {
        return state;
      }

      const { wishlistSets, ...rest } = state;

      return rest;
    },
};

//
// Selectors from reducer
//
export const getError = (
  state: WishlistSetsState,
): WishlistSetsState['error'] => state.error;
export const getIds = (state: WishlistSetsState): WishlistSetsState['ids'] =>
  state.ids;
export const getIsLoading = (
  state: WishlistSetsState,
): WishlistSetsState['isLoading'] => state.isLoading;
export const getSetError = (
  state: WishlistSetsState,
): WishlistSetsState['set']['error'] => state.set.error;
export const getIsSetLoading = (
  state: WishlistSetsState,
): WishlistSetsState['set']['isLoading'] => state.set.isLoading;

//
// Combining and exporting
//
export const reducer = combineReducers({
  error,
  ids,
  isLoading,
  set,
});

/**
 * Reducer for wishlistsSets state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const wishlistsSetsReducer: ReducerSwitch<WishlistSetsState> = (
  state,
  action,
) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  if (action.type === actionTypes.RESET_WISHLIST_SETS_STATE) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    } else {
      const reducerFn = (
        acc: WishlistSetsState,
        field: keyof WishlistSetsState,
      ) => {
        if (state?.set[field as keyof WishlistSetsState['set']]) {
          return {
            ...acc,
            [field]: INITIAL_STATE[field],
            set: {
              ...acc.set,
              [field]:
                INITIAL_STATE.set[field as keyof WishlistSetsState['set']],
            },
          };
        }

        return { ...acc, [field]: INITIAL_STATE[field] };
      };

      return fieldsToReset.reduce(reducerFn, state);
    }
  }

  return reducer(state, action);
};

export default wishlistsSetsReducer;
