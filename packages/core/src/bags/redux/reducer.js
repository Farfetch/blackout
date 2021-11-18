/**
 * @module bags/reducer
 * @category Bags
 * @subcategory Reducer
 */
import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createMergedObject } from '../../helpers/redux';

const INITIAL_STATE = {
  error: null,
  id: null,
  isLoading: false,
  bagItems: {
    error: {},
    isLoading: {},
  },
};

const error = (
  state = INITIAL_STATE.error,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_BAG_FAILURE:
    case actionTypes.GET_BAG_FAILURE:
      return action.payload.error;
    case actionTypes.ADD_ITEM_TO_BAG_REQUEST:
    case actionTypes.DELETE_BAG_ITEM_REQUEST:
    case actionTypes.GET_BAG_REQUEST:
    case actionTypes.UPDATE_BAG_ITEM_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const id = (
  state = INITIAL_STATE.id,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_BAG_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_BAG_REQUEST:
    case actionTypes.GET_BAG_REQUEST:
      return true;
    case actionTypes.ADD_ITEM_TO_BAG_FAILURE:
    case actionTypes.ADD_ITEM_TO_BAG_SUCCESS:
    case actionTypes.GET_BAG_FAILURE:
    case actionTypes.GET_BAG_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const bagItems = (
  state = INITIAL_STATE.bagItems,
  /* istanbul ignore next */ action = {},
) => {
  switch (action.type) {
    case actionTypes.DELETE_BAG_ITEM_REQUEST:
    case actionTypes.UPDATE_BAG_ITEM_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.bagItemId]: true,
        },
        error: {
          ...state.error,
          [action.payload.bagItemId]: null,
        },
      };
    case actionTypes.DELETE_BAG_ITEM_SUCCESS:
    case actionTypes.UPDATE_BAG_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.bagItemId]: false,
        },
      };
    case actionTypes.DELETE_BAG_ITEM_FAILURE:
    case actionTypes.UPDATE_BAG_ITEM_FAILURE:
      return {
        isLoading: {
          ...state.isLoading,
          [action.payload.bagItemId]: false,
        },
        error: {
          ...state.error,
          [action.payload.bagItemId]: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.DELETE_BAG_ITEM_SUCCESS]: (
    state,
    /* istanbul ignore next */ action = {},
  ) => {
    const id = action.payload.result;
    const bag = action.payload.entities.bag[id];
    const newState = createMergedObject(state, action.payload.entities);

    newState.bag[id] = bag;

    return newState;
  },
  [actionTypes.RESET_BAG_ENTITIES]: state => {
    const { bag, bagItems, ...rest } = state;

    return rest;
  },
};

export const getError = state => state.error;
export const getId = state => state.id;
export const getIsLoading = state => state.isLoading;
export const getIsBagItemLoading = state => state.bagItems.isLoading;
export const getItemError = state => state.bagItems.error;

const reducer = combineReducers({
  error,
  id,
  isLoading,
  bagItems,
});

/**
 * Reducer for bag state.
 *
 * @function bagReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default (state, action = {}) => {
  if (action.type === actionTypes.RESET_BAG_STATE) {
    const fieldsToReset = action.payload.fieldsToReset;

    if (!fieldsToReset) {
      return INITIAL_STATE;
    } else {
      const reducerFn = (acc, field) => {
        if (state.bagItems[field]) {
          return {
            ...acc,
            [field]: INITIAL_STATE[field],
            bagItems: {
              ...acc.bagItems,
              [field]: INITIAL_STATE.bagItems[field],
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
