import * as actionTypes from '../actionTypes';
import { combineReducers, Reducer } from 'redux';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes';
import wishlistsSetReducer, {
  INITIAL_STATE as SETS_INITIAL_STATE,
} from './wishlistsSets';
import type {
  AddWishlistItemFailureAction,
  AddWishlistItemRequestAction,
  AddWishlistItemSuccessAction,
  FetchWishlistFailureAction,
  FetchWishlistRequestAction,
  FetchWishlistSuccessAction,
  RemoveWishlistItemFailureAction,
  RemoveWishlistItemRequestAction,
  RemoveWishlistItemSuccessAction,
  UpdateWishlistItemFailureAction,
  UpdateWishlistItemRequestAction,
  UpdateWishlistItemSuccessAction,
  WishlistSetsState,
  WishlistsState,
} from '../types';
import type { ReducerSwitch, StoreState } from '../../types';

export const INITIAL_STATE: WishlistsState = {
  error: null,
  id: null,
  isLoading: false,
  result: {},
  items: {
    ids: null,
    item: {
      error: {},
      isLoading: {},
    },
  },
  sets: SETS_INITIAL_STATE,
};

const result = (
  state = INITIAL_STATE.result,
  action:
    | FetchWishlistSuccessAction
    | AddWishlistItemSuccessAction
    | RemoveWishlistItemSuccessAction
    | UpdateWishlistItemSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_WISHLIST_SUCCESS:
    case actionTypes.ADD_WISHLIST_ITEM_SUCCESS:
    case actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS:
    case actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | FetchWishlistRequestAction
    | FetchWishlistFailureAction
    | AddWishlistItemRequestAction
    | AddWishlistItemFailureAction
    | RemoveWishlistItemRequestAction
    | UpdateWishlistItemRequestAction,
) => {
  switch (action.type) {
    case actionTypes.ADD_WISHLIST_ITEM_FAILURE:
    case actionTypes.FETCH_WISHLIST_FAILURE:
      return action.payload.error;
    case actionTypes.ADD_WISHLIST_ITEM_REQUEST:
    case actionTypes.REMOVE_WISHLIST_ITEM_REQUEST:
    case actionTypes.FETCH_WISHLIST_REQUEST:
    case actionTypes.UPDATE_WISHLIST_ITEM_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const idReducer = (
  state = INITIAL_STATE.id,
  action: FetchWishlistSuccessAction,
) => {
  if (action.type === actionTypes.FETCH_WISHLIST_SUCCESS) {
    return action.payload.result.id;
  }
  return state;
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | AddWishlistItemRequestAction
    | AddWishlistItemSuccessAction
    | AddWishlistItemFailureAction
    | FetchWishlistRequestAction
    | FetchWishlistSuccessAction
    | FetchWishlistFailureAction,
) => {
  switch (action.type) {
    case actionTypes.ADD_WISHLIST_ITEM_REQUEST:
    case actionTypes.FETCH_WISHLIST_REQUEST:
      return true;
    case actionTypes.ADD_WISHLIST_ITEM_FAILURE:
    case actionTypes.ADD_WISHLIST_ITEM_SUCCESS:
    case actionTypes.FETCH_WISHLIST_FAILURE:
    case actionTypes.FETCH_WISHLIST_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const itemsReducer = (
  state = INITIAL_STATE.items,
  action:
    | AddWishlistItemSuccessAction
    | FetchWishlistSuccessAction
    | RemoveWishlistItemRequestAction
    | UpdateWishlistItemRequestAction
    | RemoveWishlistItemSuccessAction
    | UpdateWishlistItemSuccessAction
    | RemoveWishlistItemFailureAction
    | UpdateWishlistItemFailureAction,
) => {
  switch (action.type) {
    case actionTypes.ADD_WISHLIST_ITEM_SUCCESS:
    case actionTypes.FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        ids: action.payload.result.items,
      };
    case actionTypes.REMOVE_WISHLIST_ITEM_REQUEST:
    case actionTypes.UPDATE_WISHLIST_ITEM_REQUEST:
      return {
        ...state,
        item: {
          isLoading: {
            ...state.item.isLoading,
            [action.meta.wishlistItemId]: true,
          },
          error: {
            ...state.item.error,
            [action.meta.wishlistItemId]: null,
          },
        },
      };
    case actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS:
    case actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS:
      return {
        ids: action.payload.result.items,
        item: {
          ...state.item,
          isLoading: {
            ...state.item.isLoading,
            [action.meta.wishlistItemId]: false,
          },
        },
      };
    case actionTypes.REMOVE_WISHLIST_ITEM_FAILURE:
    case actionTypes.UPDATE_WISHLIST_ITEM_FAILURE:
      return {
        ...state,
        item: {
          isLoading: {
            ...state.item.isLoading,
            [action.meta.wishlistItemId]: false,
          },
          error: {
            ...state.item.error,
            [action.meta.wishlistItemId]: action.payload.error,
          },
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
  [actionTypes.RESET_WISHLIST_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    const { wishlistItems, wishlistSets, ...rest } = state;

    return rest;
  },
  [LOGOUT_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    const { wishlistItems, wishlistSets, ...rest } = state as NonNullable<
      StoreState['entities']
    >;

    return rest;
  },
};

//
// Selectors from reducer
//
export const getError = (state: WishlistsState): WishlistsState['error'] =>
  state.error;
export const getId = (state: WishlistsState): WishlistsState['id'] => state.id;
export const getResult = (state: WishlistsState): WishlistsState['result'] =>
  state.result;
export const getIsLoading = (
  state: WishlistsState,
): WishlistsState['isLoading'] => state.isLoading;
export const getItemsIds = (
  state: WishlistsState,
): WishlistsState['items']['ids'] => state.items.ids;
export const getAreItemsLoading = (
  state: WishlistsState,
): WishlistsState['items']['item']['isLoading'] => state.items.item.isLoading;
export const getItemsError = (
  state: WishlistsState,
): WishlistsState['items']['item']['error'] => state.items.item.error;

//
// Combining and exporting
//
const reducer = combineReducers({
  error,
  isLoading,
  result,
  id: idReducer,
  items: itemsReducer,
  sets: wishlistsSetReducer as Reducer<WishlistSetsState>,
});

/**
 * Reducer for wishlists state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const wishlistsReducer: ReducerSwitch<WishlistsState> = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  if (action.type === actionTypes.RESET_WISHLIST_STATE) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    } else {
      const reducerFn = (acc: WishlistsState, field: keyof WishlistsState) => {
        if (!state) {
          return state;
        }

        if (
          state.items[field as keyof WishlistsState['items']] ||
          state.items.item[field as keyof WishlistsState['items']['item']]
        ) {
          return {
            ...acc,
            [field]: INITIAL_STATE[field],
            items: {
              ...acc.items,
              [field]:
                INITIAL_STATE.items[field as keyof WishlistsState['items']],
              item: {
                ...acc.items.item,
                [field]:
                  INITIAL_STATE.items.item[
                    field as keyof WishlistsState['items']['item']
                  ],
              },
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

export default wishlistsReducer;
