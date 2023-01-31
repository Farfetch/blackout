import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';
import { createMergedObject } from '../../../helpers/redux';
import wishlistsSetReducer, {
  INITIAL_STATE as SETS_INITIAL_STATE,
} from './wishlistsSets';

const INITIAL_STATE = {
  error: null,
  id: null,
  isLoading: false,
  wishlistItems: {
    error: {},
    isLoading: {},
  },
  wishlistSets: SETS_INITIAL_STATE,
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_WISHLIST_FAILURE:
    case actionTypes.GET_WISHLIST_FAILURE:
      return action.payload.error;
    case actionTypes.ADD_ITEM_TO_WISHLIST_REQUEST:
    case actionTypes.DELETE_WISHLIST_ITEM_REQUEST:
    case actionTypes.GET_WISHLIST_REQUEST:
    case actionTypes.UPDATE_WISHLIST_ITEM_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const idReducer = (
  state = INITIAL_STATE.id,
  /* istanbul ignore next */ action = {},
) => {
  if (action.type === actionTypes.GET_WISHLIST_SUCCESS) {
    return action.payload.result;
  }
  return state;
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_WISHLIST_REQUEST:
    case actionTypes.GET_WISHLIST_REQUEST:
      return true;
    case actionTypes.ADD_ITEM_TO_WISHLIST_FAILURE:
    case actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS:
    case actionTypes.GET_WISHLIST_FAILURE:
    case actionTypes.GET_WISHLIST_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const wishlistItemsReducer = (
  state = INITIAL_STATE.wishlistItems,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.DELETE_WISHLIST_ITEM_REQUEST:
    case actionTypes.UPDATE_WISHLIST_ITEM_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.wishlistItemId]: true,
        },
        error: {
          ...state.error,
          [action.meta.wishlistItemId]: null,
        },
      };
    case actionTypes.DELETE_WISHLIST_ITEM_SUCCESS:
    case actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.wishlistItemId]: false,
        },
      };
    case actionTypes.DELETE_WISHLIST_ITEM_FAILURE:
    case actionTypes.UPDATE_WISHLIST_ITEM_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.wishlistItemId]: false,
        },
        error: {
          ...state.error,
          [action.meta.wishlistItemId]: action.payload.error,
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
  [actionTypes.DELETE_WISHLIST_ITEM_SUCCESS]: (
    state,
    /* istanbul ignore next */ action = {},
  ) => {
    const id = action.payload.result;
    const wishlist = action.payload.entities.wishlist[id];
    const newState = createMergedObject(state, action.payload.entities);

    newState.wishlist[id] = wishlist;

    return newState;
  },
  [actionTypes.RESET_WISHLIST_ENTITIES]: state => {
    const { wishlist, wishlistItems, wishlistSets, ...rest } = state;

    return rest;
  },
};

//
// Selectors from reducer
//
export const getError = state => state.error;
export const getId = state => state.id;
export const getIsLoading = state => state.isLoading;
export const getIsItemLoading = state => state.wishlistItems.isLoading;
export const getItemError = state => state.wishlistItems.error;

//
// Combining and exporting
//
const reducer = combineReducers({
  error,
  isLoading,
  id: idReducer,
  wishlistItems: wishlistItemsReducer,
  wishlistSets: wishlistsSetReducer,
});

/**
 * Reducer for wishlists state.
 *
 * @function wishlistsReducer
 * @static
 * @memberof module:wishlists/reducer
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_WISHLIST_STATE) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    } else {
      const reducerFn = (acc, field) => {
        if (state.wishlistItems[field]) {
          return {
            ...acc,
            [field]: INITIAL_STATE[field],
            wishlistItems: {
              ...acc.wishlistItems,
              [field]: INITIAL_STATE.wishlistItems[field],
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
