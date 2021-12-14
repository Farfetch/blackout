/**
 * @module returns/reducer
 * @category Returns
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { reducerFactory } from '../helpers';

const INITIAL_STATE = {
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

const error = (state = INITIAL_STATE.error, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_FAILURE:
    case actionTypes.GET_PICKUP_CAPABILITIES_FAILURE:
    case actionTypes.GET_RETURN_FAILURE:
    case actionTypes.GET_RETURNS_FROM_ORDER_FAILURE:
    case actionTypes.UPDATE_RETURN_FAILURE:
    case actionTypes.GET_REFERENCES_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_RETURN_REQUEST:
    case actionTypes.GET_PICKUP_CAPABILITIES_REQUEST:
    case actionTypes.GET_RETURN_REQUEST:
    case actionTypes.GET_RETURNS_FROM_ORDER_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST:
    case actionTypes.GET_REFERENCES_REQUEST:
    case actionTypes.RESET_RETURN:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const id = (state = INITIAL_STATE.id, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_SUCCESS:
    case actionTypes.GET_RETURN_SUCCESS:
    case actionTypes.GET_RETURNS_FROM_ORDER_SUCCESS:
      return action.payload.result;
    case actionTypes.RESET_RETURN:
      return INITIAL_STATE.id;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_REQUEST:
    case actionTypes.GET_PICKUP_CAPABILITIES_REQUEST:
    case actionTypes.GET_RETURN_REQUEST:
    case actionTypes.GET_RETURNS_FROM_ORDER_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST:
    case actionTypes.GET_REFERENCES_REQUEST:
      return true;
    case actionTypes.CREATE_RETURN_SUCCESS:
    case actionTypes.CREATE_RETURN_FAILURE:
    case actionTypes.GET_PICKUP_CAPABILITIES_SUCCESS:
    case actionTypes.GET_PICKUP_CAPABILITIES_FAILURE:
    case actionTypes.GET_RETURN_SUCCESS:
    case actionTypes.GET_RETURNS_FROM_ORDER_SUCCESS:
    case actionTypes.GET_RETURN_FAILURE:
    case actionTypes.GET_RETURNS_FROM_ORDER_FAILURE:
    case actionTypes.UPDATE_RETURN_SUCCESS:
    case actionTypes.UPDATE_RETURN_FAILURE:
    case actionTypes.GET_REFERENCES_SUCCESS:
    case actionTypes.GET_REFERENCES_FAILURE:
    case actionTypes.RESET_RETURN:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const returnsEntityMapper = (state, action) => {
  const {
    meta: { id },
    payload: { entities },
  } = action;
  const currentReturn = state.returns[id];

  return {
    ...state,
    returns: {
      [id]: {
        ...currentReturn,
        ...entities,
      },
    },
  };
};

export const entitiesMapper = {
  [actionTypes.GET_PICKUP_CAPABILITIES_SUCCESS]: (state, action) =>
    returnsEntityMapper(state, action),
  [actionTypes.UPDATE_RETURN_SUCCESS]: (state, action) =>
    returnsEntityMapper(state, action),
  [actionTypes.RESET_RETURN]: (state, action) => {
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
  ['CREATE_RETURN', 'GET_RETURN', 'UPDATE_RETURN', 'GET_RETURNS_FROM_ORDER'],
  INITIAL_STATE.returns,
  actionTypes,
);

const references = reducerFactory(
  'GET_REFERENCES',
  INITIAL_STATE.references,
  actionTypes,
);

const pickupCapabilities = reducerFactory(
  'GET_PICKUP_CAPABILITIES',
  INITIAL_STATE.pickupCapabilities,
  actionTypes,
);

export const getError = state => state.error;
export const getId = state => state.id;
export const getIsLoading = state => state.isLoading;
export const getReturns = state => state.returns;
export const getReferences = state => state.references;
export const getPickupCapabilities = state => state.pickupCapabilities;

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
