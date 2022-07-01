import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import reducerFactory from '../helpers/reducerFactory';
import type {
  CreateReturnAction,
  CreateReturnFailureAction,
  CreateReturnRequestAction,
  CreateReturnSuccessAction,
  GetReturnAction,
  GetReturnFailureAction,
  GetReturnPickupCapabilitiesAction,
  GetReturnPickupCapabilitiesFailureAction,
  GetReturnPickupCapabilitiesRequestAction,
  GetReturnReferencesAction,
  GetReturnReferencesFailureAction,
  GetReturnReferencesRequestAction,
  GetReturnRequestAction,
  GetReturnsFromOrderAction,
  GetReturnsFromOrderFailureAction,
  GetReturnsFromOrderRequestAction,
  GetReturnsFromOrderSuccessAction,
  GetReturnSuccessAction,
  ResetReturnAction,
  ReturnsState,
  UpdateReturnAction,
  UpdateReturnFailureAction,
  UpdateReturnRequestAction,
} from './types';
import type { LogoutSuccessAction } from '../users/types';
import type { StoreState } from '../types';

export const INITIAL_STATE: ReturnsState = {
  error: null,
  id: null,
  isLoading: false,
  returns: {
    error: null,
    isLoading: false,
  },
  references: {
    error: null,
    isLoading: false,
  },
  pickupCapabilities: {
    error: null,
    isLoading: false,
  },
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | CreateReturnFailureAction
    | GetReturnPickupCapabilitiesFailureAction
    | GetReturnFailureAction
    | GetReturnsFromOrderFailureAction
    | UpdateReturnFailureAction
    | GetReturnReferencesFailureAction
    | CreateReturnRequestAction
    | GetReturnPickupCapabilitiesRequestAction
    | GetReturnRequestAction
    | GetReturnsFromOrderRequestAction
    | UpdateReturnRequestAction
    | GetReturnReferencesRequestAction
    | ResetReturnAction
    | LogoutSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_FAILURE:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE:
    case actionTypes.FETCH_RETURN_FAILURE:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE:
    case actionTypes.UPDATE_RETURN_FAILURE:
    case actionTypes.FETCH_RETURN_REFERENCES_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_RETURN_REQUEST:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST:
    case actionTypes.FETCH_RETURN_REQUEST:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST:
    case actionTypes.FETCH_RETURN_REFERENCES_REQUEST:
    case actionTypes.RESET_RETURN:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const id = (
  state = INITIAL_STATE.id,
  action:
    | CreateReturnSuccessAction
    | GetReturnSuccessAction
    | GetReturnsFromOrderSuccessAction
    | ResetReturnAction
    | LogoutSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_SUCCESS:
    case actionTypes.FETCH_RETURN_SUCCESS:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS:
      return action.payload.result;
    case actionTypes.RESET_RETURN:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.id;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | CreateReturnAction
    | GetReturnPickupCapabilitiesAction
    | GetReturnAction
    | GetReturnsFromOrderAction
    | UpdateReturnAction
    | GetReturnReferencesAction
    | ResetReturnAction
    | LogoutSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_REQUEST:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST:
    case actionTypes.FETCH_RETURN_REQUEST:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST:
    case actionTypes.FETCH_RETURN_REFERENCES_REQUEST:
      return true;
    case actionTypes.CREATE_RETURN_SUCCESS:
    case actionTypes.CREATE_RETURN_FAILURE:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS:
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE:
    case actionTypes.FETCH_RETURN_SUCCESS:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS:
    case actionTypes.FETCH_RETURN_FAILURE:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE:
    case actionTypes.UPDATE_RETURN_SUCCESS:
    case actionTypes.UPDATE_RETURN_FAILURE:
    case actionTypes.FETCH_RETURN_REFERENCES_SUCCESS:
    case actionTypes.FETCH_RETURN_REFERENCES_FAILURE:
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
  ['CREATE_RETURN', 'FETCH_RETURN', 'FETCH_RETURNS_FROM_ORDER'],
  INITIAL_STATE.returns,
  actionTypes,
);

const references = reducerFactory(
  'FETCH_REFERENCES',
  INITIAL_STATE.references,
  actionTypes,
);

const pickupCapabilities = reducerFactory(
  'FETCH_PICKUP_CAPABILITIES',
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
export const getReferences = (
  state: ReturnsState,
): ReturnsState['references'] => state.references;
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
export default combineReducers({
  error,
  id,
  isLoading,
  returns,
  references,
  pickupCapabilities,
});
