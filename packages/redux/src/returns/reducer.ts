/**
 * @module returns/reducer
 * @category Returns
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../authentication/actionTypes';
import { reducerFactory } from '../helpers';
import type {
  CreateReturnAction,
  CreateReturnFailureAction,
  CreateReturnRequestAction,
  CreateReturnSuccessAction,
  GetPickupCapabilitiesAction,
  GetPickupCapabilitiesFailureAction,
  GetPickupCapabilitiesRequestAction,
  GetReferencesAction,
  GetReferencesFailureAction,
  GetReferencesRequestAction,
  GetReturnAction,
  GetReturnFailureAction,
  GetReturnRequestAction,
  GetReturnsFromOrderAction,
  GetReturnsFromOrderFailureAction,
  GetReturnsFromOrderRequestAction,
  GetReturnsFromOrderSuccessAction,
  GetReturnSuccessAction,
  LogoutAction,
  ResetReturnAction,
  State,
  UpdateReturnAction,
  UpdateReturnFailureAction,
  UpdateReturnRequestAction,
} from './types';

export const INITIAL_STATE: State = {
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
    | GetPickupCapabilitiesFailureAction
    | GetReturnFailureAction
    | GetReturnsFromOrderFailureAction
    | UpdateReturnFailureAction
    | GetReferencesFailureAction
    | CreateReturnRequestAction
    | GetPickupCapabilitiesRequestAction
    | GetReturnRequestAction
    | GetReturnsFromOrderRequestAction
    | UpdateReturnRequestAction
    | GetReferencesRequestAction
    | ResetReturnAction
    | LogoutAction,
) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_FAILURE:
    case actionTypes.FETCH_PICKUP_CAPABILITIES_FAILURE:
    case actionTypes.FETCH_RETURN_FAILURE:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE:
    case actionTypes.UPDATE_RETURN_FAILURE:
    case actionTypes.FETCH_REFERENCES_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_RETURN_REQUEST:
    case actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST:
    case actionTypes.FETCH_RETURN_REQUEST:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST:
    case actionTypes.FETCH_REFERENCES_REQUEST:
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
    | LogoutAction,
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
    | GetPickupCapabilitiesAction
    | GetReturnAction
    | GetReturnsFromOrderAction
    | UpdateReturnAction
    | GetReferencesAction
    | ResetReturnAction
    | LogoutAction,
) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_REQUEST:
    case actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST:
    case actionTypes.FETCH_RETURN_REQUEST:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST:
    case actionTypes.FETCH_REFERENCES_REQUEST:
      return true;
    case actionTypes.CREATE_RETURN_SUCCESS:
    case actionTypes.CREATE_RETURN_FAILURE:
    case actionTypes.FETCH_PICKUP_CAPABILITIES_SUCCESS:
    case actionTypes.FETCH_PICKUP_CAPABILITIES_FAILURE:
    case actionTypes.FETCH_RETURN_SUCCESS:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS:
    case actionTypes.FETCH_RETURN_FAILURE:
    case actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE:
    case actionTypes.UPDATE_RETURN_SUCCESS:
    case actionTypes.UPDATE_RETURN_FAILURE:
    case actionTypes.FETCH_REFERENCES_SUCCESS:
    case actionTypes.FETCH_REFERENCES_FAILURE:
    case actionTypes.RESET_RETURN:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.RESET_RETURN]: (state: State, action: ResetReturnAction) => {
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
  [LOGOUT_SUCCESS]: (state, action) => {
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

export const getError = (state: State): State['error'] => state.error;
export const getId = (state: State): State['id'] => state.id;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;
export const getReturns = (state: State): State['returns'] => state.returns;
export const getReferences = (state: State): State['references'] =>
  state.references;
export const getPickupCapabilities = (
  state: State,
): State['pickupCapabilities'] => state.pickupCapabilities;

/**
 * Reducer for returns state.
 *
 * @function returnsReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default combineReducers({
  error,
  id,
  isLoading,
  returns,
  references,
  pickupCapabilities,
});
