import * as actionTypes from './actionTypes';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import reducerFactory from '../helpers/reducerFactory';
import type { BagItem } from '@farfetch/blackout-client';
import type { BagItemsState, BagsState } from './types';
import type { StoreState } from '../types';

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
  bagOperations: {
    error: {},
    isLoading: {},
  },
  bagPromocodes: {
    error: null,
    isLoading: false,
  },
};

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): BagsState['error'] => {
  switch (action.type) {
    case actionTypes.ADD_BAG_ITEM_FAILURE:
    case actionTypes.FETCH_BAG_FAILURE:
    case actionTypes.UPDATE_BAG_ITEM_FAILURE:
    case actionTypes.REMOVE_BAG_ITEM_FAILURE:
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

const id = (state = INITIAL_STATE.id, action: AnyAction): BagsState['id'] => {
  switch (action.type) {
    case actionTypes.FETCH_BAG_SUCCESS:
      return action.payload.result.id;
    default:
      return state;
  }
};

const result = (
  state = INITIAL_STATE.result,
  action: AnyAction,
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

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.ADD_BAG_ITEM_REQUEST:
    case actionTypes.FETCH_BAG_REQUEST:
    case actionTypes.UPDATE_BAG_ITEM_REQUEST:
    case actionTypes.REMOVE_BAG_ITEM_REQUEST:
      return true;
    case actionTypes.ADD_BAG_ITEM_FAILURE:
    case actionTypes.ADD_BAG_ITEM_SUCCESS:
    case actionTypes.FETCH_BAG_FAILURE:
    case actionTypes.FETCH_BAG_SUCCESS:
    case actionTypes.UPDATE_BAG_ITEM_SUCCESS:
    case actionTypes.UPDATE_BAG_ITEM_FAILURE:
    case actionTypes.REMOVE_BAG_ITEM_SUCCESS:
    case actionTypes.REMOVE_BAG_ITEM_FAILURE:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const items = (
  state = INITIAL_STATE.items,
  action: AnyAction,
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

const bagOperations = (
  state = INITIAL_STATE.bagOperations,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_BAG_OPERATION_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.bagOperationId]: true,
        },
        error: {
          ...state.error,
          [action.meta.bagOperationId]: null,
        },
      };
    case actionTypes.FETCH_BAG_OPERATION_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.bagOperationId]: false,
        },
      };
    case actionTypes.FETCH_BAG_OPERATION_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.bagOperationId]: false,
        },
        error: {
          ...state.error,
          [action.meta.bagOperationId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const bagPromocodes = reducerFactory(
  'SET_BAG_PROMOCODES',
  INITIAL_STATE.bagPromocodes,
  actionTypes,
);

const resetBagEntities = (state: NonNullable<StoreState['entities']>) => {
  if (!state) {
    return state;
  }

  const { bagItems, bagOperations, bagPromocodesInformation, ...rest } = state;

  return rest;
};

export const entitiesMapper = {
  [actionTypes.RESET_BAG_ENTITIES]: resetBagEntities,
  [actionTypes.RESET_BAG_OPERATIONS_ENTITIES]: (
    state: NonNullable<StoreState['entities']>,
  ) => {
    const { bagOperations, ...rest } = state;

    return rest;
  },
  [LOGOUT_SUCCESS]: resetBagEntities,
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
export const getIsBagOperationLoading = (state: BagsState) =>
  state.bagOperations.isLoading;
export const getBagOperationError = (state: BagsState) =>
  state.bagOperations.error;
export const getAreBagPromocodesLoading = (state: BagsState) =>
  state.bagPromocodes.isLoading;
export const getBagPromocodesError = (state: BagsState) =>
  state.bagPromocodes.error;

const reducer = combineReducers({
  bagPromocodes,
  bagOperations,
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
const bagReducer: Reducer<BagsState> = (state, action) => {
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
