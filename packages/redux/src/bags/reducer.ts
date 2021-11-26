/**
 * @module bags/reducer
 * @category Bags
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../authentication/actionTypes';
import type {
  AddBagItemAction,
  AddBagItemFailureAction,
  AddBagItemRequestAction,
  AddBagItemSuccessAction,
  BagItemsState,
  FetchBagAction,
  FetchBagFailureAction,
  FetchBagRequestAction,
  FetchBagSuccessAction,
  RemoveBagItemAction,
  RemoveBagItemRequestAction,
  RemoveBagItemSuccessAction,
  State,
  UpdateBagItemAction,
  UpdateBagItemRequestAction,
  UpdateBagItemSuccessAction,
} from './types';
import type { BagItem } from '@farfetch/blackout-client/src/bags/types';
import type { ReducerSwitch, StoreState } from '../types';

export const INITIAL_STATE: State = {
  error: null,
  id: null,
  isLoading: false,
  result: null,
  items: {
    ids: null,
    item: {
      error: {},
      isLoading: {},
    },
  },
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | AddBagItemFailureAction
    | AddBagItemRequestAction
    | FetchBagFailureAction
    | FetchBagRequestAction
    | RemoveBagItemRequestAction
    | UpdateBagItemRequestAction,
): State['error'] => {
  switch (action.type) {
    case actionTypes.ADD_BAG_ITEM_FAILURE:
    case actionTypes.FETCH_BAG_FAILURE:
      return action.payload.error;
    case actionTypes.ADD_BAG_ITEM_REQUEST:
    case actionTypes.REMOVE_BAG_ITEM_REQUEST:
    case actionTypes.FETCH_BAG_REQUEST:
    case actionTypes.UPDATE_BAG_ITEM_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const id = (
  state = INITIAL_STATE.id,
  action: FetchBagSuccessAction,
): State['id'] => {
  switch (action.type) {
    case actionTypes.FETCH_BAG_SUCCESS:
      return action.payload.result.id;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action:
    | AddBagItemSuccessAction
    | FetchBagSuccessAction
    | RemoveBagItemSuccessAction
    | UpdateBagItemSuccessAction,
): State['result'] => {
  switch (action.type) {
    case actionTypes.FETCH_BAG_SUCCESS:
    case actionTypes.ADD_BAG_ITEM_SUCCESS:
    case actionTypes.REMOVE_BAG_ITEM_SUCCESS:
    case actionTypes.UPDATE_BAG_ITEM_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action: AddBagItemAction | FetchBagAction,
) => {
  switch (action.type) {
    case actionTypes.ADD_BAG_ITEM_REQUEST:
    case actionTypes.FETCH_BAG_REQUEST:
      return true;
    case actionTypes.ADD_BAG_ITEM_FAILURE:
    case actionTypes.ADD_BAG_ITEM_SUCCESS:
    case actionTypes.FETCH_BAG_FAILURE:
    case actionTypes.FETCH_BAG_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const items = (
  state = INITIAL_STATE.items,
  action:
    | AddBagItemSuccessAction
    | FetchBagSuccessAction
    | RemoveBagItemAction
    | UpdateBagItemAction,
): BagItemsState => {
  switch (action.type) {
    case actionTypes.FETCH_BAG_SUCCESS:
    case actionTypes.ADD_BAG_ITEM_SUCCESS:
      return {
        ...state,
        ids: action.payload.result.items,
      };

    case actionTypes.REMOVE_BAG_ITEM_REQUEST:
    case actionTypes.UPDATE_BAG_ITEM_REQUEST:
      return {
        ...state,
        item: {
          isLoading: {
            ...state.item.isLoading,
            [action.meta.bagItemId]: true,
          },
          error: {
            ...state.item.error,
            [action.meta.bagItemId]: null,
          },
        },
      };

    case actionTypes.REMOVE_BAG_ITEM_SUCCESS:
    case actionTypes.UPDATE_BAG_ITEM_SUCCESS:
      return {
        ids: action.payload.result.items,
        item: {
          ...state.item,
          isLoading: {
            ...state.item.isLoading,
            [action.meta.bagItemId]: false,
          },
        },
      };

    case actionTypes.REMOVE_BAG_ITEM_FAILURE:
    case actionTypes.UPDATE_BAG_ITEM_FAILURE:
      return {
        ...state,
        item: {
          isLoading: {
            ...state.item.isLoading,
            [action.meta.bagItemId]: false,
          },
          error: {
            ...state.item.error,
            [action.meta.bagItemId]: action.payload.error,
          },
        },
      };

    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_BAG_ENTITIES as typeof actionTypes.RESET_BAG_ENTITIES]: (
    state: StoreState['entities'],
  ): StoreState['entities'] => {
    const { bagItems, ...rest } = state;

    return rest;
  },
  [LOGOUT_SUCCESS as typeof LOGOUT_SUCCESS]: (
    state: StoreState['entities'],
  ): StoreState['entities'] => {
    const { bagItems, ...rest } = state;

    return rest;
  },
};

export const getError = (state: State): State['error'] => state.error;
export const getId = (state: State): State['id'] => state.id;
export const getResult = (state: State): State['result'] => state.result;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;
export const getAreItemsLoading = (
  state: State,
): BagItemsState['item']['isLoading'] => state.items.item.isLoading;
export const getItemsIds = (state: State): BagItemsState['ids'] =>
  state.items.ids;
export const getItemsError = (state: State): BagItemsState['item']['error'] =>
  state.items.item.error;

const reducer = combineReducers({
  error,
  id,
  isLoading,
  items,
  result,
});

/**
 * Reducer for bag state.
 *
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
const bagReducer: ReducerSwitch<State> = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  if (action.type === actionTypes.RESET_BAG_STATE) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    } else {
      const reducerFn = (acc: State, field: BagItem['id']) => {
        if (state.items[field] || state.items.item[field]) {
          return {
            ...acc,
            [field]: INITIAL_STATE[field],
            items: {
              ...acc.items,
              [field]: INITIAL_STATE.items[field],
              item: {
                ...acc.items.item,
                [field]: INITIAL_STATE.items.item[field],
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

export default bagReducer;
