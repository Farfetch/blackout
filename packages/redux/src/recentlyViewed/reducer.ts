import * as actionTypes from './actionTypes';
import * as authenticationActionTypes from '../authentication/actionTypes';
import { AnyAction, combineReducers } from 'redux';
import omit from 'lodash/omit';
import uniqBy from 'lodash/uniqBy';
import type { RecentlyViewedProductsPaginationData } from '@farfetch/blackout-client/recentlyViewed/types';
import type { RecentlyViewedResult, State } from './types';
import type { ReducerSwitch } from '../types';

export const INITIAL_STATE: State = {
  error: null,
  isLoading: false,
  result: {
    remote: null,
    computed: null,
    pagination: null,
  },
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE:
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE:
      return action.payload.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST:
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST:
      return true;
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS:
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS:
      return false;
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE:
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE:
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
): RecentlyViewedResult => {
  switch (action.type) {
    case actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS: {
      const computed = state.computed || [];

      // Merge the new payload after the previously computed entries and filter the repeated ones
      return {
        remote: action.payload,
        pagination: omit(
          action.payload,
          'entries',
        ) as RecentlyViewedProductsPaginationData,
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
    case actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS: {
      const computed = (state.computed || []).filter(
        ({ productId }) => productId !== action.meta.productId,
      );

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

export const getError = (state: State = INITIAL_STATE): State['error'] =>
  state.error;
export const getIsLoading = (
  state: State = INITIAL_STATE,
): State['isLoading'] => state.isLoading;
export const getResult = (state: State = INITIAL_STATE): State['result'] =>
  state.result;
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
const formsReducer: ReducerSwitch<State, AnyAction> = (
  state = INITIAL_STATE,
  action,
): State => {
  if (
    action.type === actionTypes.RESET_RECENTLY_VIEWED_PRODUCT ||
    action.type === authenticationActionTypes.LOGOUT_SUCCESS
  ) {
    // initial state should return when reset_recently_viewed or logout actions are called.
    return reducers(INITIAL_STATE, action);
  }

  return reducers(state, action);
};

export default formsReducer;
