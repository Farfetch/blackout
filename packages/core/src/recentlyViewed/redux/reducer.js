/**
 * @module recentlyViewed/reducer
 * @category Recently Viewed
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import uniqBy from 'lodash/uniqBy';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
  result: {
    remote: null,
    computed: null,
    pagination: null,
  },
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_FAILURE:
    case actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_FAILURE:
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
    case actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_REQUEST:
    case actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_REQUEST:
      return true;
    case actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS:
    case actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_SUCCESS:
      return false;
    case actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_FAILURE:
    case actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_FAILURE:
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_RECENTLY_VIEWED_PRODUCTS_SUCCESS: {
      const computed = state.computed || [];

      // Merge the new payload after the previously computed entries and filter the repeated ones
      return {
        remote: action.payload,
        pagination: omit(action.payload, 'entries'),
        computed: uniqBy([...action.payload.entries, ...computed], 'productId'),
      };
    }
    case actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT: {
      const computed = state.computed || [];

      // Merge the new payload before the previously computed entries and filter the repeated ones
      return {
        ...state,
        computed: uniqBy([...action.payload, ...computed], 'productId'),
      };
    }
    case actionTypes.DELETE_RECENTLY_VIEWED_PRODUCT_SUCCESS: {
      const computed =
        state.computed.filter(
          ({ productId }) => productId !== action.meta.productId,
        ) || [];

      // Removes the productId from the local reference, as the action doesn't provide a payload
      return {
        ...state,
        computed,
      };
    }
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getResult = state => state.result;

/**
 * Reducer for recently viewed state.
 *
 * @function recentlyViewedReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default combineReducers({
  error,
  isLoading,
  result,
});
