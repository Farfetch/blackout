import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../users/authentication/actionTypes';
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
    default:
      return state;
  }
};

const id = (state = INITIAL_STATE.id, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_SUCCESS:
    case actionTypes.FETCH_RETURN_SUCCESS:
      return action.payload.result;
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
    default:
      return state;
  }
};

const resetEntitiesStateReducer = (
  state: NonNullable<StoreState['entities']>,
) => {
  const { returns, returnItems, ...rest } = state;

  return {
    ...rest,
  };
};

export const entitiesMapper = {
  [actionTypes.RESET_RETURNS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const {
      meta: { resetEntities },
    } = action;

    if (!resetEntities) {
      return state;
    }

    return resetEntitiesStateReducer(state);
  },
  [LOGOUT_SUCCESS]: resetEntitiesStateReducer,
  [LOGIN_SUCCESS]: resetEntitiesStateReducer,
  [REGISTER_SUCCESS]: resetEntitiesStateReducer,
  [FETCH_USER_SUCCESS]: resetEntitiesStateReducer,
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
const reducer: Reducer<ReturnsState> = combineReducers({
  error,
  id,
  isLoading,
  returns,
  pickupCapabilities,
});

const returnsReducer: Reducer<ReturnsState> = (state, action) => {
  if (
    action.type === LOGOUT_SUCCESS ||
    action.type === LOGIN_SUCCESS ||
    action.type === FETCH_USER_SUCCESS ||
    action.type === REGISTER_SUCCESS ||
    action.type === actionTypes.RESET_RETURNS
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default returnsReducer;
