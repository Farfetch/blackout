import * as actionTypes from '../actionTypes/index.js';
import * as authenticationActionTypes from '../../users/authentication/actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { omit, uniqBy } from 'lodash-es';
import type { RecentlyViewedProducts } from '@farfetch/blackout-client';
import type { RecentlyViewedState } from '../types/index.js';

export const INITIAL_STATE: RecentlyViewedState = {
  error: null,
  isLoading: false,
  result: null,
};

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): RecentlyViewedState['error'] => {
  switch (action.type) {
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE:
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AnyAction,
): RecentlyViewedState['isLoading'] => {
  switch (action.type) {
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST:
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST:
      return true;
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS:
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS:
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE:
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): RecentlyViewedState['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS: {
      const computed = state?.computed || [];

      // Merge the new payload after the previously computed entries and filter the repeated ones
      return {
        remote: action.payload,
        pagination: omit(action.payload, 'entries') as RecentlyViewedProducts,
        computed: uniqBy([...action.payload.entries, ...computed], 'productId'),
      };
    }
    case actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT: {
      const computed = state?.computed || [];

      // Merge the new payload before the previously computed entries and filter the repeated ones
      return {
        remote: state?.remote,
        pagination: state?.pagination,
        computed: uniqBy([...action.payload, ...computed], 'productId'),
      };
    }
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS: {
      const computed = (state?.computed || []).filter(
        ({ productId }) => productId !== action.meta.productId,
      );

      // Removes the productId from the local reference, as the action doesn't provide a payload
      return {
        remote: state?.remote,
        pagination: state?.pagination,
        computed,
      };
    }
    default:
      return state;
  }
};

export const getError = (
  state: RecentlyViewedState = INITIAL_STATE,
): RecentlyViewedState['error'] => state.error;
export const getIsLoading = (
  state: RecentlyViewedState = INITIAL_STATE,
): RecentlyViewedState['isLoading'] => state.isLoading;
export const getResult = (
  state: RecentlyViewedState = INITIAL_STATE,
): RecentlyViewedState['result'] => state.result;

const reducers = combineReducers({
  error,
  isLoading,
  result,
});

/**
 * Reducer for recently viewed state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const recentlyViewedReducer: Reducer<RecentlyViewedState> = (
  state = INITIAL_STATE,
  action,
) => {
  if (
    action.type === actionTypes.RESET_RECENTLY_VIEWED_PRODUCTS ||
    action.type === authenticationActionTypes.LOGOUT_SUCCESS
  ) {
    // initial state should return when reset_recently_viewed or logout actions are called.
    return INITIAL_STATE;
  }

  return reducers(state, action);
};

export default recentlyViewedReducer;
