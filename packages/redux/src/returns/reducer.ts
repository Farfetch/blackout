import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import reducerFactory from '../helpers/reducerFactory';
import type { ReturnsState } from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: ReturnsState = {
  error: null,
  id: null,
  isLoading: false,
  returns: {
    error: null,
    isLoading: false,
  },
  pickupCapabilities: {
    error: null,
    isLoading: false,
  },
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_FAILURE:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE:
    case actionTypes.FETCH_RETURN_FAILURE:
    case actionTypes.UPDATE_RETURN_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_RETURN_REQUEST:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST:
    case actionTypes.FETCH_RETURN_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST:
    case actionTypes.RESET_RETURN:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const id = (state = INITIAL_STATE.id, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_SUCCESS:
    case actionTypes.FETCH_RETURN_SUCCESS:
      return action.payload.result;
    case actionTypes.RESET_RETURN:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.id;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_REQUEST:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST:
    case actionTypes.FETCH_RETURN_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST:
      return true;
    case actionTypes.CREATE_RETURN_SUCCESS:
    case actionTypes.CREATE_RETURN_FAILURE:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE:
    case actionTypes.FETCH_RETURN_SUCCESS:
    case actionTypes.FETCH_RETURN_FAILURE:
    case actionTypes.UPDATE_RETURN_SUCCESS:
    case actionTypes.UPDATE_RETURN_FAILURE:
    case actionTypes.RESET_RETURN:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_RETURN]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const {
      meta: { resetEntities },
    } = action;
    const { returns, returnItems, ...rest } = state;

    if (resetEntities) {
      return {
        ...rest,
      };
    }

    return state;
  },
  [LOGOUT_SUCCESS]: (state: NonNullable<StoreState['entities']>) => {
    const { returns, returnItems, ...rest } = state;

    return {
      ...rest,
    };
  },
};

const returns = reducerFactory(
  ['CREATE_RETURN', 'FETCH_RETURN'],
  INITIAL_STATE.returns,
  actionTypes,
);

const pickupCapabilities = reducerFactory(
  'FETCH_RETURN_PICKUP_CAPABILITIES',
  INITIAL_STATE.pickupCapabilities,
  actionTypes,
);

export const getError = (state: ReturnsState): ReturnsState['error'] =>
  state.error;
export const getId = (state: ReturnsState): ReturnsState['id'] => state.id;
export const getIsLoading = (state: ReturnsState): ReturnsState['isLoading'] =>
  state.isLoading;
export const getReturns = (state: ReturnsState): ReturnsState['returns'] =>
  state.returns;
export const getPickupCapabilities = (
  state: ReturnsState,
): ReturnsState['pickupCapabilities'] => state.pickupCapabilities;

/**
 * Reducer for returns state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const returnsReducer: Reducer<ReturnsState> = combineReducers({
  error,
  id,
  isLoading,
  returns,
  pickupCapabilities,
});

export default returnsReducer;
