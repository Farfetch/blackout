/**
 * @module categories/reducer
 * @category Categories
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
  top: null,
  areCategoriesFetched: false,
  areTopCategoriesFetched: false,
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_REQUEST:
    case actionTypes.GET_CATEGORIES_TOP_REQUEST:
      return INITIAL_STATE.error;
    case actionTypes.GET_CATEGORIES_FAILURE:
    case actionTypes.GET_CATEGORIES_TOP_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_REQUEST:
    case actionTypes.GET_CATEGORIES_TOP_REQUEST:
      return true;
    case actionTypes.GET_CATEGORIES_SUCCESS:
    case actionTypes.GET_CATEGORIES_FAILURE:
    case actionTypes.GET_CATEGORIES_TOP_SUCCESS:
    case actionTypes.GET_CATEGORIES_TOP_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const top = (
  state = INITIAL_STATE.top,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_TOP_SUCCESS:
      return action.payload.result;
    case actionTypes.GET_CATEGORIES_SUCCESS: {
      const allCategories = Object.values(action.payload.entities.categories);

      return allCategories.reduce((topIds, { id, parentId = null }) => {
        if (!parentId) {
          topIds.push(id);
        }

        return topIds;
      }, []);
    }
    case actionTypes.GET_CATEGORIES_TOP_REQUEST:
    case actionTypes.GET_CATEGORIES_FAILURE:
    case actionTypes.GET_CATEGORIES_TOP_FAILURE:
    default:
      return state;
  }
};

const areCategoriesFetched = (
  state = INITIAL_STATE.areCategoriesFetched,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_SUCCESS: {
      return true;
    }
    case actionTypes.GET_CATEGORIES_REQUEST:
    case actionTypes.GET_CATEGORIES_FAILURE:
      return INITIAL_STATE.areCategoriesFetched;
    default:
      return state;
  }
};

const areTopCategoriesFetched = (
  state = INITIAL_STATE.areTopCategoriesFetched,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_TOP_SUCCESS:
    case actionTypes.GET_CATEGORIES_SUCCESS: {
      return true;
    }
    case actionTypes.GET_CATEGORIES_REQUEST:
    case actionTypes.GET_CATEGORIES_TOP_REQUEST:
    case actionTypes.GET_CATEGORIES_FAILURE:
    case actionTypes.GET_CATEGORIES_TOP_FAILURE:
      return INITIAL_STATE.areTopCategoriesFetched;
    default:
      return state;
  }
};

export const getAreCategoriesFetched = state => state.areCategoriesFetched;
export const getAreTopCategoriesFetched = state =>
  state.areTopCategoriesFetched;
export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getTop = state => state.top;

const reducers = combineReducers({
  areCategoriesFetched,
  areTopCategoriesFetched,
  error,
  isLoading,
  top,
});

/**
 * Reducer for categories state.
 *
 * @function categoriesReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_CATEGORIES) {
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};
