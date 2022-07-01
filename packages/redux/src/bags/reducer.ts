import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import type {
  AddBagItemAction,
  AddBagItemFailureAction,
  AddBagItemRequestAction,
  AddBagItemSuccessAction,
  BagItemsState,
  BagsState,
  FetchBagAction,
  FetchBagFailureAction,
  FetchBagRequestAction,
  FetchBagSuccessAction,
  RemoveBagItemAction,
  RemoveBagItemRequestAction,
  RemoveBagItemSuccessAction,
  UpdateBagItemAction,
  UpdateBagItemRequestAction,
  UpdateBagItemSuccessAction,
} from './types';
import type { BagItem } from '@farfetch/blackout-client';
import type { ReducerSwitch, StoreState } from '../types';

export const INITIAL_STATE: BagsState = {
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
): BagsState['error'] => {
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
): BagsState['id'] => {
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
): BagsState['result'] => {
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
  [actionTypes.RESET_BAG_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    if (!state) {
      return state;
    }

    const { bagItems, ...rest } = state;

    return rest;
  },
  [LOGOUT_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    if (!state) {
      return state;
    }

    const { bagItems, ...rest } = state;

    return rest;
  },
};

export const getError = (state: BagsState): BagsState['error'] => state.error;
export const getId = (state: BagsState): BagsState['id'] => state.id;
export const getResult = (state: BagsState): BagsState['result'] =>
  state.result;
export const getIsLoading = (state: BagsState): BagsState['isLoading'] =>
  state.isLoading;
export const getAreItemsLoading = (
  state: BagsState,
): BagItemsState['item']['isLoading'] => state.items.item.isLoading;
export const getItemsIds = (state: BagsState): BagItemsState['ids'] =>
  state.items.ids;
export const getItemsError = (
  state: BagsState,
): BagItemsState['item']['error'] => state.items.item.error;

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
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const bagReducer: ReducerSwitch<BagsState> = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  if (action.type === actionTypes.RESET_BAG_STATE && state) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    } else {
      const reducerFn = (acc: BagsState, field: BagItem['id']) => {
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
