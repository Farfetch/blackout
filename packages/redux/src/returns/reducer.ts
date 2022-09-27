import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../users/authentication/actionTypes';
import generateReturnPickupCapabilityHash from './helpers/generateReturnPickupCapabilityHash';
import omit from 'lodash/omit';
import produce from 'immer';
import type {
  CreateReturnFailureAction,
  CreateReturnSuccessAction,
  FetchReturnFailureAction,
  FetchReturnPickupCapabilityFailureAction,
  FetchReturnPickupCapabilityRequestAction,
  FetchReturnPickupCapabilitySuccessAction,
  FetchReturnRequestAction,
  FetchReturnSuccessAction,
  ResetReturnPickupCapabilityStateAction,
  ResetReturnStateAction,
  ReturnsState,
  UpdateReturnFailureAction,
  UpdateReturnRequestAction,
  UpdateReturnSuccessAction,
} from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: ReturnsState = {
  returnDetails: {
    error: {},
    isLoading: {},
  },
  createReturn: {
    error: null,
    isLoading: false,
    result: null,
  },
  returnPickupCapabilities: {
    error: {},
    isLoading: {},
  },
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
  [actionTypes.UPDATE_RETURN_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const updateReturnSuccessAction = action as UpdateReturnSuccessAction;
    const { returnId } = updateReturnSuccessAction.meta;
    const { pickupSchedule: newPickupSchedule } =
      updateReturnSuccessAction.payload;

    return produce(state, draftState => {
      const returns = draftState.returns;

      if (returns) {
        const returnEntity = returns[returnId];

        if (returnEntity) {
          returnEntity.pickupSchedule = newPickupSchedule;
        }
      }
    });
  },
};

export const createReturn = (
  state = INITIAL_STATE.createReturn,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.CREATE_RETURN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: INITIAL_STATE.createReturn.error,
      };
    case actionTypes.CREATE_RETURN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        result: (action as CreateReturnSuccessAction).payload.result,
      };
    case actionTypes.CREATE_RETURN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: (action as CreateReturnFailureAction).payload.error,
      };
    case actionTypes.RESET_CREATE_RETURN_STATE:
      return INITIAL_STATE.createReturn;
    default:
      return state;
  }
};

export const returnDetails = (
  state = INITIAL_STATE.returnDetails,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_RETURN_REQUEST:
    case actionTypes.UPDATE_RETURN_REQUEST: {
      const returnAction = action as
        | FetchReturnRequestAction
        | UpdateReturnRequestAction;

      return {
        isLoading: {
          ...state.isLoading,
          [returnAction.meta.returnId]: true,
        },
        error: {
          ...state.error,
          [returnAction.meta.returnId]: null,
        },
      };
    }
    case actionTypes.FETCH_RETURN_SUCCESS:
    case actionTypes.UPDATE_RETURN_SUCCESS: {
      const returnAction = action as
        | FetchReturnSuccessAction
        | UpdateReturnSuccessAction;

      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [returnAction.meta.returnId]: false,
        },
      };
    }
    case actionTypes.FETCH_RETURN_FAILURE:
    case actionTypes.UPDATE_RETURN_FAILURE: {
      const returnAction = action as
        | FetchReturnFailureAction
        | UpdateReturnFailureAction;

      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [returnAction.meta.returnId]: false,
        },
        error: {
          ...state.error,
          [returnAction.meta.returnId]: action.payload.error,
        },
      };
    }
    case actionTypes.RESET_RETURN_STATE:
      const returnIds = (action as ResetReturnStateAction).payload;

      if (!returnIds?.length) {
        return INITIAL_STATE.returnDetails;
      }

      return {
        isLoading: omit(state.isLoading, returnIds),
        error: omit(state.error, returnIds),
      };
    default:
      return state;
  }
};

export const returnPickupCapabilities = (
  state = INITIAL_STATE.returnPickupCapabilities,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_REQUEST: {
      const returnPickupCapabilityAction =
        action as FetchReturnPickupCapabilityRequestAction;

      return {
        isLoading: {
          ...state.isLoading,
          [returnPickupCapabilityAction.meta.hash]: true,
        },
        error: {
          ...state.error,
          [returnPickupCapabilityAction.meta.hash]: null,
        },
      };
    }
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_SUCCESS: {
      const returnPickupCapabilityAction =
        action as FetchReturnPickupCapabilitySuccessAction;

      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [returnPickupCapabilityAction.meta.hash]: false,
        },
      };
    }
    case actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_FAILURE: {
      const returnPickupCapabilityAction =
        action as FetchReturnPickupCapabilityFailureAction;

      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [returnPickupCapabilityAction.meta.hash]: false,
        },
        error: {
          ...state.error,
          [returnPickupCapabilityAction.meta.hash]: action.payload.error,
        },
      };
    }
    case actionTypes.RESET_RETURN_PICKUP_CAPABILITY_STATE:
      const returnPickupCapabilitiesToReset = (
        action as ResetReturnPickupCapabilityStateAction
      ).payload;

      if (!returnPickupCapabilitiesToReset?.length) {
        return INITIAL_STATE.returnPickupCapabilities;
      }

      const hashesToReset = returnPickupCapabilitiesToReset.map(
        pickupCapability =>
          generateReturnPickupCapabilityHash(
            pickupCapability.returnId,
            pickupCapability.pickupDay,
          ),
      );

      return {
        isLoading: omit(state.isLoading, hashesToReset),
        error: omit(state.error, hashesToReset),
      };
    default:
      return state;
  }
};

export const getReturnDetails = (state: ReturnsState) => state.returnDetails;
export const getReturnPickupCapabilities = (state: ReturnsState) =>
  state.returnPickupCapabilities;
export const getCreateReturn = (state: ReturnsState) => state.createReturn;

/**
 * Reducer for returns state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const reducer: Reducer<ReturnsState> = combineReducers({
  createReturn,
  returnDetails,
  returnPickupCapabilities,
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
