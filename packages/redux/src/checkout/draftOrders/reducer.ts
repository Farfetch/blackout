import * as actionDraftOrdersTypes from './types/draftOrdersAction.types.js';
import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';

import createReducer, {
  createReducerWithResult,
} from '../../helpers/reducerFactory.js';
import type { DraftOrdersState } from './types/index.js';
import type { StoreState } from '../../types/storeState.types.js';

export const INITIAL_STATE: DraftOrdersState = {
  draftOrder: {},
  allDraftOrders: {},
  draftOrderCreations: {},
  updateDraftOrder: {},
  removeDraftOrder: {},
};

export const entitiesMapper = {
  [actionTypes.RESET_DRAFT_ORDERS_STATE]: (
    state: NonNullable<StoreState['entities']>,
  ) => {
    const { draftOrders, ...rest } = state;

    return rest;
  },
};

const draftOrderReducer = createReducer(
  'FETCH_DRAFT_ORDER',
  { isLoading: false, error: null },
  actionTypes,
);

const draftOrder = (state = INITIAL_STATE.draftOrder, action: AnyAction) => {
  if (actionDraftOrdersTypes.DRAFT_ORDER_ACTIONS.includes(action.type)) {
    return {
      ...state,
      [action.meta.draftOrderId]: draftOrderReducer(
        state[action.meta.draftOrderId],
        action,
      ),
    };
  }

  return state;
};

const allDraftOrdersReducer = createReducerWithResult(
  'FETCH_DRAFT_ORDERS',
  { isLoading: false, error: null, result: [] },
  actionTypes,
  true,
);
const allDraftOrders = (
  state = INITIAL_STATE.allDraftOrders,
  action: AnyAction,
) => {
  if (actionDraftOrdersTypes.DRAFT_ORDERS_ACTIONS.includes(action.type)) {
    return {
      ...state,
      [action.meta.hash]: allDraftOrdersReducer(
        state[action.meta.hash],
        action,
      ),
    };
  }

  return state;
};

const draftOrderCreationsReducer = createReducer(
  'CREATE_DRAFT_ORDER',
  { isLoading: false, error: null },
  actionTypes,
);
const draftOrderCreations = (
  state = INITIAL_STATE.draftOrderCreations,
  action: AnyAction,
) => {
  if (actionDraftOrdersTypes.CREATE_DRAFT_ORDER_ACTIONS.includes(action.type)) {
    return {
      ...state,
      [action.meta.orderId]: draftOrderCreationsReducer(
        state[action.meta.orderId],
        action,
      ),
    };
  }

  return state;
};

const updateDraftOrderReducer = createReducer(
  ['UPDATE_DRAFT_ORDER', 'UPDATE_DRAFT_ORDER_ITEM'],
  { isLoading: false, error: null },
  actionTypes,
);

const updateDraftOrder = (
  state = INITIAL_STATE.updateDraftOrder,
  action: AnyAction,
) => {
  if (actionDraftOrdersTypes.UPDATE_DRAFT_ORDER_ACTIONS.includes(action.type)) {
    return {
      ...state,
      [action.meta.draftOrderId]: updateDraftOrderReducer(
        state[action.meta.draftOrderId],
        action,
      ),
    };
  }

  return state;
};

const removeDraftOrderReducer = createReducer(
  ['REMOVE_DRAFT_ORDER', 'REMOVE_DRAFT_ORDER_ITEM'],
  { isLoading: false, error: null },
  actionTypes,
);

const removeDraftOrder = (
  state = INITIAL_STATE.removeDraftOrder,
  action: AnyAction,
) => {
  if (
    actionDraftOrdersTypes.REMOVE_DRAFT_ORDERS_ACTIONS.includes(action.type)
  ) {
    return {
      ...state,
      [action.meta.draftOrderId]: removeDraftOrderReducer(
        state[action.meta.draftOrderId],
        action,
      ),
    };
  }

  return state;
};

export const getDraftOrder = (state: DraftOrdersState) => state.draftOrder;
export const getAllDraftOrders = (state: DraftOrdersState) =>
  state.allDraftOrders;
export const getDraftOrderCreations = (state: DraftOrdersState) =>
  state.draftOrderCreations;
export const getUpdateDraftOrder = (state: DraftOrdersState) =>
  state.updateDraftOrder;
export const getRemoveDraftOrder = (state: DraftOrdersState) =>
  state.removeDraftOrder;

const reducer: Reducer<DraftOrdersState> = combineReducers({
  draftOrder,
  allDraftOrders,
  draftOrderCreations,
  updateDraftOrder,
  removeDraftOrder,
});

/**
 * Reducer for draft orders.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const draftOrdersReducer: Reducer<DraftOrdersState> = (state, action) => {
  if (action.type === actionTypes.RESET_DRAFT_ORDERS_STATE) {
    return reducer(INITIAL_STATE, action);
  }

  return reducer(state, action);
};

export default draftOrdersReducer;
