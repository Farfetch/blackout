import * as actionTypes from '../actionTypes';
import { combineReducers } from 'redux';
import omit from 'lodash/omit';

export const INITIAL_STATE = {
  error: null,
  ids: null,
  isLoading: false,
  sets: {
    error: {},
    isLoading: {},
  },
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_WISHLIST_SETS_FAILURE:
    case actionTypes.ADD_WISHLIST_SET_FAILURE:
      return action.payload.error;
    case actionTypes.GET_WISHLIST_SETS_REQUEST:
    case actionTypes.ADD_WISHLIST_SET_REQUEST:
    case actionTypes.DELETE_WISHLIST_SET_REQUEST:
    case actionTypes.UPDATE_WISHLIST_SET_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const ids = (
  state = INITIAL_STATE.ids,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_WISHLIST_SETS_SUCCESS:
      return action.payload.result;
    case actionTypes.ADD_WISHLIST_SET_SUCCESS:
      return state
        ? [...state, action.payload.result]
        : [action.payload.result];
    case actionTypes.DELETE_WISHLIST_SET_SUCCESS:
      return state.filter(id => id !== action.meta.wishlistSetId);
    case actionTypes.GET_WISHLIST_SUCCESS:
      return INITIAL_STATE.ids;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_WISHLIST_SETS_REQUEST:
    case actionTypes.ADD_WISHLIST_SET_REQUEST:
      return true;
    case actionTypes.GET_WISHLIST_SETS_SUCCESS:
    case actionTypes.GET_WISHLIST_SETS_FAILURE:
    case actionTypes.ADD_WISHLIST_SET_SUCCESS:
    case actionTypes.ADD_WISHLIST_SET_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const sets = (
  state = INITIAL_STATE.sets,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.DELETE_WISHLIST_SET_REQUEST:
    case actionTypes.GET_WISHLIST_SET_REQUEST:
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
    case actionTypes.DELETE_WISHLIST_SET_SUCCESS:
    case actionTypes.GET_WISHLIST_SET_SUCCESS:
    case actionTypes.UPDATE_WISHLIST_SET_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.wishlistSetId]: false,
        },
      };
    case actionTypes.DELETE_WISHLIST_SET_FAILURE:
    case actionTypes.GET_WISHLIST_SET_FAILURE:
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
  [actionTypes.DELETE_WISHLIST_SET_SUCCESS]: (
    state,
    { meta: { wishlistSetId } },
  ) => {
    const { wishlistSets, ...rest } = state;

    return {
      ...rest,
      wishlistSets: omit(wishlistSets, wishlistSetId),
    };
  },
};

//
// Selectors from reducer
//
export const getError = state => state.error;
export const getIds = state => state.ids;
export const getIsLoading = state => state.isLoading;
export const getSetError = state => state.sets.error;
export const getIsSetLoading = state => state.sets.isLoading;

//
// Combining and exporting
//
export const reducer = combineReducers({
  error,
  ids,
  isLoading,
  sets,
});

/**
 * Reducer for wishlistsSets state.
 *
 * @function wishlistsSetsReducer
 * @static
 * @memberof module:wishlists/reducer
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_WISHLIST_SETS_STATE) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    } else {
      const reducerFn = (acc, field) => {
        if (state.sets[field]) {
          return {
            ...acc,
            [field]: INITIAL_STATE[field],
            sets: {
              ...acc.sets,
              [field]: INITIAL_STATE.sets[field],
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
